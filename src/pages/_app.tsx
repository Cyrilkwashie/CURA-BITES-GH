import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { anton, inter } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${anton.variable} ${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
