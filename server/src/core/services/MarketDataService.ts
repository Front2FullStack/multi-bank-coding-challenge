import {
  IMarketDataService,
  ITickerRepository,
  IPriceSimulator,
  Ticker as ITicker,
  HistoricalData,
} from "@/core/types";

export class MarketDataService implements IMarketDataService {
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
        this.repository.update(updatedTicker);
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

  stopSimulation(): void {
    return this.priceSimulator.stopAll();
  }
}
