"use client";

import { useState, type FormEvent } from "react";
import { FORM_ACTION, questions, type Question } from "@/lib/feedback-form";
import { Wordmark } from "./wordmark";

type Answers = Record<string, string | string[]>;
type Status = "idle" | "sending" | "sent" | "error" | "missing" | "unconnected";

function Pill({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: string;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper ${
        checked ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-sage"
      }`}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

function Field({ q, value, set }: { q: Question; value: string | string[] | undefined; set: (v: string | string[]) => void }) {
  const id = q.entry.replace(".", "-");
  const legend = (
    <>
      {q.label}
      {q.required && <span className="pt"> *</span>}
      {q.hint && <span className="ml-2 text-sm text-moss">{q.hint}</span>}
    </>
  );

  if (q.type === "radio" || q.type === "checkbox") {
    const list = Array.isArray(value) ? value : value ? [value] : [];
    return (
      <fieldset>
        <legend className="mb-4 text-lg">{legend}</legend>
        <div className="flex flex-wrap gap-2">
          {q.options.map((o) => (
            <Pill
              key={o}
              type={q.type}
              name={id}
              value={o}
              checked={list.includes(o)}
              onChange={() =>
                q.type === "radio" ? set(o) : set(list.includes(o) ? list.filter((x) => x !== o) : [...list, o])
              }
            >
              {o}
            </Pill>
          ))}
        </div>
      </fieldset>
    );
  }

  if (q.type === "scale") {
    const nums = Array.from({ length: q.max - q.min + 1 }, (_, i) => String(q.min + i));
    return (
      <fieldset>
        <legend className="mb-4 text-lg">{legend}</legend>
        <div className="flex max-w-md gap-2">
          {nums.map((n) => (
            <label
              key={n}
              className={`grid h-12 flex-1 cursor-pointer place-items-center rounded-xl border tabular-nums transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper ${
                value === n ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-sage"
              }`}
            >
              <input type="radio" name={id} value={n} checked={value === n} onChange={() => set(n)} className="sr-only" />
              {n}
            </label>
          ))}
        </div>
        <div className="mt-2 flex max-w-md justify-between text-sm text-moss">
          <span>{q.minLabel}</span>
          <span>{q.maxLabel}</span>
        </div>
      </fieldset>
    );
  }

  const t = q as Extract<Question, { type: "text" | "paragraph" | "email" }>;
  const common = {
    id,
    value: (value as string) ?? "",
    placeholder: t.placeholder,
    required: q.required,
    onChange: (e: { target: { value: string } }) => set(e.target.value),
    className:
      "w-full rounded-2xl border border-line bg-card px-4 py-3.5 text-[1.02rem] outline-none transition-colors placeholder:text-moss/60 hover:border-sage focus-visible:border-ink focus-visible:outline-none",
  };
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-lg">
        {legend}
      </label>
      {q.type === "paragraph" ? (
        <textarea rows={4} {...common} className={`${common.className} resize-y`} />
      ) : (
        <input type={q.type === "email" ? "email" : "text"} autoComplete={q.type === "email" ? "email" : undefined} {...common} />
      )}
    </div>
  );
}

export function Feedback() {
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const missing = questions.filter((q) => {
      const v = answers[q.entry];
      return q.required && (!v || (Array.isArray(v) && v.length === 0));
    });
    if (missing.length) {
      setStatus("missing");
      return;
    }
    if (!FORM_ACTION) {
      setStatus("unconnected");
      return;
    }

    const body = new URLSearchParams();
    for (const q of questions) {
      const v = answers[q.entry];
      if (Array.isArray(v)) v.forEach((x) => body.append(q.entry, x));
      else if (v) body.append(q.entry, v);
    }
    setStatus("sending");
    try {
      // Google doesn't send CORS headers, so the response is opaque. A resolved
      // request means it reached Google; an invalid answer is dropped server-side.
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      setAnswers({});
    } catch {
      setStatus("error");
    }
  };

  const message: Record<Exclude<Status, "idle" | "sending">, string> = {
    sent: "Thanks. Your feedback was sent to the team.",
    error: "That didn’t send. Check your connection and try again.",
    missing: "Answer the questions marked * to send.",
    unconnected: "Preview only: this form isn’t connected to Google Forms yet, so nothing was sent.",
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="relative z-10 rounded-t-[32px] bg-paper shadow-[0_-24px_60px_rgba(15,23,20,0.12)]"
    >
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="feedback-title" className="headline trim text-[clamp(2.6rem,6vw,5rem)]">
              help shape pinpoint<span className="pt">.</span>
            </h2>
            <p className="fluid-body mt-8 max-w-sm leading-relaxed text-moss">
              We’re testing the idea before we build it. Six quick questions, about two minutes.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-12 lg:col-span-7 lg:col-start-6">
          {questions.map((q) => (
            <Field
              key={q.entry}
              q={q}
              value={answers[q.entry]}
              set={(v) => {
                setAnswers((a) => ({ ...a, [q.entry]: v }));
                if (status !== "idle" && status !== "sending") setStatus("idle");
              }}
            />
          ))}

          <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="label rounded-full bg-ink px-8 py-4 text-paper transition-colors hover:bg-moss disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send feedback"}
            </button>
            <p aria-live="polite" className={`text-[0.95rem] ${status === "sent" ? "text-ink" : "text-moss"}`}>
              {status !== "idle" && status !== "sending" && message[status]}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" className="text-2xl" aria-label="Back to top">
            <Wordmark />
          </a>
          <p className="mt-4 text-sm text-sage">A student concept for an entrepreneurship course, 2026.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["#where", "Where to be"],
              ["#find", "Find anything"],
              ["#privacy", "Privacy"],
              ["#feedback", "Give feedback"],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="label text-sage transition-colors hover:text-paper">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
