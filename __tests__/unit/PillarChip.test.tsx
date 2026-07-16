/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { PillarChip } from "@/components/ui/PillarChip";

describe("PillarChip", () => {
  it.each([
    ["eng", "text-pillar-eng"],
    ["ai", "text-pillar-ai"],
    ["path", "text-pillar-path"],
  ] as const)("maps pillar %s to its brand color class", (pillar, expectedClass) => {
    render(<PillarChip pillar={pillar}>label</PillarChip>);
    expect(screen.getByText("label")).toHaveClass(expectedClass);
  });

  it("renders a background pill in the 'pill' variant (identity strip tags)", () => {
    render(
      <PillarChip pillar="path" variant="pill">
        musician
      </PillarChip>
    );
    expect(screen.getByText("musician")).toHaveClass("bg-surface/80");
  });

  it("renders as plain text in the default 'label' variant (pillar kickers)", () => {
    render(<PillarChip pillar="eng">Pillar 01</PillarChip>);
    expect(screen.getByText("Pillar 01")).not.toHaveClass("bg-surface/80");
  });
});
