import { site } from "@/content/site";
import { SubscribeForm } from "./SubscribeForm";
import { BookingCTA } from "@/components/ui/BookingCTA";

export function Write() {
  const { substack, hire } = site;

  return (
    <>
      <a
        href={substack.url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col gap-2 border border-line bg-surface-2 p-6 transition-colors hover:border-line-strong"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
          {substack.kicker}
        </span>
        <span className="font-serif text-xl font-medium text-text sm:text-2xl">
          {substack.name}
        </span>
        <span className="font-serif text-[15px] text-muted italic">
          {substack.description}
        </span>
      </a>
      <SubscribeForm />
      <BookingCTA {...hire.consulting} calendlyUrl={hire.calendlyUrl} />
      <BookingCTA
        {...hire.interviewCoaching}
        calendlyUrl={hire.interviewCoachingCalendlyUrl}
      />
    </>
  );
}
