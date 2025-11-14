import dotenv from "dotenv";
import { AppConfig } from "../../core/types";

dotenv.config();

export class Config {
  static get(): AppConfig {
    return {
      port: parseInt(process.env.PORT || "3005"),
      env: process.env.NODE_ENV || "development",
    };
  }
}
