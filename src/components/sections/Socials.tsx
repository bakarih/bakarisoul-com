import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Socials() {
  const { socials, footer } = site;
  const entries = [
    socials.x,
    socials.instagram,
    socials.tiktok,
    socials.facebook,
    socials.linkedin,
    socials.github,
    socials.youtube,
    socials.substack,
  ];

  return (
    <footer aria-label="Elsewhere" className="bg-bg px-6 py-10 text-center sm:px-14">
      <div className="mb-5 font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
        {socials.kicker}
      </div>
      <nav
        aria-label="Social links"
        className="flex flex-wrap justify-center gap-x-7 gap-y-5 font-mono text-xs tracking-[0.06em]"
      >
        {entries.map((entry) => (
          <a
            key={entry.url}
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            className="text-text"
          >
            {entry.label}
            {"handle" in entry && (
              <>
                {" · "}
                <span className="text-accent">{entry.handle}</span>
              </>
            )}
          </a>
        ))}
      </nav>
      <div className="mt-7 flex flex-col items-center gap-3">
        <Image
          src="/logo/bakari-logo-cream.png"
          alt=""
          width={16}
          height={28}
          className="h-7 w-auto opacity-70"
        />
        <div className="font-mono text-[10px] tracking-[0.12em] text-[#7a7a7a]">
          © {new Date().getFullYear()} {footer.name} · {footer.domain} ·{" "}
          {footer.location}
        </div>
        <div className="flex gap-4 font-mono text-[10px] tracking-[0.12em] text-[#7a7a7a] uppercase">
          <Link href="/privacy" className="hover:text-muted">
            {footer.privacyLabel}
          </Link>
          <Link href="/terms" className="hover:text-muted">
            {footer.termsLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
