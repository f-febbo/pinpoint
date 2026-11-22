import { Feedback, Footer } from "@/components/landing/feedback";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Nav } from "@/components/landing/nav";
import { Privacy } from "@/components/landing/privacy";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Privacy />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
