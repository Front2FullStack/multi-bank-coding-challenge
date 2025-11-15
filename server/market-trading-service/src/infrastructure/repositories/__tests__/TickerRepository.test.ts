import { TickerRepository } from "../TickerRepository";

describe("TickerRepository", () => {
  let repository: TickerRepository;

  beforeEach(() => {
    repository = new TickerRepository();
  });

  it("should return all tickers", async () => {
    const tickers = await repository.findAll();

    expect(tickers).toBeDefined();
    expect(Array.isArray(tickers)).toBe(true);
    expect(tickers.length).toBeGreaterThan(0);
  });

  it("should find ticker by symbol", async () => {
    const ticker = await repository.findBySymbol("AAPL");

    expect(ticker).toBeDefined();
    expect(ticker?.symbol).toBe("AAPL");
  });

  it("should save new ticker", async () => {
    const newTicker = {
      symbol: "TEST",
      name: "Test Company",
      price: 50,
      previousClose: 50,
      change: 0,
      changePercent: 0,
      volume: 1000,
      high24h: 50,
      low24h: 50,
      lastUpdate: new Date(),
    };

    await repository.save(newTicker);
    const found = await repository.findBySymbol("TEST");

    expect(found).toBeDefined();
    expect(found?.symbol).toBe("TEST");
  });

  it("should update existing ticker", async () => {
    const ticker = await repository.findBySymbol("AAPL");

    if (ticker) {
      ticker.price = 200;
      await repository.update(ticker);

      const updated = await repository.findBySymbol("AAPL");
      expect(updated?.price).toBe(200);
    }
  });
});
