import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
  it('renders the main heading with "Real-Time Market Intelligence"', () => {
    render(<Hero />);

    expect(screen.getByText("Real-Time Market")).toBeInTheDocument();
    expect(screen.getByText("Intelligence")).toBeInTheDocument();
  });

  it("displays the Live Market Data badge", () => {
    render(<Hero />);

    expect(screen.getByText("Live Market Data")).toBeInTheDocument();
  });

  it("shows the tagline description", () => {
    render(<Hero />);

    expect(
      screen.getByText(/Stay ahead with live ticker updates/i)
    ).toBeInTheDocument();
  });

  it("displays feature cards with Live and 24/7 stats", () => {
    render(<Hero />);

    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("Price Updates")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
    expect(screen.getByText("Market Coverage")).toBeInTheDocument();
  });

  it("has proper section structure with gradient background", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-br");
  });
});
