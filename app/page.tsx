import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { Footer } from "@/components/Footer";

// Revalidate every 60 seconds to pick up Contentful changes
export const revalidate = 10;

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <PortfolioShowcase />
      </main>
      
    </>
  );
}
