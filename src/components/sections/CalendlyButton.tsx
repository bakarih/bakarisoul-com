"use client";

import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

type CalendlyButtonProps = {
  url: string;
  label: string;
  className?: string;
};

export function CalendlyButton({ url, label, className }: CalendlyButtonProps) {
  // Don't fetch Calendly's JS/CSS until the user shows intent — keeps this
  // CTA off the initial page-load critical path entirely.
  const [wantsWidget, setWantsWidget] = useState(false);
  const primeWidget = () => setWantsWidget(true);

  return (
    <>
      {wantsWidget && (
        <>
          <link
            rel="stylesheet"
            href="https://assets.calendly.com/assets/external/widget.css"
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
        </>
      )}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={primeWidget}
        onFocus={primeWidget}
        onTouchStart={primeWidget}
        onClick={(event) => {
          if (window.Calendly) {
            event.preventDefault();
            window.Calendly.initPopupWidget({ url });
          }
        }}
        className={
          className ??
          "inline-block shrink-0 bg-text px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-surface uppercase"
        }
      >
        {label}
      </a>
    </>
  );
}
