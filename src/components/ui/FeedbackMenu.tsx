"use client";

import { useEffect, useRef, useState } from "react";

// Deep-links straight to GitHub's own "new issue" form with the matching
// issue template preselected (see .github/ISSUE_TEMPLATE/) — GitHub does
// the actual issue creation, so this needs no backend, token, or API route.
const REPO_URL = "https://github.com/bakarih/bakarisoul-com";

const ITEMS = [
  { label: "Share Feedback", template: "feedback.yml" },
  { label: "Report a Bug", template: "bug_report.yml" },
  { label: "Suggest a Feature", template: "feature_request.yml" },
];

export function FeedbackMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-5 left-5 z-20">
      {open && (
        <div
          role="menu"
          aria-label="Feedback"
          className="mb-2 flex flex-col border border-line-strong bg-surface-2 py-1.5"
        >
          {ITEMS.map((item) => (
            <a
              key={item.template}
              role="menuitem"
              href={`${REPO_URL}/issues/new?template=${item.template}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 font-mono text-xs whitespace-nowrap text-text hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 border border-line-strong bg-surface-2 px-4 py-2.5 font-mono text-xs tracking-[0.08em] text-text uppercase shadow-lg hover:border-accent"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v7A1.5 1.5 0 0 1 13.5 11H6l-3.5 3.5V11h-1A1.5 1.5 0 0 1 0 9.5v-7A1.5 1.5 0 0 1 1.5 1h-.5Z"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </svg>
        Feedback
      </button>
    </div>
  );
}
