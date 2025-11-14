"use client";
import { useState, useEffect } from "react";
import TickerCard from "./TickerCard";
import { ITicker } from "@/types/ticker";

const TickerGrid = () => {
  const [tickers, setTickers] = useState<ITicker[]>([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 178.45,
      change: 2.34,
      changePercent: 1.33,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.67,
      change: -1.23,
      changePercent: -0.85,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 412.89,
      change: 5.67,
      changePercent: 1.39,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.23,
      change: 3.45,
      changePercent: 1.97,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 242.56,
      change: -4.32,
      changePercent: -1.75,
    },
    {
      symbol: "META",
      name: "Meta Platforms",
      price: 485.34,
      change: 8.91,
      changePercent: 1.87,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          const randomChange = (Math.random() - 0.5) * 5;
          const newPrice = Math.max(ticker.price + randomChange, 1);
          const change = newPrice - ticker.price;
          const changePercent = (change / ticker.price) * 100;

          return {
            ...ticker,
            price: newPrice,
            change: ticker.change + change,
            changePercent: ticker.changePercent + changePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
          {tickers.map((ticker) => (
            <TickerCard key={ticker.symbol} {...ticker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TickerGrid;
