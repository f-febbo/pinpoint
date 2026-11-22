/**
 * Google Form wiring.
 *
 * The site renders these questions with its own styles, then POSTs the answers
 * straight to the form's `formResponse` endpoint. Responses land in the form's
 * Responses tab (and any linked Sheet) exactly like an embedded form.
 *
 * To connect a form:
 *  1. Open the form, then More (⋮) > Get pre-filled link. Fill every question
 *     with a dummy answer and click Get link.
 *  2. The link contains `entry.123456789=...` for each question. Copy each
 *     entry ID into the matching question below.
 *  3. Set FORM_ID to the long ID in the form's public URL:
 *     https://docs.google.com/forms/d/e/<FORM_ID>/viewform
 *
 * Notes:
 *  - Option labels must match the form's options exactly (case and spaces).
 *  - The form must not require sign-in or verified email collection.
 *  - Questions marked required in Google must also be answered here, or Google
 *    drops the response.
 */
export const FORM_ID = "";

export const FORM_ACTION = FORM_ID ? `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse` : "";

type Base = { entry: string; label: string; required?: boolean; hint?: string };
export type Question =
  | (Base & { type: "radio" | "checkbox"; options: string[] })
  | (Base & { type: "scale"; min: number; max: number; minLabel: string; maxLabel: string })
  | (Base & { type: "text" | "paragraph" | "email"; placeholder?: string });

// Placeholder MVP questions. Replace the entry IDs (and wording) to match the real form.
export const questions: Question[] = [
  {
    entry: "entry.1000000001",
    type: "radio",
    label: "How do you keep track of where you need to be today?",
    options: ["One calendar", "Several calendars", "Calendar plus notes or memory", "I mostly don’t"],
    required: true,
  },
  {
    entry: "entry.1000000002",
    type: "radio",
    label: "Which would you use most?",
    options: ["Knowing where to be", "Finding anything", "Follow-up reminders", "Meeting prep"],
    required: true,
  },
  {
    entry: "entry.1000000003",
    type: "checkbox",
    label: "Which tools would you connect?",
    hint: "Pick any",
    options: ["Outlook", "Google Calendar", "Gmail", "Teams", "Slack", "Google Meet", "Notion", "Google Drive"],
  },
  {
    entry: "entry.1000000004",
    type: "scale",
    label: "How much does keeping AI on your own device matter to you?",
    min: 1,
    max: 5,
    minLabel: "Not at all",
    maxLabel: "A lot",
  },
  {
    entry: "entry.1000000005",
    type: "paragraph",
    label: "What would make pinpoint a must-have for you?",
    placeholder: "Anything goes",
  },
  {
    entry: "entry.1000000006",
    type: "email",
    label: "Email, if you’d like updates",
    placeholder: "you@school.edu",
  },
];
