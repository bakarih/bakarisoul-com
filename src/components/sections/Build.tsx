import { site } from "@/content/site";

export function Build() {
  const { interviewrubric } = site;

  return (
    <>
      <div className="border border-line bg-surface p-7">
        <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-pillar-ai uppercase">
          {interviewrubric.kicker}
        </div>
        <div className="mb-2.5 font-serif text-[22px] font-medium text-text sm:text-[30px]">
          {interviewrubric.name}
          <span className="text-pillar-ai">{interviewrubric.nameSuffix}</span>
        </div>
        <p className="mb-5 font-serif text-base leading-snug text-muted">
          {interviewrubric.description}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={interviewrubric.url}
            target="_blank"
            rel="noreferrer"
            className="bg-pillar-ai px-[18px] py-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-surface uppercase"
          >
            {interviewrubric.ctaLabel}
          </a>
          <a
            href={interviewrubric.peerpushUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-pillar-ai px-[18px] py-3 font-mono text-[11px] tracking-[0.14em] text-pillar-ai uppercase"
          >
            {interviewrubric.peerpushCtaLabel}
          </a>
        </div>
      </div>
      <p className="pl-1 font-mono text-[11px] tracking-[0.06em] text-muted/60">
        {interviewrubric.peerpushNote}
      </p>
    </>
  );
}
