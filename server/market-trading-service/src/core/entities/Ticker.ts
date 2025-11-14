import { Ticker as ITicker } from "@/core/types";

export class Ticker implements ITicker {
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

  constructor(
    symbol: string,
    name: string,
    initialPrice: number,
    volume: number = 1000000
  ) {
    this.symbol = symbol.toUpperCase();
    this.name = name;
    this.price = initialPrice;
    this.previousClose = initialPrice;
    this.change = 0;
    this.changePercent = 0;
    this.volume = volume;
    this.high24h = initialPrice;
    this.low24h = initialPrice;
    this.lastUpdate = new Date();
  }

  updatePrice(newPrice: number): void {
    this.previousClose = this.price;
    this.price = newPrice;
    this.change = newPrice - this.previousClose;
    this.changePercent = (this.change / this.previousClose) * 100;
    this.lastUpdate = new Date();

    // Update 24h high/low
    if (newPrice > this.high24h) this.high24h = newPrice;
    if (newPrice < this.low24h) this.low24h = newPrice;
  }

  toJSON(): ITicker {
    return {
      symbol: this.symbol,
      name: this.name,
      price: Math.round(this.price * 100) / 100,
      previousClose: Math.round(this.previousClose * 100) / 100,
      change: Math.round(this.change * 100) / 100,
      changePercent: Math.round(this.changePercent * 100) / 100,
      volume: this.volume,
      high24h: Math.round(this.high24h * 100) / 100,
      low24h: Math.round(this.low24h * 100) / 100,
      lastUpdate: this.lastUpdate,
    };
  }
}
