import {
  IMarketDataService,
  ITickerRepository,
  IPriceSimulator,
  Ticker as ITicker,
  HistoricalData,
} from "@/core/types";

export class MarketDataService implements IMarketDataService {
  private subscribers: Map<string, Map<string, (ticker: ITicker) => void>> =
    new Map();
  constructor(
    private repository: ITickerRepository,
    private priceSimulator: IPriceSimulator
  ) {}

  async getAllTickers(): Promise<ITicker[]> {
    return this.repository.findAll();
  }

  async getTicker(symbol: string): Promise<ITicker | null> {
    return this.repository.findBySymbol(symbol.toUpperCase());
  }

  async startSimulation(): Promise<void> {
    const tickers = await this.repository.findAll();

    tickers.forEach((ticker) => {
      this.priceSimulator.start(ticker, (updatedTicker) => {
        // Persist updated ticker state
        this.repository.update(updatedTicker);
        // Notify any active subscribers (e.g., WebSocket clients) so they receive real-time updates
        this.notifySubscribers(updatedTicker);
      });
    });
  }

  async getHistoricalData(
    symbol: string,
    days: number
  ): Promise<HistoricalData[]> {
    const ticker = await this.getTicker(symbol);
    if (!ticker) throw new Error(`Ticker ${symbol} not found`);

    return this.priceSimulator.generateHistoricalData(ticker, days);
  }

  subscribeToTicker(
    symbol: string,
    callback: (ticker: ITicker) => void
  ): string {
    symbol = symbol.toUpperCase();

    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Map());
    }

    const callbackId = Math.random().toString(36).substring(7);
    this.subscribers.get(symbol)!.set(callbackId, callback);

    return callbackId;
  }

  unsubscribeFromTicker(symbol: string, callbackId: string): void {
    const callbacks = this.subscribers.get(symbol.toUpperCase());
    if (callbacks) {
      callbacks.delete(callbackId);
      if (callbacks.size === 0) {
        this.subscribers.delete(symbol);
      }
    }
  }

  notifySubscribers(ticker: ITicker): void {
    const callbacks = this.subscribers.get(ticker.symbol);
    if (callbacks) {
      callbacks.forEach((callback) => callback(ticker));
    }
  }

  stopSimulation(): void {
    return this.priceSimulator.stopAll();
  }
}
