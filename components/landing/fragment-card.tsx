import { SourceGlyph, sourceLabel, type SourceKind } from "./source-glyph";

export type Fragment = {
  id: string;
  kind: SourceKind;
  title: string;
  detail?: string;
  tag?: string;
  urgent?: boolean;
};

/** A single scrap of information from some app: a tactile chip with a hard ink shadow. */
export function FragmentCard({
  f,
  showTag = false,
  className = "",
}: {
  f: Fragment;
  showTag?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[10px] border-[1.5px] border-ink bg-[#fcfbf7] px-3 py-2.5 shadow-[3px_3px_0_var(--color-ink)] ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[0.7rem] text-stone sm:text-xs">
        <SourceGlyph kind={f.kind} className="size-3.5 shrink-0 text-ink" />
        <span>{sourceLabel[f.kind]}</span>
        {f.tag && (
          <span
            className={`ml-auto rounded-full px-2 py-px text-[0.66rem] font-semibold transition-all duration-500 sm:text-[0.7rem] ${
              showTag ? "opacity-100" : "opacity-0"
            } ${f.urgent ? "bg-pin text-ink" : "bg-paper-2 text-ink-3"}`}
          >
            {f.tag}
          </span>
        )}
      </div>
      <p className="mt-1 truncate text-[0.8rem] font-semibold leading-snug sm:text-sm">{f.title}</p>
      {f.detail && <p className="truncate text-[0.72rem] text-stone sm:text-[0.8rem]">{f.detail}</p>}
    </div>
  );
}
