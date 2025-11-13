import { TickerJSON, PriceHistoryPoint } from "@/types";

export class Ticker {
  public symbol: string;
  public name: string;
  public basePrice: number;
  public currentPrice: number;
  public volatility: number;
  public lastUpdate: Date;
  public priceHistory: PriceHistoryPoint[];
  public change: number;
  public changePercent: number;
  public volume: number;
  public high24h: number;
  public low24h: number;

  constructor(
    symbol: string,
    name: string,
    basePrice: number,
    volatility: number = 0.02
  ) {
    this.symbol = symbol;
    this.name = name;
    this.basePrice = basePrice;
    this.currentPrice = basePrice;
    this.volatility = volatility;
    this.lastUpdate = new Date();
    this.priceHistory = [];
    this.change = 0;
    this.changePercent = 0;
    this.volume = Math.floor(Math.random() * 1000000) + 100000;
    this.high24h = basePrice;
    this.low24h = basePrice;
  }

  public updatePrice(newPrice: number): void {
    const previousPrice = this.currentPrice;
    this.currentPrice = newPrice;
    this.change = newPrice - previousPrice;
    this.changePercent = (this.change / previousPrice) * 100;
    this.lastUpdate = new Date();

    // Update 24h high/low
    this.high24h = Math.max(this.high24h, newPrice);
    this.low24h = Math.min(this.low24h, newPrice);

    // Add to history (keep last 100 points)
    this.priceHistory.push({
      price: newPrice,
      timestamp: this.lastUpdate,
      volume: this.volume,
    });

    if (this.priceHistory.length > 100) {
      this.priceHistory.shift();
    }
  }

  public toJSON(): TickerJSON {
    return {
      symbol: this.symbol,
      name: this.name,
      price: this.currentPrice,
      change: this.change,
      changePercent: this.changePercent,
      volume: this.volume,
      high24h: this.high24h,
      low24h: this.low24h,
      lastUpdate: this.lastUpdate,
    };
  }
}
