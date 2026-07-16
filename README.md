# bakarisoul.com

Personal landing page for Bakari Holmes — single-page site introducing the six
facets of his work (engineering leadership, building with AI, the non-linear
path) and routing visitors to Substack, interviewrubric.com, music, and
Calendly.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
Design system and copy come from the [Brand Kit](../brand-kit) project.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `npm run build` — production build (static RSC output)
- `npm run lint` — ESLint
- `npm test` — unit tests (Jest + Testing Library)
- `npm run test:e2e` — end-to-end tests (Playwright, see below)
- All copy and outbound URLs live in [`src/content/site.ts`](src/content/site.ts) —
  no user-facing string is hard-coded in a component.
- Design tokens (colors, fonts, type scale) live in
  [`src/app/globals.css`](src/app/globals.css) as Tailwind v4 `@theme` tokens.

## Testing

Two layers, matching [interview-rubric-creator](https://github.com/bakarih/interview-rubric-creator)'s
conventions:

- **Unit** (`__tests__/unit/`, Jest + Testing Library) — the interactive
  components (`SubscribeForm`, `YouTubeEmbed`, `CalendlyButton`,
  `BandcampPlayer`), the `www`→apex redirect middleware, `robots.ts`/`sitemap.ts`,
  and a content-sanity suite (`site-content.test.ts`) that catches things a
  build won't — a malformed URL, a swapped Bandcamp track ID, a YouTube ID
  that doesn't match its own URL.
- **E2E** (`__tests__/e2e/`, Playwright) — real browser flows against a
  production build: homepage renders all six identity-strip facets and both
  booking CTAs, nav pills jump to the right section, the YouTube poster
  click-to-loads, `/privacy` and `/terms` render with canonical tags, and
  `robots.txt`/`sitemap.xml` serve correctly.

```bash
npm test               # unit tests
npm run test:coverage  # unit tests with coverage report
npm run test:e2e       # e2e tests (builds + starts the app on :3417 automatically)
```

The e2e suite runs on a dedicated port (3417) rather than Next's default
3000 — this avoids silently attaching to a *different* Next.js project's dev
server if one happens to already be running on 3000.

**Production health check**: the same e2e suite can run directly against the
live site — useful for diagnosing "why did something go down":

```bash
PLAYWRIGHT_BASE_URL=https://bakarisoul.com npx playwright test
```

One test (`seo.spec.ts` → "production www redirect") always hits
`https://www.bakarisoul.com` directly regardless of this flag, since the
`www`→apex redirect only exists at the Cloudflare edge and can't be verified
against a local build.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, Person JSON-LD
    page.tsx               # composes sections in order
    globals.css             # design tokens
    opengraph-image.tsx     # generated 1200×630 OG image
  components/
    sections/                # Hero, Bio, Write, Build, Sing, Work, Socials
    ui/                       # PillarChip, IdentityStrip, PillarSection
  content/
    site.ts                   # all copy + URLs
public/
  portrait.png
  glyphs/                       # six identity-strip glyph SVGs
  logo/                          # four logo-mark color variants (source: Dropbox)
```

## Integrations

- **Substack** — custom-styled subscribe form posts to
  `https://bakarisoul.substack.com/api/v1/free` (a real form POST targeting a
  new tab, not fetch — Substack doesn't support CORS for this endpoint).
- **YouTube** — click-to-load poster (no iframe/JS shipped until clicked) for
  the featured "Evolution of Earth, Wind & Fire" video.
- **Bandcamp** — embedded players for two tracks ("Evolution of Earth, Wind
  and Fire" and "Cruisin'"), plus an outbound link to the full Bandcamp page.
- **Calendly** — popup widget, loaded only on hover/focus/touch of a booking
  button (keeps it off the page-load critical path entirely). Falls back to a
  plain link that works with JS disabled. Two booking CTAs use it: consulting
  (Engineering Leadership pillar) and creative bookings (Non-Linear Path
  pillar). **TODO:** both currently point at the general `/30min` Calendly
  link — swap in a paid "Consulting" event type (with Stripe payment
  collection configured in the Calendly dashboard) once Bakari sets one up.
- **PeerPush** — outbound link next to the interviewrubric.com "Try it" CTA.

## Three clear CTAs

Each pillar pushes toward one unambiguous action:

- **Engineering Leadership** → subscribe to the newsletter, or book a call for
  speaking / technical interview coaching / engineering consulting.
- **Building with AI** → try interviewrubric.com.
- **The Non-Linear Path** → watch/listen to the music, or book a session for
  songwriting / arranging / vocals / choreography / resume & writing help.

The nav (`Eng. Leadership` / `Building w/ AI` / `Non-Linear Path`) is styled as
pillar-colored pill buttons that jump straight to each CTA.

## Lighthouse

Measured against a local production build (`next build && next start`):

| Category | Score |
|---|---|
| Performance | 93 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

Remaining minor flags are all third-party (Bandcamp's embedded-player cookie,
YouTube's thumbnail CDN cache headers) and aren't fixable from this codebase.

## Deploying to Cloudflare

This app deploys to Cloudflare Workers via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare), mirroring the
[interview-rubric-creator](https://github.com/bakarih/interview-rubric-creator)
setup.

```bash
npm run cf:build     # build + adapt the Next.js app for Cloudflare
npm run cf:preview   # preview the Cloudflare build locally via Wrangler
npm run cf:deploy    # build and deploy to Cloudflare Workers
```

Configuration lives in [`wrangler.jsonc`](wrangler.jsonc) and
[`open-next.config.ts`](open-next.config.ts). The site is fully static (no
server actions, no ISR), so no incremental cache binding is configured.

First-time setup requires `wrangler login` (or a `CLOUDFLARE_API_TOKEN` /
`CLOUDFLARE_ACCOUNT_ID` in the environment for CI).
