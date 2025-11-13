export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export class ServiceError extends Error {
  statusCode: number;
  code?: string;
  details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// logging error on server to trace
export function logError(error: Error, context?: Record<string, any>): void {
  console.error("Error occurred", {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
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
