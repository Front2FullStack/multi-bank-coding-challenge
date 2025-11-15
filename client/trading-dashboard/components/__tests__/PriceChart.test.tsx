import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PriceChart } from "../PriceChart";

const makeData = (points = 5) => {
  const now = Date.now();
  return Array.from({ length: points }).map((_, i) => ({
    timestamp: new Date(now - (points - i) * 3600 * 1000),
    price: 100 + i * 2,
    volume: 1000 + i * 10,
    open: 100 + i * 1.5,
    high: 100 + i * 2.5,
    low: 100 + i * 0.5,
    close: 100 + i * 2,
  }));
};

describe("PriceChart", () => {
  it("shows loader when isLoading is true", () => {
    const { container } = render(
      <PriceChart
        data={[]}
        isLoading={true}
        chartDays={7}
        onChartDaysChange={() => {}}
        isDarkMode={false}
      />
    );

    // the Loader2 icon has class animate-spin
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("calls onChartDaysChange when timeframe button is clicked", async () => {
    const data = makeData(6);
    const onChange = jest.fn();

    render(
      <PriceChart
        data={data}
        isLoading={false}
        chartDays={7}
        onChartDaysChange={onChange}
        isDarkMode={false}
      />
    );

    // Click the 1M button (30 days)
    await userEvent.click(screen.getByRole("button", { name: "1M" }));
    expect(onChange).toHaveBeenCalledWith(30);
  });
});
