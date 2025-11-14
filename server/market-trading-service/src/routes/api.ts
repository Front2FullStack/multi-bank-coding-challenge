import { Router } from "express";
import * as tickerController from "@/controllers/tickerController";

const router: Router = Router();

// Ticker endpoints
router.get("/tickers", tickerController.getAllTickers);
router.get("/tickers/:symbol", tickerController.getTicker);

export default router;
