"use client";

import { useState } from "react";
import { CalendlyButton } from "@/components/sections/CalendlyButton";
import type { BookingOption } from "./BookingCTA";

type BookingCTADropdownProps = {
  kicker: string;
  title: string;
  description: string;
  services: readonly string[];
  options: readonly BookingOption[];
  surface?: "surface" | "surface-2";
};

export function BookingCTADropdown({
  kicker,
  title,
  description,
  services,
  options,
  surface = "surface-2",
}: BookingCTADropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = options[selectedIndex];

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
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="resume-linkedin-tier" className="sr-only">
          Choose a package
        </label>
        <select
          id="resume-linkedin-tier"
          value={selectedIndex}
          onChange={(event) => setSelectedIndex(Number(event.target.value))}
          className="flex-1 border border-line-strong bg-surface px-3.5 py-3 font-mono text-xs text-text sm:max-w-sm"
        >
          {options.map((option, i) => (
            <option key={option.label} value={i}>
              {option.label}
            </option>
          ))}
        </select>
        <CalendlyButton
          url={selected.calendlyUrl}
          label="Book on Calendly →"
          className="inline-block shrink-0 bg-text px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] text-surface uppercase"
        />
      </div>
    </div>
  );
}
