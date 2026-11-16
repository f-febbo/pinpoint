import { Hero } from "@/components/landing/hero";
import { Nav } from "@/components/landing/nav";
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
      </main>
    </>
  );
}
