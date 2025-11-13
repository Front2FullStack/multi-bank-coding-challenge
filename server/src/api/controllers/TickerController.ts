import { Request, Response, NextFunction } from "express";
import { IMarketDataService, ApiResponse } from "../../core/types";

export class TickerController {
  constructor(private marketDataService: IMarketDataService) {}

  getAllTickers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tickers = await this.marketDataService.getAllTickers();
      const response: ApiResponse = {
        success: true,
        data: tickers,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getTicker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { symbol } = req.params;
      const ticker = await this.marketDataService.getTicker(symbol);

      if (!ticker) {
        res.status(404).json({
          success: false,
          error: `Ticker ${symbol} not found`,
          timestamp: new Date().toISOString(),
        });
        next();
      }

      const response: ApiResponse = {
        success: true,
        data: ticker,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
