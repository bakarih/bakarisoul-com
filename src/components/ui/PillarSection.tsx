import type { ReactNode } from "react";
import type { PillarKey } from "@/content/site";
import { PillarChip } from "./PillarChip";

// Literal strings for Tailwind's scanner — see PillarChip.tsx.
const ACCENT_BG: Record<PillarKey, string> = {
  eng: "bg-pillar-eng",
  ai: "bg-pillar-ai",
  path: "bg-pillar-path",
};

type PillarSectionProps = {
  id: string;
  pillar: PillarKey;
  number: string;
  title: readonly string[];
  tagline: string;
  surface?: "surface" | "surface-2";
  children: ReactNode;
};

export function PillarSection({
  id,
  pillar,
  number,
  title,
  tagline,
  surface = "surface",
  children,
}: PillarSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-6 border-b border-line px-6 py-14 sm:px-14 sm:py-[72px] ${
        surface === "surface-2" ? "bg-surface-2" : ""
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1.5 ${ACCENT_BG[pillar]}`}
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 gap-10 pl-6 sm:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-12">
        <div>
          <PillarChip pillar={pillar} className="mb-3 block">
            Pillar {number}
          </PillarChip>
          <h2
            id={`${id}-title`}
            className="mb-4 font-serif text-[28px] leading-[1.02] font-medium text-text sm:text-[40px]"
          >
            {title.map((line, i) => (
              <span key={line}>
                {line}
                {i < title.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="font-serif text-[17px] leading-snug text-muted italic">
            {tagline}
          </p>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  );
}
