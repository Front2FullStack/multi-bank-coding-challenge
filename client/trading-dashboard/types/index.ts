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
