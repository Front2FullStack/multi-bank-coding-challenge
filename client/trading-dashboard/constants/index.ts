// All constants
import { Ticker } from "@/types";

// Ensure sane defaults even when env vars are missing at build time
const PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_MARKET_TRADING_URL &&
  process.env.NEXT_PUBLIC_MARKET_TRADING_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_MARKET_TRADING_URL
    : "http://localhost:3005";
export const API_BASE_URL = `${PUBLIC_API_BASE}/api`;

export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL && process.env.NEXT_PUBLIC_WS_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_WS_URL
    : "ws://localhost:8080";

export const MOCK_TICKERS: Ticker[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 190.64,
    previousClose: 190.48,
    change: 0.16,
    changePercent: 0.08,
    volume: 31991537,
    high24h: 209.21,
    low24h: 166.07,
    lastUpdate: "2025-11-14T10:29:57.677Z",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 226.06,
    previousClose: 224.89,
    change: 1.17,
    changePercent: 0.52,
    volume: 16384441,
    high24h: 248.98,
    low24h: 206.6,
    lastUpdate: "2025-11-14T10:29:57.562Z",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 162.3,
    previousClose: 161.23,
    change: 1.06,
    changePercent: 0.66,
    volume: 1822233,
    high24h: 169.73,
    low24h: 125.56,
    lastUpdate: "2025-11-14T10:29:57.614Z",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 365.51,
    previousClose: 362.88,
    change: 2.63,
    changePercent: 0.72,
    volume: 12528892,
    high24h: 414.82,
    low24h: 353.83,
    lastUpdate: "2025-11-14T10:29:56.314Z",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 138.52,
    previousClose: 137.44,
    change: 1.07,
    changePercent: 0.78,
    volume: 15395703,
    high24h: 162.38,
    low24h: 131.33,
    lastUpdate: "2025-11-14T10:29:57.610Z",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 277.78,
    previousClose: 280.1,
    change: -2.32,
    changePercent: -0.83,
    volume: 16232159,
    high24h: 326.67,
    low24h: 264.45,
    lastUpdate: "2025-11-14T10:29:57.619Z",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 546.55,
    previousClose: 545.15,
    change: 1.4,
    changePercent: 0.26,
    volume: 8387745,
    high24h: 553.04,
    low24h: 420.24,
    lastUpdate: "2025-11-14T10:29:56.581Z",
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin USD",
    price: 28250.31,
    previousClose: 27694.25,
    change: 556.05,
    changePercent: 2.01,
    volume: 5103533,
    high24h: 61337.04,
    low24h: 20991.34,
    lastUpdate: "2025-11-14T10:29:57.242Z",
  },
  {
    symbol: "ETH-USD",
    name: "Ethereum USD",
    price: 1952.93,
    previousClose: 1923.76,
    change: 29.16,
    changePercent: 1.52,
    volume: 8024285,
    high24h: 3421.68,
    low24h: 1677.47,
    lastUpdate: "2025-11-14T10:29:56.805Z",
  },
];

export const TIME_FRAMES = [
  { label: "7D", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
];
