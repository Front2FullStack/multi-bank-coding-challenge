import { Request, Response, NextFunction } from "express";
import { IMarketDataService } from "@/core/types";
import { createErrorResponse, createSuccessResponse } from "@/utils";

export class TickerController {
  constructor(private marketDataService: IMarketDataService) {}

  getAllTickers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tickers = await this.marketDataService.getAllTickers();

      res.status(200).json(
        createSuccessResponse(
          {
            tickers,
            count: tickers.length,
          },
          "Ticker fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

  getTicker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { symbol } = req.params;
      const ticker = await this.marketDataService.getTicker(symbol);

      if (!ticker) {
        res.status(404).json(createErrorResponse(`Ticker ${symbol} not found`));
        return;
      }

      res
        .status(200)
        .json(
          createSuccessResponse(ticker, `Ticker ${symbol} fetched successfully`)
        );
    } catch (error) {
      next(error);
    }
  };
}
