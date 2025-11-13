import { ITickerRepository, Ticker as ITicker } from "@/core/types";
import { Ticker } from "@/core/entities/Ticker";

export class TickerRepository implements ITickerRepository {
  private tickers: Map<string, ITicker> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const initialTickers = [
      new Ticker("AAPL", "Apple Inc.", 175.5, 25000000),
      new Ticker("TSLA", "Tesla Inc.", 245.3, 30000000),
      new Ticker("GOOGL", "Alphabet Inc.", 140.75, 15000000),
      new Ticker("MSFT", "Microsoft Corp.", 380.2, 20000000),
      new Ticker("AMZN", "Amazon.com Inc.", 145.8, 18000000),
      new Ticker("META", "Meta Platforms", 325.4, 22000000),
      new Ticker("NVDA", "NVIDIA Corp.", 450.5, 35000000),
      new Ticker("BTC-USD", "Bitcoin USD", 45000, 5000000),
      new Ticker("ETH-USD", "Ethereum USD", 2500, 3000000),
    ];

    initialTickers.forEach((ticker) => {
      this.tickers.set(ticker.symbol, ticker);
    });
  }

  async findAll(): Promise<ITicker[]> {
    return Array.from(this.tickers.values());
  }

  async findBySymbol(symbol: string): Promise<ITicker | null> {
    return this.tickers.get(symbol.toUpperCase()) || null;
  }

  async save(ticker: ITicker): Promise<void> {
    this.tickers.set(ticker.symbol, ticker);
  }

  async update(ticker: ITicker): Promise<void> {
    return this.save(ticker);
  }
}
