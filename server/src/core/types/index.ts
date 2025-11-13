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
}

export interface IMarketDataService {
  getAllTickers(): Promise<Ticker[]>;
  getTicker(symbol: string): Promise<Ticker | null>;
  startSimulation(): Promise<void>;
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
