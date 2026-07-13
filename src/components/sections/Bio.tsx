import { site } from "@/content/site";

export function Bio() {
  return (
    <section aria-label="Bio" className="border-b border-line px-6 py-16 sm:px-14">
      <div className="mx-auto max-w-[820px] font-serif text-[21px] leading-relaxed text-text">
        {site.bio.map((paragraph, i) => (
          <p key={i} className="mb-[18px] last:mb-0">
            {paragraph.map((segment, j) => {
              if (segment.href) {
                return (
                  <a
                    key={j}
                    href={segment.href}
                    className="text-accent hover:text-accent/80"
                  >
                    {segment.text}
                  </a>
                );
              }
              if (segment.italic) {
                return (
                  <em key={j} className="italic">
                    {segment.text}
                  </em>
                );
              }
              return <span key={j}>{segment.text}</span>;
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
