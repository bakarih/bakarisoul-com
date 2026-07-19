/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingCTADropdown } from "@/components/ui/BookingCTADropdown";

const props = {
  kicker: "Resume & LinkedIn",
  title: "Resume & LinkedIn Makeover",
  description: "Billed in $85 blocks.",
  services: ["resume revamp", "linkedin makeover"],
  options: [
    { label: "1 block — Resume revamp — $85", calendlyUrl: "https://calendly.com/a" },
    { label: "2 blocks — Resume + LinkedIn — $170", calendlyUrl: "https://calendly.com/b" },
    {
      label: "3 blocks — Resume + LinkedIn + working session — $255",
      calendlyUrl: "https://calendly.com/c",
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
});
