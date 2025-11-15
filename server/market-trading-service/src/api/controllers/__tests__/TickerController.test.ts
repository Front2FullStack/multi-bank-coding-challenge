import express from "express";
import request from "supertest";
import { TickerController } from "../TickerController";
import { createRoutes } from "../../routes";

describe("TickerController", () => {
  let app: express.Application;
  let mockService: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockService = {
      getAllTickers: jest.fn(),
      getTicker: jest.fn(),
      getHistoricalData: jest.fn(),
      getQuote: jest.fn(),
    };

    const controller = new TickerController(mockService);
    app.use("/api", createRoutes(controller));
  });

  it("GET /api/tickers should return all tickers", async () => {
    mockService.getAllTickers.mockResolvedValue([
      { symbol: "AAPL", price: 100 },
    ]);

    const response = await request(app).get("/api/tickers").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.tickers).toHaveLength(1);
  });

  it("GET /api/tickers/:symbol should return specific ticker", async () => {
    mockService.getTicker.mockResolvedValue({
      symbol: "AAPL",
      price: 100,
    });

    const response = await request(app).get("/api/tickers/AAPL").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.symbol).toBe("AAPL");
  });

  it("GET /api/tickers/:symbol should return 404 for invalid ticker", async () => {
    mockService.getTicker.mockResolvedValue(null);

    const response = await request(app).get("/api/tickers/INVALID").expect(404);

    expect(response.body.success).toBe(false);
  });
});
