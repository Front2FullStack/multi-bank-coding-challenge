import { HistoricalData, Ticker } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// All shared utility functions
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toFixed(2)}`;
};

export const getVolatility = (symbol: string): number => {
  // Different volatility for different asset types
  if (symbol.includes("BTC") || symbol.includes("ETH")) return 5;
  if (symbol === "TSLA") return 3;
  return 2; // Default for stocks
};

export const generateMockHistory = (
  ticker: Ticker,
  days: number
): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = Date.now();
  const interval = 60 * 60 * 1000; // 1 hour
  const points = days * 24;
  // Start from a historical price and evolve forward
  let currentPrice = ticker.price * (1 - (Math.random() * 0.1 - 0.05));
  const volatility = getVolatility(ticker.symbol);
  for (let i = 0; i <= points; i++) {
    const timestamp = new Date(now - (points - i) * interval);
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(0.01, currentPrice * (1 + change / 100));
    const high = currentPrice * (1 + Math.random() * 0.02);
    const low = currentPrice * (1 - Math.random() * 0.02);
    const open = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    data.push({
      timestamp,
      price: currentPrice,
      volume: Math.floor(ticker.volume * (0.5 + Math.random())),
      open,
      high,
      low,
      close: currentPrice,
    });
  }

  // Ensure the last point matches the current ticker price
  if (data.length > 0) {
    const lastPoint = data[data.length - 1];
    lastPoint.price = ticker.price;
    lastPoint.close = ticker.price;
    lastPoint.high = Math.max(lastPoint.high, ticker.price);
    lastPoint.low = Math.min(lastPoint.low, ticker.price);
  }

  return data;
};
