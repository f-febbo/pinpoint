import { PinIcon } from "./pin-icon";

export function Mission() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <PinIcon ground={false} className="w-16 -rotate-6 sm:w-20" />
          <h2 id="about-title" className="sr-only">
            About pinpoint
          </h2>
        </div>
        <div className="lg:col-span-9">
          <p className="font-display text-[clamp(1.9rem,4.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            We believe technology should make information easier to manage, not harder to find. pinpoint is being built
            to give people clarity across the tools they already use, without sacrificing control of their information.
          </p>
          <div className="mt-12 grid gap-6 text-lg leading-relaxed text-ink-3 md:grid-cols-2">
            <p>
              Everyone has lost an afternoon to looking for something they knew they had. More apps haven&rsquo;t
              fixed that. They&rsquo;ve made it worse, one new inbox at a time.
            </p>
            <p>
              So we&rsquo;re building the layer that sits across them, and we&rsquo;re building it to respect the
              people and organizations whose information it touches.
            </p>
          </div>
          <p className="mt-10 text-stone">The pinpoint team, November 2026</p>
        </div>
      </div>
    </section>
  );
}
