import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TickerGrid from "../TickerGrid";
import { MOCK_TICKERS } from "@/constants";

// Mock the fetch API
global.fetch = jest.fn();

describe("TickerGrid", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  it("renders ticker cards when data is fetched successfully", async () => {
    const mockTickers = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.5,
        previousClose: 174.0,
        change: 1.5,
        changePercent: 0.86,
        volume: 25000000,
        high24h: 176.0,
        low24h: 173.0,
        lastUpdate: new Date().toISOString(),
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 140.75,
        previousClose: 141.0,
        change: -0.25,
        changePercent: -0.18,
        volume: 15000000,
        high24h: 142.0,
        low24h: 139.0,
        lastUpdate: new Date().toISOString(),
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { tickers: mockTickers } }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TickerGrid />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Live Market Tickers")).toBeInTheDocument();
      expect(screen.getByText("AAPL")).toBeInTheDocument();
      expect(screen.getByText("GOOGL")).toBeInTheDocument();
      expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
      expect(screen.getByText("Alphabet Inc.")).toBeInTheDocument();
    });
  });

  it("displays section title and description", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { tickers: [] } }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TickerGrid />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Live Market Tickers")).toBeInTheDocument();
      expect(
        screen.getByText("Real-time price updates for major stocks")
      ).toBeInTheDocument();
    });
  });

  it("renders multiple ticker cards in a grid", async () => {
    const mockTickers = MOCK_TICKERS.slice(0, 3);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { tickers: mockTickers } }),
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <TickerGrid />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(3);
    });
  });
});
