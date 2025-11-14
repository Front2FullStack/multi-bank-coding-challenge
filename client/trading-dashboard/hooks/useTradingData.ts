import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ticker, HistoricalData } from "@/types";
import { API_BASE_URL, MOCK_TICKERS } from "@/constants";
import { generateMockHistory } from "@/lib/utils";

export const useTradingData = () => {
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [chartDays, setChartDays] = useState<number>(7);
  const [error, setError] = useState<string | null>(null);
  const priceStatus = useRef<{ [key: string]: "up" | "down" | "neutral" }>({});
  const previousTickers = useRef<Ticker[]>([]);

  // Fetch tickers with automatic polling every 2 seconds for tickers
  const { data: tickers = [], isLoading: tickersLoading } = useQuery({
    queryKey: ["tickers"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tickers`);
        if (!response.ok) throw new Error("Network response was not ok");
        const {
          data: { tickers },
        } = await response.json();
        setError(null);
        return tickers as Ticker[];
      } catch (err) {
        console.error("Failed to fetch tickers:", err);
        setError("Failed to load market data. Displaying mock data.");
        return MOCK_TICKERS;
      }
    },
    refetchInterval: 2000,
    staleTime: 0,
  });

  // Track price changes for animations
  useEffect(() => {
    if (previousTickers.current.length > 0 && tickers.length > 0) {
      tickers.forEach((newTicker) => {
        const oldTicker = previousTickers.current.find(
          (t) => t.symbol === newTicker.symbol
        );
        if (oldTicker) {
          if (newTicker.price > oldTicker.price) {
            priceStatus.current[newTicker.symbol] = "up";
          } else if (newTicker.price < oldTicker.price) {
            priceStatus.current[newTicker.symbol] = "down";
          }
        }
      });
    }
    previousTickers.current = tickers;
  }, [tickers]);

  // Set initial selected ticker
  useEffect(() => {
    if (!selectedTicker && tickers.length > 0) {
      setSelectedTicker(tickers[0]);
    }
  }, [tickers, selectedTicker]);

  // Fetch chart data when ticker or days change
  const { data: chartData = [], isLoading: chartLoading } = useQuery({
    queryKey: ["chartData", selectedTicker?.symbol, chartDays],
    queryFn: async () => {
      if (!selectedTicker) return [];

      try {
        const response = await fetch(
          `${API_BASE_URL}/tickers/${selectedTicker.symbol}/history?days=${chartDays}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const { data } = await response.json();
        return data as HistoricalData[];
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        return generateMockHistory(selectedTicker, chartDays);
      }
    },
    enabled: !!selectedTicker,
  });

  return {
    tickers,
    selectedTicker,
    setSelectedTicker,
    chartData,
    chartDays,
    setChartDays,
    loading: { tickers: tickersLoading, chart: chartLoading },
    error,
    priceStatus: priceStatus.current,
  };
};
