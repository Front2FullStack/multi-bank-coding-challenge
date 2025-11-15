"use client";
import TickerCard from "./TickerCard";
import { Ticker } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, MOCK_TICKERS } from "@/constants";
import { useWebSocketContext } from "@/providers/WebSocketProvider";

async function getPosts(): Promise<Ticker[]> {
  const res = await fetch(`${API_BASE_URL}/tickers`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const {
    data: { tickers },
  } = await res.json();

  return tickers;
}
const TickerGrid = () => {
  const { tickers: wsTickers } = useWebSocketContext();
  const useFallback = !wsTickers || wsTickers.length === 0;
  const { data, error } = useQuery<Ticker[], Error>({
    queryKey: ["tickers"],
    queryFn: getPosts,
    refetchInterval: useFallback ? 1000 : false,
    placeholderData: MOCK_TICKERS,
    enabled: useFallback,
  });

  const tickersToShow: Ticker[] = useFallback
    ? data ?? MOCK_TICKERS
    : wsTickers;

  if (error && useFallback) {
    console.error("Error fetching tickers:", error);
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Live Market Tickers
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time price updates for major stocks
          </p>
        </div>

        <div
          data-testid="ticker-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tickersToShow &&
            tickersToShow.length > 0 &&
            tickersToShow.map((ticker) => (
              <TickerCard key={ticker.symbol} {...ticker} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TickerGrid;
