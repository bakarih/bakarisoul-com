import type { ReactNode } from "react";
import type { PillarKey } from "@/content/site";

// Tailwind's scanner needs these class names to appear as literal strings
// somewhere in source — a template-interpolated `text-pillar-${pillar}`
// would get purged from the production build.
const TEXT_COLOR: Record<PillarKey, string> = {
  eng: "text-pillar-eng",
  ai: "text-pillar-ai",
  path: "text-pillar-path",
};

type PillarChipProps = {
  pillar: PillarKey;
  children: ReactNode;
  variant?: "label" | "pill";
  className?: string;
};

export function PillarChip({
  pillar,
  children,
  variant = "label",
  className = "",
}: PillarChipProps) {
  const color = TEXT_COLOR[pillar];

  if (variant === "pill") {
    return (
      <span
        className={`inline-block bg-surface/80 px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.14em] ${color} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.24em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}
