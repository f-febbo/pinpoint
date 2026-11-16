import { Features } from "@/components/landing/features";
import { FinalCta, Footer } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { Mission } from "@/components/landing/mission";
import { Nav } from "@/components/landing/nav";
import { Privacy } from "@/components/landing/privacy";
import { Problem } from "@/components/landing/problem";
import { Showcase } from "@/components/landing/showcase";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Showcase />
        <Features />
        <Privacy />
        <Mission />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
