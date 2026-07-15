/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { RichParagraph } from "@/components/ui/RichParagraph";

describe("RichParagraph", () => {
  it("renders plain text segments", () => {
    render(<RichParagraph paragraph={[{ text: "Hello world" }]} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders a linked segment as an anchor with the given href", () => {
    render(
      <RichParagraph
        paragraph={[{ text: "interviewrubric.com", href: "https://interviewrubric.com" }]}
      />
    );
    const link = screen.getByRole("link", { name: "interviewrubric.com" });
    expect(link).toHaveAttribute("href", "https://interviewrubric.com");
  });

  it("opens external links in a new tab, but not mailto links", () => {
    render(
      <RichParagraph
        paragraph={[
          { text: "external", href: "https://example.com" },
          { text: "email", href: "mailto:me@example.com" },
        ]}
      />
    );
    expect(screen.getByRole("link", { name: "external" })).toHaveAttribute(
      "target",
      "_blank"
    );
    expect(screen.getByRole("link", { name: "email" })).not.toHaveAttribute("target");
  });

  it("renders an italic segment as <em>", () => {
    render(<RichParagraph paragraph={[{ text: "America's Got Talent", italic: true }]} />);
    const em = screen.getByText("America's Got Talent");
    expect(em.tagName).toBe("EM");
  });
});
