import { MarketDataService } from "../MarketDataService";
import { ITickerRepository } from "../../types";

describe("MarketDataService", () => {
  let service: MarketDataService;
  let mockRepo: jest.Mocked<ITickerRepository>;
  let mockSimulator: any;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findBySymbol: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockSimulator = {
      start: jest.fn(),
      stop: jest.fn(),
      generateHistoricalData: jest.fn(),
    };

    service = new MarketDataService(mockRepo, mockSimulator);
  });

  it("should get all tickers", async () => {
    const mockTickers = [{ symbol: "AAPL", name: "Apple", price: 100 }];
    mockRepo.findAll.mockResolvedValue(mockTickers as any);

    const result = await service.getAllTickers();

    expect(result).toEqual(mockTickers);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });

  it("should get ticker by symbol", async () => {
    const mockTicker = { symbol: "AAPL", name: "Apple", price: 100 };
    mockRepo.findBySymbol.mockResolvedValue(mockTicker as any);

    const result = await service.getTicker("AAPL");

    expect(result).toEqual(mockTicker);
    expect(mockRepo.findBySymbol).toHaveBeenCalledWith("AAPL");
  });

  it("should return null for non-existent ticker", async () => {
    mockRepo.findBySymbol.mockResolvedValue(null);

    const result = await service.getTicker("INVALID");

    expect(result).toBeNull();
  });
});
