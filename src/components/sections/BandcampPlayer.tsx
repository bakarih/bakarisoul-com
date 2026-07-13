type BandcampPlayerProps = {
  title: string;
  trackId: string;
  url: string;
};

export function BandcampPlayer({ title, trackId, url }: BandcampPlayerProps) {
  return (
    <div className="overflow-x-auto">
      {/* Bandcamp's "large" player is fixed at 400px wide and doesn't reflow below that */}
      <iframe
        title={`Bandcamp player: ${title}`}
        style={{ border: 0, width: 400, minWidth: 400, height: 120 }}
        src={`https://bandcamp.com/EmbeddedPlayer/track=${trackId}/size=large/bgcol=141414/linkcol=ff6719/tracklist=false/artwork=small/transparent=true/`}
        loading="lazy"
        seamless
      />
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="sr-only"
      >
        {title} on Bandcamp
      </a>
    </div>
  );
}
