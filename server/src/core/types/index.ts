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

export interface MarketQuote {
  symbol: string;
  bid: number;
  ask: number;
  spread: number;
  timestamp: Date;
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
}

export interface IMarketDataService {
  getAllTickers(): Promise<Ticker[]>;
  getTicker(symbol: string): Promise<Ticker | null>;
  startSimulation(): Promise<void>;
  stopSimulation(): void;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
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

// API Response types
export interface TickersResponse extends ApiResponse {
  count: number;
  data: TickerJSON[];
}
