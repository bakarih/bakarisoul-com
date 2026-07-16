/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { YouTubeEmbed } from "@/components/sections/YouTubeEmbed";
import { site } from "@/content/site";

describe("YouTubeEmbed", () => {
  it("shows a poster button, not an iframe, before the user clicks", () => {
    render(<YouTubeEmbed />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("has an accessible name that contains the visible caption text (WCAG 2.5.3)", () => {
    render(<YouTubeEmbed />);
    const button = screen.getByRole("button");
    expect(button).toHaveAccessibleName(
      expect.stringContaining(site.music.youtubeCaption)
    );
    expect(screen.getByText(site.music.youtubeCaption)).toBeInTheDocument();
  });

  it("swaps in the YouTube iframe (autoplay) on click, and removes the button", () => {
    render(<YouTubeEmbed />);
    fireEvent.click(screen.getByRole("button"));

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${site.music.youtubeId}?autoplay=1`
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("ships no iframe markup at all until clicked (keeps YouTube's JS off first paint)", () => {
    const { container } = render(<YouTubeEmbed />);
    expect(container.innerHTML).not.toContain("youtube.com/embed");
  });
});
