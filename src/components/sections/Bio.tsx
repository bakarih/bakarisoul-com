import { site } from "@/content/site";
import { RichParagraph } from "@/components/ui/RichParagraph";

export function Bio() {
  return (
    <section aria-label="Bio" className="border-b border-line px-6 py-16 sm:px-14">
      <div className="mx-auto max-w-[820px] font-serif text-[21px] leading-relaxed text-text">
        {site.bio.map((paragraph, i) => (
          <RichParagraph
            key={i}
            paragraph={paragraph}
            className="mb-[18px] last:mb-0"
          />
        ))}
      </div>
    </section>
  );
}
