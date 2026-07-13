import type { BioParagraph } from "@/content/site";

type RichParagraphProps = {
  paragraph: BioParagraph;
  className?: string;
};

export function RichParagraph({ paragraph, className }: RichParagraphProps) {
  return (
    <p className={className}>
      {paragraph.map((segment, i) => {
        if (segment.href) {
          const isExternal = !segment.href.startsWith("mailto:");
          return (
            <a
              key={i}
              href={segment.href}
              className="text-accent hover:text-accent/80"
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {segment.text}
            </a>
          );
        }
        if (segment.italic) {
          return (
            <em key={i} className="italic">
              {segment.text}
            </em>
          );
        }
        return <span key={i}>{segment.text}</span>;
      })}
    </p>
  );
}
