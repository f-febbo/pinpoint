import type { ReactNode } from "react";
import { Acr } from "./text";

function Node({ children, tone = "plain", sub }: { children: ReactNode; tone?: "plain" | "pin" | "risk" | "off"; sub?: string }) {
  const tones = {
    plain: "border-paper/80 bg-ink-2 text-paper",
    pin: "border-lime bg-lime text-ink",
    risk: "border-paper/60 bg-transparent text-paper",
    off: "border-dashed border-stone-light/70 bg-transparent text-stone-light",
  };
  return (
    <div className={`relative rounded-xl border-[1.5px] px-4 py-3 ${tones[tone]}`}>
      <p className="font-semibold leading-snug">{children}</p>
      {sub && <p className={`mt-0.5 text-sm ${tone === "pin" ? "text-ink/75" : "text-stone-light"}`}>{sub}</p>}
    </div>
  );
}

function Link({ color = "var(--color-paper)", delay = "0s", note }: { color?: string; delay?: string; note?: string }) {
  return (
    <div className="relative h-11">
      <div aria-hidden className="absolute inset-y-0 left-1/2 w-[1.5px]" style={{ background: color, opacity: 0.7 }}>
        <span className="packet" style={{ background: color, animationDelay: delay }} />
      </div>
      {note && (
        <p className="absolute left-1/2 top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap text-xs font-semibold text-paper">
          {note}
        </p>
      )}
    </div>
  );
}

export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="on-dark bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="privacy-title" className="display trim text-[clamp(2.7rem,6.6vw,6rem)] font-extrabold lg:col-span-8">
            Your data. Your environment. Your control.
          </h2>
          <div className="fluid-body space-y-4 leading-relaxed text-paper/80 lg:col-span-4 lg:self-end">
            <p>
              Most <Acr>AI</Acr> tools send what you ask, and the information behind it, to a model run by someone else.
              pinpoint is being designed the other way around.
            </p>
            <p>
              The goal is to run inference on your own device or inside your organization&rsquo;s environment, so
              sensitive information doesn&rsquo;t have to leave it to become useful.
            </p>
          </div>
        </div>

        {/* comparison */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          <figure className="rounded-[20px] border-[1.5px] border-line-dark p-5 sm:p-8">
            <figcaption className="mb-6">
              <p className="font-display text-2xl font-bold">A typical <Acr>AI</Acr> workflow</p>
              <p className="mt-1 text-sm text-stone-light">Information leaves your environment to be processed.</p>
            </figcaption>
            <div className="rounded-xl border-[1.5px] border-dashed border-stone-light/60 p-3">
              <p className="mb-2 text-xs text-stone-light">Your environment</p>
              <Node sub="Mail, docs, chat, calendar">Your apps</Node>
            </div>
            <Link delay="0s" note="Leaves your environment" />
            <Node tone="risk" sub="Content is copied to an outside service">Sent to an <Acr>AI</Acr> provider</Node>
            <Link delay="0.8s" />
            <Node tone="risk" sub="Retention and use set by the provider’s terms">Processed by their model</Node>
            <Link delay="1.6s" />
            <Node tone="risk">Answer comes back</Node>
          </figure>

          <figure className="rounded-[20px] border-[1.5px] border-lime p-5 sm:p-8">
            <figcaption className="mb-6">
              <p className="font-display text-2xl font-bold">pinpoint&rsquo;s proposed approach</p>
              <p className="mt-1 text-sm text-stone-light">Processing happens where your information already lives.</p>
            </figcaption>
            <div className="rounded-xl border-[1.5px] border-dashed border-lime p-3 pb-4">
              <p className="mb-2 text-xs text-lime">Your environment</p>
              <Node sub="Mail, docs, chat, calendar">Your apps</Node>
              <Link color="var(--color-lime)" delay="0s" />
              <Node sub="Respects each app’s access rules and your organization’s policies">Permission check</Node>
              <Link color="var(--color-lime)" delay="0.8s" />
              <Node tone="pin" sub="Model runs on your device or your company’s servers">Local inference</Node>
              <Link color="var(--color-lime)" delay="1.6s" />
              <Node sub="With links back to every source">Answer</Node>
            </div>
            <div className="mt-4">
              <Node tone="off" sub="Only if your organization chooses to allow it">External models: off by default</Node>
            </div>
          </figure>
        </div>

        <dl className="mt-16 grid gap-10 border-t border-line-dark pt-10 md:grid-cols-3">
          {[
            {
              t: "Permissions come first",
              d: "pinpoint should only see what you can already see. Integrations follow each app’s access rules and your organization’s policies.",
            },
            {
              t: "You choose where it runs",
              d: "A laptop for one person, company hardware for a team. The model goes to the data, not the other way around.",
            },
            {
              t: "Policy decides the exceptions",
              d: "If an organization wants an outside model for some tasks, that’s a decision it makes on purpose, not a default.",
            },
          ].map((x) => (
            <div key={x.t}>
              <dt className="font-display text-xl font-bold">{x.t}</dt>
              <dd className="mt-2 leading-relaxed text-paper/75">{x.d}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 max-w-3xl text-sm text-stone-light">
          pinpoint is in development. This describes what we&rsquo;re designing for, not a finished product. We
          don&rsquo;t hold security certifications yet, and no setup removes all risk. We&rsquo;ll be specific about
          what pinpoint does and doesn&rsquo;t do as it takes shape.
        </p>
      </div>
    </section>
  );
}
