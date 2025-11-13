import { Request, Response } from "express";
import marketDataService from "@/services/marketDataService";
import { createErrorResponse, createSuccessResponse } from "@/utils";
import { count } from "console";

export const getAllTickers = (_req: Request, res: Response): void => {
  try {
    const tickers = marketDataService.getAllTickers();
    res
      .status(200)
      .json(
        createSuccessResponse(
          { tickers, count },
          "All Tickers Fetched successfully"
        )
      );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json(createErrorResponse(errorMessage));
  }
};

export const getTicker = (
  req: Request<{ symbol: string }>,
  res: Response
): void => {
  try {
    const { symbol } = req.params;
    const ticker = marketDataService.getTicker(symbol.toUpperCase());

    if (!ticker) {
      res.status(500).json(createErrorResponse(`Ticker ${symbol} not found`));
      return;
    }

    res
      .status(200)
      .json(
        createSuccessResponse(
          ticker.toJSON(),
          `Ticker ${symbol} Fetched successfully`
        )
      );
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json(createErrorResponse(errorMessage));
    return;
  }
};
