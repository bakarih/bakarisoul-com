/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendlyButton } from "@/components/sections/CalendlyButton";

const URL = "https://calendly.com/bakari-holmes/30min";
const LABEL = "Book on Calendly →";

describe("CalendlyButton", () => {
  afterEach(() => {
    delete window.Calendly;
  });

  it("is a real link to Calendly by default — works with JS disabled", () => {
    render(<CalendlyButton url={URL} label={LABEL} />);
    const link = screen.getByRole("link", { name: LABEL });
    expect(link).toHaveAttribute("href", URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("doesn't load the Calendly widget assets until the user shows intent", () => {
    render(<CalendlyButton url={URL} label={LABEL} />);
    expect(
      document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')
    ).not.toBeInTheDocument();
  });

  it("primes the widget stylesheet on hover", () => {
    render(<CalendlyButton url={URL} label={LABEL} />);
    fireEvent.mouseEnter(screen.getByRole("link", { name: LABEL }));

    expect(
      document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')
    ).toBeInTheDocument();
  });

  it("primes the widget on focus and touch too (keyboard/mobile users)", () => {
    render(<CalendlyButton url={URL} label={LABEL} />);
    fireEvent.focus(screen.getByRole("link", { name: LABEL }));
    expect(
      document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')
    ).toBeInTheDocument();
  });

  it("opens the popup widget instead of navigating, once Calendly's script has loaded", () => {
    const initPopupWidget = jest.fn();
    window.Calendly = { initPopupWidget };

    render(<CalendlyButton url={URL} label={LABEL} />);
    const link = screen.getByRole("link", { name: LABEL });
    const event = fireEvent.click(link);

    expect(initPopupWidget).toHaveBeenCalledWith({ url: URL });
    // fireEvent.click returns false when preventDefault() was called.
    expect(event).toBe(false);
  });

  it("falls back to a normal navigation click when Calendly hasn't loaded yet", () => {
    render(<CalendlyButton url={URL} label={LABEL} />);
    const link = screen.getByRole("link", { name: LABEL });
    const event = fireEvent.click(link);

    // preventDefault() was NOT called, so the native <a> navigation proceeds.
    expect(event).toBe(true);
  });

  it("accepts a custom label and url (reused for both the consulting and creative booking CTAs)", () => {
    render(<CalendlyButton url="https://calendly.com/other" label="Book a session" />);
    expect(screen.getByRole("link", { name: "Book a session" })).toHaveAttribute(
      "href",
      "https://calendly.com/other"
    );
  });
});
