import Link from "next/link";
import type { LegalPageContent } from "@/content/site";
import { RichParagraph } from "@/components/ui/RichParagraph";

type LegalPageProps = {
  content: LegalPageContent;
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <div className="mx-auto min-h-screen max-w-[1200px] border-x border-line bg-surface">
      <div className="border-b border-line px-6 py-5 sm:px-14">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase hover:text-text"
        >
          ← bakarisoul.com
        </Link>
      </div>

      <main className="px-6 py-14 sm:px-14 sm:py-[72px]">
        <div className="mx-auto max-w-[720px]">
          <h1 className="mb-2 font-serif text-4xl font-medium tracking-[-0.02em] text-text sm:text-[56px]">
            {content.title}
          </h1>
          <p className="mb-10 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            Last updated {content.lastUpdated}
          </p>

          <div className="mb-12 font-serif text-lg leading-relaxed text-text">
            {content.intro.map((paragraph, i) => (
              <RichParagraph
                key={i}
                paragraph={paragraph}
                className="mb-4 last:mb-0"
              />
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  {section.heading}
                </h2>
                <div className="font-serif text-base leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph, i) => (
                    <RichParagraph
                      key={i}
                      paragraph={paragraph}
                      className="mb-3 last:mb-0"
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
