import { CalendlyButton } from "@/components/sections/CalendlyButton";

export type BookingOption = { label: string; calendlyUrl: string };

type BookingCTAProps = {
  kicker: string;
  title: string;
  description: string;
  services: readonly string[];
  options: readonly BookingOption[];
  surface?: "surface" | "surface-2";
};

export function BookingCTA({
  kicker,
  title,
  description,
  services,
  options,
  surface = "surface-2",
}: BookingCTAProps) {
  return (
    <div
      className={`border border-line p-7 ${
        surface === "surface-2" ? "bg-surface-2" : "bg-surface"
      }`}
    >
      <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-text uppercase">
        {kicker}
      </div>
      <div className="mb-2.5 font-serif text-[22px] font-medium text-text sm:text-[30px]">
        {title}
      </div>
      <p className="mb-4 font-serif text-base leading-snug text-muted">
        {description}
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {services.map((service) => (
          <span
            key={service}
            className="border border-line-strong px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
          >
            {service}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <CalendlyButton
            key={option.label}
            url={option.calendlyUrl}
            label={option.label}
            className="inline-block bg-text px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] text-surface uppercase"
          />
        ))}
      </div>
    </div>
  );
}
