import { Ticker } from "@/models/ticker";

export class PriceSimulator {
  private ticker: Ticker;
  private isRunning: boolean = false;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor(ticker: Ticker) {
    this.ticker = ticker;
  }

  public start(interval: number = 1000): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.updateInterval = setInterval(() => {
      const newPrice = this.generateNewPrice();
      this.ticker.updatePrice(newPrice);
    }, interval);
  }

  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.isRunning = false;
      this.updateInterval = null;
    }
  }

  private generateNewPrice(): number {
    const { currentPrice, volatility } = this.ticker;

    // Generate random walk with mean reversion
    const random = Math.random();
    const changePercent = (random - 0.5) * 2 * volatility;
    const meanReversion =
      ((this.ticker.basePrice - currentPrice) / this.ticker.basePrice) * 0.01;

    const finalChangePercent = changePercent + meanReversion;
    const newPrice = currentPrice * (1 + finalChangePercent);

    // Ensure price doesn't go negative
    return Math.max(newPrice, 0.01);
  }
}
