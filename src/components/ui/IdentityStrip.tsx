import Image from "next/image";
import { site } from "@/content/site";
import { PillarChip } from "./PillarChip";

export function IdentityStrip() {
  return (
    <div className="grid grid-cols-3 border-b border-line lg:grid-cols-6">
      {site.identityStrip.map((panel) => (
        <div
          key={panel.glyph}
          className="relative aspect-square overflow-hidden border-r border-b border-bg last:border-r-0 lg:aspect-auto lg:h-80 lg:border-b-0 [&:nth-child(3)]:border-r-0 lg:[&:nth-child(3)]:border-r"
        >
          <Image
            src={`/glyphs/${panel.glyph}.svg`}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 16.67vw, 33vw"
          />
          <div className="absolute bottom-3.5 left-3.5">
            <PillarChip pillar={panel.pillar} variant="pill">
              {panel.label}
            </PillarChip>
          </div>
        </div>
      ))}
    </div>
  );
}
