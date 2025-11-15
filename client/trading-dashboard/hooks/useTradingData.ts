import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Ticker, HistoricalData } from "@/types";
import { API_BASE_URL, MOCK_TICKERS } from "@/constants";
import { generateMockHistory } from "@/lib/utils";
import { useWebSocketContext } from "@/providers/WebSocketProvider";

export const useTradingData = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [chartDays, setChartDays] = useState<number>(7);
  const [error, setError] = useState<string | null>(null);
  const priceStatus = useRef<{ [key: string]: "up" | "down" | "neutral" }>({});
  const previousTickers = useRef<Ticker[]>([]);

  const { tickers: wsTickers, priceStatus: wsPriceStatus } =
    useWebSocketContext();

  // REST fallback only if WS not yet providing data
  const useFallback = !wsTickers || wsTickers.length === 0;
  const { data: restTickers = [], isLoading: restLoading } = useQuery({
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
    enabled: useFallback,
    refetchInterval: useFallback ? 2000 : false,
    staleTime: 0,
  });

  const tickers: Ticker[] = useFallback ? restTickers : wsTickers;

  // Track price changes for animations (fallback when WS not in use)
  useEffect(() => {
    if (!useFallback) {
      // When using WS, price status is provided by the provider
      priceStatus.current = wsPriceStatus;
      return;
    }

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
  }, [tickers, useFallback, wsPriceStatus]);

  // Set initial selected symbol
  useEffect(() => {
    if (!selectedSymbol && tickers.length > 0) {
      setSelectedSymbol(tickers[0].symbol);
    }
  }, [tickers, selectedSymbol]);

  // Derive the selected ticker from the latest tickers list so it always stays fresh
  const selectedTicker: Ticker | null = useMemo(() => {
    if (!selectedSymbol) return null;
    return tickers.find((t) => t.symbol === selectedSymbol) ?? null;
  }, [tickers, selectedSymbol]);

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
    setSelectedTicker: (ticker: Ticker) => setSelectedSymbol(ticker.symbol),
    chartData,
    chartDays,
    setChartDays,
    loading: {
      tickers: useFallback ? restLoading : false,
      chart: chartLoading,
    },
    error,
    priceStatus: priceStatus.current,
  };
};
