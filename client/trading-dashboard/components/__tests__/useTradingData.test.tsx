import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTradingData } from "@/hooks/useTradingData";
import { MOCK_TICKERS } from "@/constants";

function createQueryClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } });
}

const TestComponent = () => {
  const { tickers, selectedTicker, error } = useTradingData();
  return (
    <div>
      <div data-testid="tickers-count">{tickers.length}</div>
      <div data-testid="selected">{selectedTicker?.symbol ?? "none"}</div>
      <div data-testid="error">{error ?? ""}</div>
    </div>
  );
};

describe("useTradingData", () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = global.fetch;
    jest.spyOn(console, "error");
    // @ts-expect-error jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    // @ts-expect-error jest.spyOn adds this functionallity
    console.error.mockRestore();
  });

  it("falls back to MOCK_TICKERS when tickers fetch fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("network"));

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComponent />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("tickers-count").textContent).toBe(
        String(MOCK_TICKERS.length)
      );
      expect(screen.getByTestId("selected").textContent).toBe(
        MOCK_TICKERS[0].symbol
      );
      expect(screen.getByTestId("error").textContent).toContain(
        "Failed to load market data"
      );
    });
  });
});
