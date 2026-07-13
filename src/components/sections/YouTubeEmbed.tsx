"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function YouTubeEmbed() {
  const [loaded, setLoaded] = useState(false);
  const { music } = site;

  if (loaded) {
    return (
      <div className="relative mb-4 aspect-video border border-line-strong bg-bg">
        <iframe
          src={`https://www.youtube.com/embed/${music.youtubeId}?autoplay=1`}
          title={`${music.featuredTitlePrefix}${music.featuredTitleEmphasis}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video — ${music.youtubeCaption}`}
      className="group relative mb-4 block aspect-video w-full overflow-hidden border border-line-strong bg-cover bg-center bg-bg"
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi_webp/${music.youtubeId}/maxresdefault.webp)`,
      }}
    >
      <span className="absolute inset-0 bg-bg/30 transition-colors group-hover:bg-bg/10" />
      <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-pillar-path">
        <svg width="18" height="22" viewBox="0 0 24 28" fill="var(--surface)" aria-hidden="true">
          <path d="M2 2 L22 14 L2 26 Z" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
        {music.youtubeCaption}
      </span>
    </button>
  );
}
