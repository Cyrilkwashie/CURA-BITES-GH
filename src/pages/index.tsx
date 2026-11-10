import Head from "next/head";
import { useCallback, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularDishes } from "@/components/home/PopularDishes";
import { DailyMenu } from "@/components/home/DailyMenu";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyCuraBites } from "@/components/home/WhyCuraBites";
import { FinalCTA } from "@/components/home/FinalCTA";
import { useActiveSection } from "@/hooks/useActiveSection";
import { getDefaultWeekday } from "@/lib/weekday";
import { scrollToSection } from "@/lib/scroll";
import type { MealCategory } from "@/components/home/MealSelector";
import type { Weekday } from "@/data/menuTypes";

const siteUrl = "https://curabitesgh.com";

export default function Home() {
  const activeSection = useActiveSection();
  const [meal, setMeal] = useState<MealCategory>("breakfast");
  const [weekday, setWeekday] = useState<Weekday>(() => getDefaultWeekday());

  const navigateMenu = useCallback((next: MealCategory) => {
    setMeal(next);
  }, []);

  const exploreMeal = useCallback((next: MealCategory) => {
    setMeal(next);
    scrollToSection("menu");
  }, []);

  return (
    <>
      <Head>
        <title>Cura Bites GH | Good Food. Busy Lives. Sorted.</title>
        <meta
          name="description"
          content="Discover delicious Ghanaian breakfast and lunch options at Cura Bites GH. Good food for busy lives."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Cura Bites GH | Good Food. Busy Lives. Sorted." />
        <meta
          property="og:description"
          content="Discover delicious Ghanaian breakfast and lunch options at Cura Bites GH."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={siteUrl} />
      </Head>

      <Navbar activeSection={activeSection} onMenuNavigate={navigateMenu} />
      <main>
        <HeroSection onExploreMeal={exploreMeal} />
        <PopularDishes />
        <DailyMenu
          meal={meal}
          weekday={weekday}
          onMealChange={setMeal}
          onWeekdayChange={setWeekday}
        />
        <AboutSection />
        <WhyCuraBites />
        <FinalCTA onExplore={exploreMeal} />
      </main>
      <Footer onMenuNavigate={navigateMenu} />
    </>
  );
}
