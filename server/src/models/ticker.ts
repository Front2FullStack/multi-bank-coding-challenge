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
    this.changePercent =
      previousPrice !== 0 ? (this.change / previousPrice) * 100 : 0;
    this.lastUpdate = new Date();

    // In updatePrice method, after updating price history:
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recent24h = this.priceHistory.filter(
      (point) => point.timestamp >= twentyFourHoursAgo
    );

    if (recent24h.length > 0) {
      this.high24h = Math.max(...recent24h.map((p) => p.price));
      this.low24h = Math.min(...recent24h.map((p) => p.price));
    } else {
      this.high24h = this.currentPrice;
      this.low24h = this.currentPrice;
    }

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
