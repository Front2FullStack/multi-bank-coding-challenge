import { PriceSimulator } from "../PriceSimulator";
import { Ticker } from "../../entities/Ticker";

describe("PriceSimulator", () => {
  let simulator: PriceSimulator;

  beforeEach(() => {
    simulator = new PriceSimulator();
    jest.useFakeTimers();
  });

  afterEach(() => {
    simulator.stopAll();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should start and stop simulation", () => {
    const ticker = new Ticker("AAPL", "Apple Inc.", 100);
    const callback = jest.fn();

    simulator.start(ticker, callback);
    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalled();

    simulator.stop("AAPL");
    callback.mockClear();

    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should generate historical data", () => {
    const ticker = new Ticker("AAPL", "Apple Inc.", 100);
    const days = 7;

    const history = simulator.generateHistoricalData(ticker, days);

    expect(history).toBeDefined();
    expect(history.length).toBeGreaterThan(0);
    expect(history[0]).toHaveProperty("timestamp");
    expect(history[0]).toHaveProperty("price");
    expect(history[0]).toHaveProperty("volume");
  });
});
