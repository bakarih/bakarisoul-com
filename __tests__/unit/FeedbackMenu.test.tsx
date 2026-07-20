/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { FeedbackMenu } from "@/components/ui/FeedbackMenu";

describe("FeedbackMenu", () => {
  it("is closed by default", () => {
    render(<FeedbackMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on click and shows exactly three items — no code-contribution option", () => {
    render(<FeedbackMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Feedback" }));

    const menu = screen.getByRole("menu");
    const items = screen.getAllByRole("menuitem");
    expect(items).toHaveLength(3);
    expect(menu).toHaveTextContent("Share Feedback");
    expect(menu).toHaveTextContent("Report a Bug");
    expect(menu).toHaveTextContent("Suggest a Feature");
    expect(menu).not.toHaveTextContent("Contribute Code");
  });

  it("each item deep-links to the matching GitHub issue template", () => {
    render(<FeedbackMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Feedback" }));

    expect(screen.getByRole("menuitem", { name: "Share Feedback" })).toHaveAttribute(
      "href",
      "https://github.com/bakarih/bakarisoul-com/issues/new?template=feedback.yml"
    );
    expect(screen.getByRole("menuitem", { name: "Report a Bug" })).toHaveAttribute(
      "href",
      "https://github.com/bakarih/bakarisoul-com/issues/new?template=bug_report.yml"
    );
    expect(screen.getByRole("menuitem", { name: "Suggest a Feature" })).toHaveAttribute(
      "href",
      "https://github.com/bakarih/bakarisoul-com/issues/new?template=feature_request.yml"
    );
  });

  it("closes on Escape", () => {
    render(<FeedbackMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Feedback" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on an outside click", () => {
    render(<FeedbackMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Feedback" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
