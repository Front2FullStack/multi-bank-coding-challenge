import React from "react";
import { render, screen } from "@testing-library/react";
import TickerCard from "@/components/TickerCard";

const sampleTicker = {
  symbol: "TEST",
  name: "Test Corp",
  price: 123.45,
  previousClose: 120.0,
  change: 3.45,
  changePercent: 2.88,
  volume: 100000,
  high24h: 130,
  low24h: 110,
  lastUpdate: new Date().toISOString(),
};

describe("TickerCard", () => {
  it("renders symbol, name and formatted price/change", () => {
    render(<TickerCard {...sampleTicker} />);

    expect(screen.getByText("TEST")).toBeInTheDocument();
    expect(screen.getByText("Test Corp")).toBeInTheDocument();
    expect(screen.getByText("$123.45")).toBeInTheDocument();
    // change shows a leading + for positive
    expect(screen.getByText("+3.45")).toBeInTheDocument();
    expect(screen.getByText(/2\.88%/)).toBeInTheDocument();
  });
});
