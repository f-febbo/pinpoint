const steps = [
  { n: "01", t: "connect", d: "Sign in to the calendars, inboxes and chats you already use. pinpoint only sees what you can." },
  { n: "02", t: "organize", d: "A model on your device links people, dates and decisions across every app." },
  { n: "03", t: "know", d: "Open pinpoint to see where to be next, what you owe, and anything you need to find." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <h2 id="how-title" className="headline trim text-[clamp(2.6rem,6vw,5rem)]">
          how it works<span className="pt">.</span>
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-ink pt-6">
              <span className="label text-copper">{s.n}</span>
              <h3 className="headline trim mt-6 text-4xl">{s.t}</h3>
              <p className="mt-5 max-w-[32ch] leading-relaxed text-moss">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
