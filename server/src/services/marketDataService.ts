import { Ticker } from "@/models/ticker";
import { PriceSimulator } from "@/services/priceSimulator";
import { TickerData, TickerJSON } from "@/types";

class MarketDataService {
  private tickers: Map<string, Ticker>;
  private simulators: Map<string, PriceSimulator>;

  constructor() {
    this.tickers = new Map();
    this.simulators = new Map();

    this.initializeTickers();
    this.startSimulation();
  }

  private initializeTickers(): void {
    const tickerData: TickerData[] = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        basePrice: 175.5,
        volatility: 0.02,
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        basePrice: 245.3,
        volatility: 0.04,
      },
      {
        symbol: "BTC-USD",
        name: "Bitcoin USD",
        basePrice: 45000,
        volatility: 0.05,
      },
      {
        symbol: "ETH-USD",
        name: "Ethereum USD",
        basePrice: 2500,
        volatility: 0.06,
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        basePrice: 140.75,
        volatility: 0.025,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        basePrice: 380.2,
        volatility: 0.018,
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        basePrice: 145.8,
        volatility: 0.03,
      },
      {
        symbol: "META",
        name: "Meta Platforms",
        basePrice: 325.4,
        volatility: 0.035,
      },
    ];

    tickerData.forEach((data) => {
      const ticker = new Ticker(
        data.symbol,
        data.name,
        data.basePrice,
        data.volatility
      );
      this.tickers.set(data.symbol, ticker);

      const simulator = new PriceSimulator(ticker);
      this.simulators.set(data.symbol, simulator);
    });
  }

  public getAllTickers(): TickerJSON[] {
    return Array.from(this.tickers.values()).map((ticker) => ticker.toJSON());
  }

  private startSimulation(): void {
    this.simulators.forEach((simulator) => {
      simulator.start(
        Math.random() * 2000 + 1000 // Random interval between 1-3 seconds
      );
    });
  }

  public getTicker(symbol: string): Ticker | undefined {
    return this.tickers.get(symbol);
  }
}

// Singleton instance
const marketDataService = new MarketDataService();
export default marketDataService;
