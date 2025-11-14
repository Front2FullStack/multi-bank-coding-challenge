"use client";
import TickerCard from "./TickerCard";
import { Ticker } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/constants";
import { LoadingSpinner } from "./ui/LoadingSpinner";

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
  const { data, isLoading, error } = useQuery<Ticker[], Error>({
    queryKey: ["tickers"],
    queryFn: getPosts,
    refetchInterval: 1000,
  });

  if (isLoading)
    return (
      <div className="py-16 px-4">
        <LoadingSpinner />
      </div>
    );
  if (error) return notFound();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.length > 0 &&
            data?.map((ticker) => (
              <TickerCard key={ticker.symbol} {...ticker} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TickerGrid;
