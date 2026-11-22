"use client";

import { useState, type FormEvent } from "react";
import form from "@/lib/form.json";
import { Mark } from "./mark";
import { Wordmark } from "./wordmark";

type Q = {
  entry: string;
  type: "text" | "paragraph" | "radio" | "dropdown" | "checkbox" | "scale";
  label: string;
  description?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
};

const questions = form.questions as Q[];
const ACTION = `https://docs.google.com/forms/d/e/${form.id}/formResponse`;

/**
 * A question like "Pick one:\n1) a pin that...\n2) a widget that..." with options
 * "1) Pin" / "2) Widget" becomes a heading plus option cards that carry their description.
 */
function splitNumbered(q: Q) {
  const lines = q.label.split("\n").map((l) => l.trim()).filter(Boolean);
  const described = new Map<string, string>();
  const rest: string[] = [];
  for (const l of lines) {
    const m = l.match(/^(\d+)\)\s*(.+)$/);
    if (m) described.set(m[1], m[2]);
    else rest.push(l);
  }
  const options = (q.options ?? []).map((o) => {
    const m = o.match(/^(\d+)\)\s*(.+)$/);
    const desc = m ? described.get(m[1]) : undefined;
    return { value: o, title: m ? m[2] : o, desc: desc ? desc.charAt(0).toUpperCase() + desc.slice(1) + "." : undefined };
  });
  return { heading: rest.join(" ") || q.label, options };
}

const inputCls =
  "w-full rounded-2xl border border-border bg-surface px-5 py-4 text-[1.02rem] text-text outline-none transition-colors placeholder:text-dim hover:border-dim focus-visible:border-blue focus-visible:shadow-[0_0_0_4px_rgba(46,107,255,0.18)] focus-visible:outline-none";

function Field({ q, value, set }: { q: Q; value: string | string[] | undefined; set: (v: string | string[]) => void }) {
  const id = q.entry.replace(".", "-");
  const req = q.required ? <span className="text-orange"> *</span> : null;

  if (q.type === "radio" || q.type === "checkbox") {
    const { heading, options } = splitNumbered(q);
    const list = Array.isArray(value) ? value : value ? [value] : [];
    const cards = options.some((o) => o.desc);
    return (
      <fieldset>
        <legend className="mb-4 text-xl font-medium tracking-[-0.01em]">
          {heading}
          {req}
        </legend>
        <div className={cards ? "grid gap-3 sm:grid-cols-2" : "flex flex-wrap gap-2"}>
          {options.map((o) => {
            const on = list.includes(o.value);
            const toggle = () =>
              q.type === "radio" ? set(o.value) : set(on ? list.filter((x) => x !== o.value) : [...list, o.value]);
            return (
              <label
                key={o.value}
                className={`cursor-pointer border transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange ${
                  cards ? "rounded-2xl p-5" : "rounded-full px-5 py-3"
                } ${on ? "border-blue bg-blue/12" : "border-border bg-surface hover:border-dim"}`}
              >
                <input type={q.type} name={id} value={o.value} checked={on} onChange={toggle} className="sr-only" />
                {cards ? (
                  <span className="flex items-start gap-4">
                    <span
                      className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? "border-blue" : "border-dim"}`}
                    >
                      {on && <span className="size-2 rounded-full bg-blue" />}
                    </span>
                    <span>
                      <span className="block text-lg font-medium">{o.title}</span>
                      {o.desc && <span className="mt-1 block text-muted">{o.desc}</span>}
                    </span>
                  </span>
                ) : (
                  o.title
                )}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (q.type === "scale") {
    const nums = Array.from({ length: (q.max ?? 5) - (q.min ?? 1) + 1 }, (_, i) => String((q.min ?? 1) + i));
    return (
      <fieldset>
        <legend className="mb-4 text-xl font-medium tracking-[-0.01em]">
          {q.label}
          {req}
        </legend>
        <div className="flex gap-2">
          {nums.map((n) => (
            <label
              key={n}
              className={`grid h-14 flex-1 cursor-pointer place-items-center rounded-2xl border tabular-nums transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-orange ${
                value === n ? "border-blue bg-blue/12" : "border-border bg-surface hover:border-dim"
              }`}
            >
              <input type="radio" name={id} value={n} checked={value === n} onChange={() => set(n)} className="sr-only" />
              {n}
            </label>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm text-muted">
          <span>{q.minLabel}</span>
          <span>{q.maxLabel}</span>
        </div>
      </fieldset>
    );
  }

  if (q.type === "dropdown") {
    return (
      <div>
        <label htmlFor={id} className="mb-4 block text-xl font-medium tracking-[-0.01em]">
          {q.label}
          {req}
        </label>
        <select id={id} value={(value as string) ?? ""} onChange={(e) => set(e.target.value)} className={inputCls}>
          <option value="">Choose one</option>
          {q.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  const isEmail = /e-?mail/i.test(q.label);
  return (
    <div>
      <label htmlFor={id} className="mb-4 block text-xl font-medium tracking-[-0.01em]">
        {q.label}
        {req}
      </label>
      {q.description && <p className="-mt-2 mb-4 text-muted">{q.description}</p>}
      {q.type === "paragraph" ? (
        <textarea id={id} rows={4} value={(value as string) ?? ""} onChange={(e) => set(e.target.value)} className={`${inputCls} resize-y`} />
      ) : (
        <input
          id={id}
          type={isEmail ? "email" : "text"}
          autoComplete={isEmail ? "email" : undefined}
          placeholder={isEmail ? "you@email.com" : undefined}
          value={(value as string) ?? ""}
          onChange={(e) => set(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error" | "missing" | "email" | "empty";

export function Feedback() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const filled = (v: string | string[] | undefined) => (Array.isArray(v) ? v.length > 0 : !!v?.trim());
    if (questions.some((q) => q.required && !filled(answers[q.entry]))) return setStatus("missing");
    if (!questions.some((q) => filled(answers[q.entry]))) return setStatus("empty");
    const emailQ = questions.find((q) => /e-?mail/i.test(q.label));
    const email = emailQ && (answers[emailQ.entry] as string | undefined);
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return setStatus("email");

    const body = new URLSearchParams();
    for (const q of questions) {
      const v = answers[q.entry];
      if (Array.isArray(v)) v.forEach((x) => body.append(q.entry, x));
      else if (v?.trim()) body.append(q.entry, v.trim());
    }
    body.append("pageHistory", form.pageHistory);

    setStatus("sending");
    try {
      // Google Forms doesn't allow reading the reply cross-origin, so this is a
      // fire-and-forget POST; it lands in the form's responses like any other.
      await fetch(ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      setAnswers({});
    } catch {
      setStatus("error");
    }
  };

  const messages: Partial<Record<Status, string>> = {
    missing: "Answer the questions marked * first.",
    empty: "Answer at least one question to send.",
    email: "That email doesn’t look right.",
    error: "That didn’t go through. Check your connection and try again.",
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="grain relative z-10 overflow-hidden rounded-t-[36px] bg-bg shadow-[0_-30px_80px_rgba(0,0,0,0.6)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(255,164,102,0.22),transparent_70%),radial-gradient(50%_60%_at_100%_100%,rgba(46,107,255,0.25),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="feedback-title" className="display trim text-[clamp(2.6rem,5.4vw,4.6rem)]">
            Help Us Build It Right
          </h2>
          <p className="fluid-body mt-8 max-w-sm leading-relaxed text-white">
            Take a minute to tell us which Pinpoint you’d actually use.
          </p>
        </div>

        <div className="lg:col-span-7">
          {status === "sent" ? (
            <div className="rounded-3xl border border-border bg-surface p-10" role="status">
              <Mark className="size-10 text-orange" />
              <p className="mt-6 text-3xl font-medium tracking-[-0.02em]">Thank You</p>
              <p className="mt-3 max-w-md text-white">Your answers are in, and we’ll be in touch before launch if you left your email.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-blue-soft underline underline-offset-4">
                Send another response
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-12">
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="press rounded-full bg-orange px-8 py-4 font-medium text-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_-8px_rgba(255,164,102,0.6)] transition-colors hover:bg-[#ffb680] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
                <p aria-live="polite" className="text-muted">
                  {messages[status]}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-lg" aria-label="pinpoint, back to top">
          <Mark className="size-6" />
          <Wordmark />
        </a>
        <p className="text-sm text-muted">© 2026 pinpoint</p>
      </div>
    </footer>
  );
}
