import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TickerItem } from "../TickerItem";

const ticker = {
  symbol: "ABC",
  name: "Alpha Beta Corp",
  price: 10.5,
  previousClose: 10,
  change: 0.5,
  changePercent: 5,
  volume: 1000,
  high24h: 12,
  low24h: 9,
  lastUpdate: new Date().toISOString(),
};

describe("TickerItem", () => {
  it("renders ticker info and calls onSelect when clicked", async () => {
    const onSelect = jest.fn();
    render(
      <TickerItem
        ticker={ticker}
        isSelected={false}
        onSelect={onSelect}
        status="up"
        isDarkMode={false}
      />
    );

    expect(screen.getByText("Alpha Beta Corp")).toBeInTheDocument();
    expect(screen.getByText("ABC")).toBeInTheDocument();
    expect(screen.getByText("$10.50")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(ticker);
  });

  it("shows ArrowDown icon when change is negative", () => {
    const neg = { ...ticker, change: -1.23 };
    const onSelect = jest.fn();
    render(
      <TickerItem
        ticker={neg}
        isSelected={false}
        onSelect={onSelect}
        status="down"
        isDarkMode={false}
      />
    );

    expect(screen.getByText("-1.23%")).toBeInTheDocument();
  });
});
