/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeForm } from "@/components/sections/SubscribeForm";
import { site } from "@/content/site";

describe("SubscribeForm", () => {
  it("posts to the Substack subscribe endpoint in a new tab (no fetch/CORS)", () => {
    render(<SubscribeForm />);
    const form = screen.getByRole("textbox", { name: "Email address" }).closest("form")!;
    expect(form).toHaveAttribute("action", site.substack.subscribeApiUrl);
    expect(form).toHaveAttribute("method", "post");
    expect(form).toHaveAttribute("target", "_blank");
  });

  it("requires a real email address", () => {
    render(<SubscribeForm />);
    const input = screen.getByRole("textbox", { name: "Email address" });
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });

  it("shows the success message after submit, and nothing before", () => {
    render(<SubscribeForm />);
    expect(screen.queryByText(site.substack.successMessage)).not.toBeInTheDocument();

    const form = screen.getByRole("textbox", { name: "Email address" }).closest("form")!;
    fireEvent.submit(form);

    expect(screen.getByText(site.substack.successMessage)).toBeInTheDocument();
  });

  it("announces the success message via an aria-live region", () => {
    render(<SubscribeForm />);
    const form = screen.getByRole("textbox", { name: "Email address" }).closest("form")!;
    fireEvent.submit(form);

    expect(screen.getByText(site.substack.successMessage)).toHaveAttribute(
      "aria-live",
      "polite"
    );
  });
});
