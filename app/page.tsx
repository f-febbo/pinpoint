import { existsSync } from "node:fs";
import { join } from "node:path";
import { Feedback, Footer } from "@/components/landing/feedback";
import { Frames } from "@/components/landing/frames";
import { Hero } from "@/components/landing/hero";
import { Nav } from "@/components/landing/nav";

// The hero photo is optional: drop public/hero-person.png (or .webp) in and it replaces the phone art.
function heroPhoto() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  for (const f of ["hero-person.webp", "hero-person.png"]) {
    if (existsSync(join(process.cwd(), "public", f))) return `${base}/${f}`;
  }
  return null;
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero photo={heroPhoto()} />
        <Frames />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
