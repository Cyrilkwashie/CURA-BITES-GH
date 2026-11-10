import fs from "fs";
import path from "path";
import sharp from "sharp";

const platesDir = path.join(process.cwd(), "public", "images", "plates");

function spread(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function distRgb(r, g, b, br, bg, bb) {
  return Math.abs(r - br) + Math.abs(g - bg) + Math.abs(b - bb);
}

/** Backdrop colour sampled from image corners (flat grey studio, not food) */
function sampleBackdropRgb(data, width, height, channels) {
  const samples = [];
  const patch = 12;
  const corners = [
    [0, 0],
    [width - patch, 0],
    [0, height - patch],
    [width - patch, height - patch],
  ];
  for (const [sx, sy] of corners) {
    for (let y = sy; y < sy + patch; y++) {
      for (let x = sx; x < sx + patch; x++) {
        const idx = (y * width + x) * channels;
        samples.push([data[idx], data[idx + 1], data[idx + 2]]);
      }
    }
  }
  const median = (arr) => {
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.floor(s.length / 2)];
  };

  const medians = corners.map((_, ci) => {
    const patchSamples = [];
    const [sx, sy] = corners[ci];
    for (let y = sy; y < sy + patch; y++) {
      for (let x = sx; x < sx + patch; x++) {
        const idx = (y * width + x) * channels;
        patchSamples.push([data[idx], data[idx + 1], data[idx + 2]]);
      }
    }
    return [
      median(patchSamples.map((p) => p[0])),
      median(patchSamples.map((p) => p[1])),
      median(patchSamples.map((p) => p[2])),
    ];
  });

  let best = medians[0];
  let bestLum = 0;
  for (const m of medians) {
    const lum = m[0] + m[1] + m[2];
    if (spread(m[0], m[1], m[2]) > 12) continue;
    if (lum < 120) continue;
    if (lum > bestLum) {
      best = m;
      bestLum = lum;
    }
  }
  const cornersHaveChecker =
    medians.some((m) => m[0] + m[1] + m[2] > 720) &&
    medians.some((m) => m[0] + m[1] + m[2] < 90);

  return { backdrop: best, cornersHaveChecker, medians };
}

function isBackdropPixel(r, g, b, backdrop, tolerance) {
  if (spread(r, g, b) > 22) return false;
  return distRgb(r, g, b, backdrop[0], backdrop[1], backdrop[2]) <= tolerance;
}

function floodFromEdges(data, width, height, channels, backdrop, tolerance) {
  const remove = new Uint8Array(width * height);
  const queue = [];

  const tryPush = (x, y) => {
    const vi = y * width + x;
    if (remove[vi]) return;
    const idx = vi * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (!isBackdropPixel(r, g, b, backdrop, tolerance)) return;
    remove[vi] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    tryPush(x, 0);
    tryPush(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y);
    tryPush(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      tryPush(nx, ny);
    }
  }

  return remove;
}

async function cutout(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const { backdrop, cornersHaveChecker } = sampleBackdropRgb(data, width, height, channels);
  const tolerance = 42;

  let borderBlack = 0;
  let borderWhite = 0;
  const scanEdge = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    if (r < 40) borderBlack++;
    if (r > 235) borderWhite++;
  };
  for (let x = 0; x < width; x++) {
    scanEdge(x, 0);
    scanEdge(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    scanEdge(0, y);
    scanEdge(width - 1, y);
  }
  const isCheckerboard = cornersHaveChecker || (borderBlack > 80 && borderWhite > 80);

  const remove = floodFromEdges(data, width, height, channels, backdrop, tolerance);

  if (isCheckerboard) {
    const darkRemove = new Uint8Array(width * height);
    const queue = [];
    const tryDark = (x, y) => {
      const vi = y * width + x;
      if (darkRemove[vi]) return;
      const idx = vi * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (spread(r, g, b) > 8) return;
      if (r > 55) return;
      darkRemove[vi] = 1;
      queue.push([x, y]);
    };
    for (let x = 0; x < width; x++) {
      tryDark(x, 0);
      tryDark(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      tryDark(0, y);
      tryDark(width - 1, y);
    }
    while (queue.length) {
      const [x, y] = queue.pop();
      for (const [nx, ny] of [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const vi = ny * width + nx;
        if (darkRemove[vi]) continue;
        const idx = vi * channels;
        if (spread(data[idx], data[idx + 1], data[idx + 2]) > 22) continue;
        if (data[idx] > 55) continue;
        darkRemove[vi] = 1;
        queue.push([nx, ny]);
      }
    }
    for (let i = 0; i < width * height; i++) {
      if (darkRemove[i]) remove[i] = 1;
    }
  }

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    if (remove[i]) data[idx + 3] = 0;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 6, effort: 10 })
    .toFile(outputPath);

  console.log(
    `  backdrop ~rgb(${backdrop.join(",")}) tol=${tolerance} -> ${path.basename(outputPath)}`,
  );
}

const files = fs
  .readdirSync(platesDir)
  .filter((f) => f.startsWith("plate-") && f.endsWith(".jpg") && !f.includes("legacy"));

console.log(`Processing ${files.length} plate JPGs (JPG cannot be transparent — PNG only):\n`);

for (const file of files) {
  const input = path.join(platesDir, file);
  const output = path.join(platesDir, file.replace(/\.jpg$/i, ".png"));
  console.log(file);
  await cutout(input, output);
}
