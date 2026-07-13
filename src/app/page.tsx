import { site } from "@/content/site";
import { PillarSection } from "@/components/ui/PillarSection";
import { Hero } from "@/components/sections/Hero";
import { Bio } from "@/components/sections/Bio";
import { Write } from "@/components/sections/Write";
import { Build } from "@/components/sections/Build";
import { Sing } from "@/components/sections/Sing";
import { Work } from "@/components/sections/Work";
import { Socials } from "@/components/sections/Socials";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] border border-line bg-surface">
      <Hero />

      <main id="main-content">
        <Bio />

        <PillarSection id="c-eng" pillar="eng" {...site.pillars.eng}>
          <Write />
        </PillarSection>

        <PillarSection
          id="c-ai"
          pillar="ai"
          surface="surface-2"
          {...site.pillars.ai}
        >
          <Build />
        </PillarSection>

        <PillarSection id="c-path" pillar="path" {...site.pillars.path}>
          <Sing />
          <Work />
        </PillarSection>
      </main>

      <Socials />
    </div>
  );
}
