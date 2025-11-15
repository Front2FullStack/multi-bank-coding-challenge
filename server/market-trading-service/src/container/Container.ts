import { TickerRepository } from "@/infrastructure/repositories/TickerRepository";
import { PriceSimulator } from "@/core/services/PriceSimulator";
import { MarketDataService } from "@/core/services/MarketDataService";
import { TickerController } from "@/api/controllers/TickerController";
import { ErrorHandler } from "@/api/middleware/ErrorHandler";
import {
  ITickerRepository,
  IPriceSimulator,
  IMarketDataService,
} from "@/core/types";
import { WebSocketManager } from "@/infrastructure/websocket/WebSocketManager";

export class Container {
  private services: Map<string, any> = new Map();

  constructor() {
    this.registerServices();
  }

  private registerServices(): void {
    // Register repositories
    const tickerRepository: ITickerRepository = new TickerRepository();
    this.services.set("TickerRepository", tickerRepository);

    // Register core services
    const priceSimulator: IPriceSimulator = new PriceSimulator();
    this.services.set("PriceSimulator", priceSimulator);

    const marketDataService: IMarketDataService = new MarketDataService(
      tickerRepository,
      priceSimulator
    );
    this.services.set("MarketDataService", marketDataService);

    // Register controllers
    const tickerController = new TickerController(marketDataService);
    this.services.set("TickerController", tickerController);

    // 4. Register Middleware
    // Error handling middleware
    const errorHandler = new ErrorHandler();
    this.services.set("ErrorHandler", errorHandler);
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }

  // Convenience methods
  getTickerController(): TickerController {
    return this.get("TickerController");
  }

  getMarketDataService(): IMarketDataService {
    return this.get("MarketDataService");
  }

  getErrorHandler(): ErrorHandler {
    return this.get("ErrorHandler");
  }

  createWebSocketManager(port: number): WebSocketManager {
    return new WebSocketManager(port, this.getMarketDataService());
  }
}
