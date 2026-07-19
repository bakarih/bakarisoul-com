/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingCTADropdown } from "@/components/ui/BookingCTADropdown";

const props = {
  kicker: "Resume & LinkedIn",
  title: "Resume & LinkedIn Review",
  description: "Async + live.",
  services: ["resume review", "linkedin review"],
  options: [
    {
      label: "Resume — 1 Hour — $170",
      calendlyUrl: "https://calendly.com/a",
      description: "Resume, one hour.",
    },
    {
      label: "Resume — 2 Hours — $255",
      calendlyUrl: "https://calendly.com/b",
      description: "Resume, two hours.",
    },
    {
      label: "LinkedIn — 1 Hour — $170",
      calendlyUrl: "https://calendly.com/c",
      description: "LinkedIn, one hour.",
    },
  ],
};

describe("BookingCTADropdown", () => {
  it("defaults to the first tier's Calendly URL", () => {
    render(<BookingCTADropdown {...props} />);
    expect(screen.getByRole("link", { name: "Book on Calendly →" })).toHaveAttribute(
      "href",
      "https://calendly.com/a"
    );
  });

  it("lists every tier as a select option", () => {
    render(<BookingCTADropdown {...props} />);
    for (const option of props.options) {
      expect(screen.getByRole("option", { name: option.label })).toBeInTheDocument();
    }
  });

  it("updates the booking link when a different tier is selected", () => {
    render(<BookingCTADropdown {...props} />);

    fireEvent.change(screen.getByLabelText("Choose a package"), {
      target: { value: "1" },
    });

    expect(screen.getByRole("link", { name: "Book on Calendly →" })).toHaveAttribute(
      "href",
      "https://calendly.com/b"
    );
  });

  it("shows the selected option's description and updates it on change", () => {
    render(<BookingCTADropdown {...props} />);

    expect(screen.getByText("Resume, one hour.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Choose a package"), {
      target: { value: "2" },
    });

    expect(screen.getByText("LinkedIn, one hour.")).toBeInTheDocument();
    expect(screen.queryByText("Resume, one hour.")).not.toBeInTheDocument();
  });

  it("renders the helper and payment notes when provided, and omits them when not", () => {
    const { rerender } = render(
      <BookingCTADropdown
        {...props}
        helperNote="Not sure which to pick?"
        paymentNote="Free reschedule with 24h notice."
      />
    );
    expect(screen.getByText("Not sure which to pick?")).toBeInTheDocument();
    expect(screen.getByText("Free reschedule with 24h notice.")).toBeInTheDocument();

    rerender(<BookingCTADropdown {...props} />);
    expect(screen.queryByText("Not sure which to pick?")).not.toBeInTheDocument();
    expect(screen.queryByText("Free reschedule with 24h notice.")).not.toBeInTheDocument();
  });
});
