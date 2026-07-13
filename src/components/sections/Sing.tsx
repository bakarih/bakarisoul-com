import { site } from "@/content/site";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { BandcampPlayer } from "./BandcampPlayer";

export function Sing() {
  const { music } = site;

  return (
    <div className="border border-line bg-surface-2 p-7">
      <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-pillar-path uppercase">
        {music.kicker}
      </div>
      <div className="mb-2.5 font-serif text-[22px] font-medium text-text sm:text-[30px]">
        {music.featuredTitlePrefix}
        <em className="text-pillar-path italic">{music.featuredTitleEmphasis}</em>
      </div>
      <p className="mb-5 font-serif text-base leading-snug text-muted">
        {music.description}
      </p>
      <YouTubeEmbed />
      <div className="flex flex-wrap gap-2.5">
        <a
          href={music.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-pillar-path px-[18px] py-3 font-mono text-[11px] font-semibold tracking-[0.14em] text-surface uppercase"
        >
          {music.youtubeCtaLabel}
        </a>
        <a
          href={music.bandcampUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-pillar-path px-[18px] py-3 font-mono text-[11px] tracking-[0.14em] text-pillar-path uppercase"
        >
          {music.bandcampCtaLabel}
        </a>
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-pillar-path uppercase">
          {music.bandcampKicker}
        </div>
        <div className="flex flex-col gap-3">
          {music.bandcampTracks.map((track) => (
            <BandcampPlayer key={track.trackId} {...track} />
          ))}
        </div>
      </div>
    </div>
  );
}
