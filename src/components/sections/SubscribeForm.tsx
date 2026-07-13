"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const { substack } = site;

  return (
    <div>
      <form
        action={substack.subscribeApiUrl}
        method="post"
        target="_blank"
        className="flex gap-2.5"
        onSubmit={() => setStatus("submitted")}
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          name="email"
          required
          placeholder={substack.emailPlaceholder}
          className="flex-1 border border-line-strong bg-surface px-3.5 py-3 font-mono text-xs text-text placeholder:text-muted/60"
        />
        <button
          type="submit"
          className="cursor-pointer bg-accent px-5 py-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-surface uppercase"
        >
          {substack.submitLabel}
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-[1em] font-mono text-xs text-muted">
        {status === "submitted" ? substack.successMessage : ""}
      </p>
    </div>
  );
}
