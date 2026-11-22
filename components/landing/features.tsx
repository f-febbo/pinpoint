import type { ReactNode } from "react";
import { BrandIcon, type Brand } from "./brands";

function Card({ title, body, children, className = "" }: { title: string; body: string; children: ReactNode; className?: string }) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-[20px] border border-line bg-card ${className}`}>
      <div className="flex-1 border-b border-line bg-[linear-gradient(180deg,var(--color-mist),var(--color-card))] p-5 sm:p-7">
        {children}
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="headline trim text-[clamp(1.7rem,2.6vw,2.3rem)]">
          {title}
          <span className="pt">.</span>
        </h3>
        <p className="mt-4 max-w-[34ch] leading-relaxed text-moss">{body}</p>
      </div>
    </article>
  );
}

function Src({ brand }: { brand: Brand }) {
  return <BrandIcon brand={brand} className="size-3.5 shrink-0 text-moss" />;
}

/* where to be: a day rail across calendars */
function WhereToBe() {
  const rows: { time: string; title: string; brand: Brand; note?: string; state?: "now" | "leave" | "clash" }[] = [
    { time: "1:00", title: "Design review", brand: "outlook", note: "Now, ends in 25 min", state: "now" },
    { time: "2:30", title: "Budget review, Hudson 204", brand: "googleCalendar", note: "Leave by 2:18, 12 min walk", state: "leave" },
    { time: "3:15", title: "1:1 with Dana", brand: "teams", note: "Overlaps your dentist appointment", state: "clash" },
  ];
  return (
    <ol className="relative space-y-5 pl-6">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-sage" />
      {rows.map((r) => (
        <li key={r.time} className="relative">
          <span
            aria-hidden
            className={`absolute -left-6 top-1.5 size-[11px] rounded-full border ${
              r.state === "now" ? "border-copper bg-copper" : "border-sage bg-card"
            }`}
          />
          <div className="flex items-baseline gap-3">
            <span className="w-10 shrink-0 text-sm tabular-nums text-moss">{r.time}</span>
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-medium">
                <Src brand={r.brand} />
                <span className="line-clamp-1">{r.title}</span>
              </p>
              {r.note && (
                <p className={`mt-0.5 text-sm ${r.state === "now" ? "text-copper" : r.state === "clash" ? "text-ink" : "text-moss"}`}>
                  {r.state === "clash" && <span className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-copper align-middle" />}
                  {r.note}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* find anything: one query, results from anywhere */
function FindAnything() {
  const results: { brand: Brand; title: string; meta: string }[] = [
    { brand: "slack", title: "#finance thread with Priya and Sam", meta: "Oct 14" },
    { brand: "googleDrive", title: "Q1 budget, draft 3", meta: "Oct 15" },
    { brand: "gmail", title: "Re: Q1 numbers", meta: "Oct 13" },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 rounded-full border border-line bg-card px-4 py-2.5 text-sm">
        <svg viewBox="0 0 20 20" className="size-4 text-moss" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        where did we land on the q1 budget?
      </div>
      <ul className="mt-3 divide-y divide-line">
        {results.map((r, i) => (
          <li key={r.title} className="flex items-center gap-3 py-2.5 text-sm">
            <Src brand={r.brand} />
            <span className={`line-clamp-1 flex-1 ${i === 0 ? "font-medium" : "text-moss"}`}>{r.title}</span>
            <span className="shrink-0 tabular-nums text-moss">{r.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* follow-ups: what you owe, what you're owed */
function FollowUps() {
  const rows: { brand: Brand; text: string; age: string; mine: boolean }[] = [
    { brand: "gmail", text: "Reply to Dana about the vendor renewal", age: "2 days", mine: true },
    { brand: "slack", text: "Send Ortiz the launch deck", age: "4 days", mine: true },
    { brand: "teams", text: "Marisol owes you revised pricing", age: "Waiting", mine: false },
  ];
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.text} className="flex items-center gap-3 rounded-xl border border-line bg-card px-3.5 py-3 text-sm">
          <span aria-hidden className={`size-4 shrink-0 rounded-full border ${r.mine ? "border-ink" : "border-dashed border-sage"}`} />
          <span className="line-clamp-1 flex-1">{r.text}</span>
          <Src brand={r.brand} />
          <span className={`w-14 shrink-0 text-right tabular-nums ${r.mine ? "text-copper" : "text-moss"}`}>{r.age}</span>
        </li>
      ))}
    </ul>
  );
}

/* walk in prepared: the meeting brief */
function Prepared() {
  const items: { brand: Brand; text: string }[] = [
    { brand: "googleDrive", text: "Q1 budget, draft 3" },
    { brand: "slack", text: "Last thread with Priya" },
    { brand: "gmail", text: "Sam’s open question on tooling" },
  ];
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-medium">
          <Src brand="googleMeet" />
          Budget review
        </p>
        <span className="text-sm text-copper">in 25 min</span>
      </div>
      <p className="mt-3 text-sm text-moss">Last decision: keep headcount flat, move $40k to tooling.</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.text} className="flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-sm">
            <Src brand={i.brand} />
            {i.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="features-title" className="headline trim text-[clamp(2.6rem,6vw,5rem)] lg:col-span-7">
          what pinpoint does<span className="pt">.</span>
        </h2>
        <p className="fluid-body max-w-md leading-relaxed text-moss lg:col-span-5">
          Not another app to check. A single view of the ones you already use.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Card
          className="lg:col-span-7"
          title="always know where to be"
          body="Every calendar on one timeline, with when to leave and a heads-up when two plans collide."
        >
          <WhereToBe />
        </Card>
        <Card className="lg:col-span-5" title="find anything" body="Ask the way you’d ask a colleague. pinpoint searches every app at once.">
          <FindAnything />
        </Card>
        <Card className="lg:col-span-5" title="never drop a follow-up" body="Promises you made and replies you owe, pulled out of your threads.">
          <FollowUps />
        </Card>
        <Card
          className="lg:col-span-7"
          title="walk in prepared"
          body="Before each meeting, the doc, the thread and the last decision, in one place."
        >
          <Prepared />
        </Card>
      </div>
    </section>
  );
}
