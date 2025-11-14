// Domain Types
export interface Ticker {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
  lastUpdate: Date;
}

export interface HistoricalData {
  timestamp: Date;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Service Interfaces
export interface ITickerRepository {
  findAll(): Promise<Ticker[]>;
  findBySymbol(symbol: string): Promise<Ticker | null>;
  save(ticker: Ticker): Promise<void>;
  update(ticker: Ticker): Promise<void>;
}

export interface IPriceSimulator {
  start(ticker: Ticker, callback: (ticker: Ticker) => void): void;
  stop(symbol: string): void;
  stopAll(): void;
  generateHistoricalData(ticker: Ticker, days: number): HistoricalData[];
}

export interface IMarketDataService {
  getAllTickers(): Promise<Ticker[]>;
  getTicker(symbol: string): Promise<Ticker | null>;
  getHistoricalData(symbol: string, days: number): Promise<HistoricalData[]>;
  startSimulation(): Promise<void>;
  stopSimulation(): void;
}

// Configuration
export interface AppConfig {
  port: number;
  env: string;
}

// Ticker related types
export interface TickerData {
  symbol: string;
  name: string;
  basePrice: number;
  volatility: number;
}

export interface PriceHistoryPoint {
  price: number;
  timestamp: Date;
  volume: number;
}

export interface TickerJSON {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
  lastUpdate: Date;
}

export type Interval = "hourly" | "daily" | "15min";
