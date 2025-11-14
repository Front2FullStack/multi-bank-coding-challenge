import { Ticker } from "../Ticker";

describe("Ticker Entity", () => {
  it("should create ticker with uppercase symbol", () => {
    const ticker = new Ticker("aapl", "Apple Inc.", 175.5, 1000000);

    expect(ticker.symbol).toBe("AAPL");
    expect(ticker.name).toBe("Apple Inc.");
    expect(ticker.price).toBe(175.5);
    expect(ticker.previousClose).toBe(175.5);
    expect(ticker.volume).toBe(1000000);
  });

  it("should update price correctly", () => {
    const ticker = new Ticker("AAPL", "Apple Inc.", 100);

    ticker.updatePrice(110);

    expect(ticker.price).toBe(110);
    expect(ticker.previousClose).toBe(100);
    expect(ticker.change).toBe(10);
    expect(ticker.changePercent).toBe(10);
    expect(ticker.high24h).toBe(110);
  });

  it("should convert to JSON correctly", () => {
    const ticker = new Ticker("AAPL", "Apple Inc.", 175.5);
    const json = ticker.toJSON();

    expect(json.symbol).toBe("AAPL");
    expect(json.price).toBe(175.5);
    expect(json).toHaveProperty("lastUpdate");
  });
});
