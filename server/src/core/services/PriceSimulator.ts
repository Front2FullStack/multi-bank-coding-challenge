import { IPriceSimulator } from "../types";
import { Ticker } from "../entities/Ticker";

export class PriceSimulator implements IPriceSimulator {
  private simulations: Map<string, NodeJS.Timeout> = new Map();

  start(ticker: Ticker, callback: (ticker: Ticker) => void): void {
    // Stop existing simulation if any
    this.stop(ticker.symbol);

    const simulate = () => {
      const volatility = this.getVolatility(ticker.symbol);
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = ticker.price * (1 + change / 100);

      ticker.updatePrice(Math.max(0.01, newPrice));
      ticker.volume = Math.floor(ticker.volume * (0.95 + Math.random() * 0.1));

      callback(ticker);
    };

    // Random interval between 1-3 seconds
    const interval = 1000 + Math.random() * 2000;
    const timerId = setInterval(simulate, interval);
    this.simulations.set(ticker.symbol, timerId);
  }

  stop(symbol: string): void {
    const timerId = this.simulations.get(symbol);
    if (timerId) {
      clearInterval(timerId);
      this.simulations.delete(symbol);
    }
  }

  stopAll(): void {
    this.simulations.forEach((timerId) => clearInterval(timerId));
    this.simulations.clear();
  }

  private getVolatility(symbol: string): number {
    // Different volatility for different asset types
    if (symbol.includes("BTC") || symbol.includes("ETH")) return 5;
    if (symbol === "TSLA") return 3;
    return 2; // Default for stocks
  }
}
