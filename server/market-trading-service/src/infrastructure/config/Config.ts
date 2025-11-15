import dotenv from "dotenv";
import { AppConfig } from "../../core/types";

dotenv.config();

export class Config {
  static get(): AppConfig {
    return {
      wsPort: parseInt(process.env.WS_PORT || "8080"),
      port: parseInt(process.env.PORT || "3005"),
      env: process.env.NODE_ENV || "development",
      priceUpdateInterval: parseInt(
        process.env.PRICE_UPDATE_INTERVAL || "2000"
      ),
    };
  }
}
