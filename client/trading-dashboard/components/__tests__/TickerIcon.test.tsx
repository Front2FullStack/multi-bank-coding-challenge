import React from "react";
import { render, screen } from "@testing-library/react";
import { TickerIcon } from "../TickerIcon";

describe("TickerIcon", () => {
  it("renders first letter and has correct aria-hidden", () => {
    render(<TickerIcon symbol="ABC" />);
    const el = screen.getByText("A");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a deterministic color based on symbol", () => {
    render(<TickerIcon symbol="Z" />);
    const el = screen.getByText("Z");
    // Color class should be present (one of the palette classes)
    expect(el.className).toMatch(
      /bg-(blue|green|purple|orange|pink|indigo|teal|red)-500/
    );
  });
});
