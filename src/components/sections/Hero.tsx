import Image from "next/image";
import { site } from "@/content/site";
import { IdentityStrip } from "@/components/ui/IdentityStrip";

// Literal strings for Tailwind's scanner — see PillarChip.tsx.
const NAV_COLOR: Record<string, string> = {
  eng: "text-pillar-eng border-pillar-eng hover:bg-pillar-eng/10",
  ai: "text-pillar-ai border-pillar-ai hover:bg-pillar-ai/10",
  path: "text-pillar-path border-pillar-path hover:bg-pillar-path/10",
};

export function Hero() {
  return (
    <header>
      <nav
        aria-label="Pillars"
        className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-14"
      >
        <Image
          src="/logo/bakari-logo-cream.png"
          alt={`${site.logoMark} ${site.logoSuffix}`}
          width={25}
          height={44}
          className="h-11 w-auto"
        />
        <div className="hidden gap-3 font-mono text-[11px] tracking-[0.14em] uppercase sm:flex">
          {site.nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`border px-3 py-1.5 transition-colors ${NAV_COLOR[item.key]}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <IdentityStrip />

      <div className="flex flex-col items-center gap-7 border-b border-line px-6 py-14 text-center sm:px-14 sm:py-[72px]">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-accent">
          <Image
            src="/portrait.png"
            alt={site.hero.portraitAlt}
            width={96}
            height={96}
            priority
            className="h-full w-full object-cover object-[55%_18%]"
          />
        </div>
        <h1 className="max-w-4xl font-serif text-4xl leading-[0.96] font-medium tracking-[-0.03em] text-text sm:text-[56px] lg:text-hero">
          {site.hero.titlePrefix}
          <em className="text-accent italic">{site.hero.titleEmphasis}</em>
          {site.hero.titleSuffix}
        </h1>
        <p className="max-w-2xl font-serif text-lg leading-snug text-muted italic sm:text-xl">
          {site.hero.subtitle}
        </p>
      </div>
    </header>
  );
}
