import { Feedback, Footer } from "@/components/landing/feedback";
import { Frames } from "@/components/landing/frames";
import { Hero } from "@/components/landing/hero";
import { Nav } from "@/components/landing/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Frames />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
