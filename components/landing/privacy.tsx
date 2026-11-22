import { Acr } from "./text";

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="relative overflow-hidden bg-ink text-paper">
      {/* a single soft ribbon for continuity with the hero */}
      <svg aria-hidden className="absolute inset-0 size-full opacity-60" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="pv-soft">
            <feGaussianBlur stdDeviation="40" />
          </filter>
          <linearGradient id="pv-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4d6457" />
            <stop offset="1" stopColor="#1a2420" />
          </linearGradient>
        </defs>
        <path d="M1500 -80 C 1100 200 900 520 -100 760" stroke="url(#pv-g)" strokeWidth="220" fill="none" filter="url(#pv-soft)" />
      </svg>

      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 id="privacy-title" className="headline trim text-[clamp(2.6rem,6vw,5rem)]">
            private by design<span className="pt">.</span>
          </h2>
          <p className="fluid-body mt-8 max-w-md leading-relaxed text-sage-light">
            pinpoint runs its <Acr>AI</Acr> on your device or your company’s own servers. Your information isn’t sent to
            someone else’s model to be useful.
          </p>
        </div>

        {/* diagram */}
        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="relative rounded-[24px] border border-sage/50 p-5 pt-9 sm:p-8 sm:pt-10">
            <span className="label absolute -top-2.5 left-6 bg-ink px-2 text-sage">Your device</span>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center sm:gap-3">
              {["Your apps", "On‑device model", "You"].map((t, i) => (
                <div key={t} className="contents">
                  <div
                    className={`rounded-2xl px-2 py-4 text-sm sm:px-3 sm:text-base ${
                      i === 1 ? "bg-paper text-ink" : "border border-line-dark bg-ink-2"
                    }`}
                  >
                    {t}
                  </div>
                  {i < 2 && <span aria-hidden className="h-px w-4 bg-sage sm:w-8" />}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line-dark px-5 py-4 text-sm text-sage">
            <svg viewBox="0 0 20 20" className="size-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="10" cy="10" r="7" />
              <path d="M5 15L15 5" />
            </svg>
            <span>
              Third-party <Acr>AI</Acr> is off by default. An organization can allow it on purpose.
            </span>
          </div>
          <figcaption className="sr-only">
            Your apps, the model and you all stay inside your device. Third-party AI is off by default.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
