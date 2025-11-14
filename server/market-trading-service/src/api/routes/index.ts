import { Router } from "express";
import { TickerController } from "../controllers/TickerController";

export function createRoutes(tickerController: TickerController): Router {
  const router = Router();

  // Ticker routes
  router.get("/tickers", tickerController.getAllTickers);
  router.get("/tickers/:symbol", tickerController.getTicker);
  router.get("/tickers/:symbol/history", tickerController.getHistoricalData);

  return router;
}
