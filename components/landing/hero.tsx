import { BrandIcon, brandName, integrations } from "./brands";
import { HeroArt } from "./hero-art";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden lg:sticky lg:top-0 lg:h-svh">
      <HeroArt />
      {/* keep the copy side calm */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-paper)_0%,color-mix(in_srgb,var(--color-paper)_75%,transparent)_38%,transparent_62%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 pt-36 sm:px-8 sm:pt-44">
        <h1 className="headline rise max-w-[12ch] text-[clamp(3.1rem,8vw,7.4rem)]">
          everything you need, in one place<span className="pt">.</span>
        </h1>
        <p
          className="fluid-body rise mt-8 max-w-[30rem] leading-relaxed text-moss [hyphens:manual]"
          style={{ animationDelay: "120ms" }}
        >
          pinpoint connects your calendars, inbox and chats, so you always know where to be, what you owe, and where
          everything is.
        </p>
        <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
          <a href="#feedback" className="label rounded-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-moss">
            Give feedback
          </a>
          <a
            href="#where"
            className="label rounded-full px-6 py-4 shadow-[inset_0_0_0_1px_var(--color-sage)] transition-colors hover:bg-card"
          >
            See how it works ↗
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-[1280px] px-5 pb-10 sm:px-8">
        <div className="flex flex-col gap-5 border-t border-line/80 pt-6 sm:flex-row sm:items-center sm:gap-10">
          <p className="label shrink-0 text-moss">Connects with</p>
          <ul className="flex flex-1 items-center justify-between gap-3 text-ink/70 sm:gap-6">
            {integrations.map((b) => (
              <li key={b} title={brandName[b]}>
                <BrandIcon brand={b} className="size-5 transition-colors hover:text-ink sm:size-6" />
                <span className="sr-only">{brandName[b]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
