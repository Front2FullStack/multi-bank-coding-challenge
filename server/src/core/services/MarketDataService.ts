import {
  IMarketDataService,
  ITickerRepository,
  IPriceSimulator,
  Ticker as ITicker,
} from "../types";

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

  stopSimulation(): void {
    return this.priceSimulator.stopAll();
  }
}
