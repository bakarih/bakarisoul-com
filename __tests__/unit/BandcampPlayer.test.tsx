/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { BandcampPlayer } from "@/components/sections/BandcampPlayer";

describe("BandcampPlayer", () => {
  const props = {
    title: "Cruisin'",
    trackId: "2488527881",
    url: "https://bakarisoul.bandcamp.com/track/cruisin",
  };

  it("embeds the correct track by ID", () => {
    render(<BandcampPlayer {...props} />);
    const iframe = document.querySelector("iframe")!;
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining(`track=${props.trackId}`)
    );
  });

  it("lazy-loads the iframe", () => {
    render(<BandcampPlayer {...props} />);
    expect(document.querySelector("iframe")).toHaveAttribute("loading", "lazy");
  });

  it("has a real, visible-to-screen-readers fallback link to the track's Bandcamp page", () => {
    render(<BandcampPlayer {...props} />);
    const link = screen.getByRole("link", { name: `${props.title} on Bandcamp` });
    expect(link).toHaveAttribute("href", props.url);
  });
});
