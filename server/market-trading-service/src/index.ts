import path from "path";
import moduleAlias from "module-alias";

// Register a runtime alias so imports using `@/...` resolve to the
// current directory (works when running TS in `src/` and when running
// compiled JS from `dist/`).
moduleAlias.addAlias("@", path.resolve(__dirname));
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { Container } from "./container/Container";
import { createRoutes } from "./api/routes";
import { Config } from "./infrastructure/config/Config";
import { createSuccessResponse } from "./utils";

dotenv.config();

async function startServer() {
  // Initialize dependency container
  const container = new Container();
  const config = Config.get();

  // Create Express app
  const app: Application = express();

  // Middleware
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS?.split(",") || [
        "http://localhost:3000",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  const tickerController = container.getTickerController();
  const routes = createRoutes(tickerController);

  // Health check
  app.get("/health", (_, res) => {
    res
      .status(200)
      .json(createSuccessResponse("Running", `API health is fine`));
  });

  app.use("/api", routes);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });

  // Error handling
  const errorHandler = container.getErrorHandler();
  app.use(errorHandler.handle);

  // ========================================
  // 6. Start HTTP Server
  // ========================================
  const httpServer = app.listen(config.port, () => {
    console.log(`✅ HTTP Server running on port ${config.port}`);
    console.log(`   Access REST API at http://localhost:${config.port}/api`);
  });

  // Start price simulation
  const marketDataService = container.getMarketDataService();
  try {
    await marketDataService.startSimulation();
    console.log("✅ Price simulation started");
  } catch (error) {
    console.error("❌ Failed to start price simulation:", error);
    throw error;
  }

  console.log("Price simulation started");

  const shutdown = (signal: string) => {
    console.log(`\n⚠️  ${signal} received, shutting down gracefully...`);

    // Close HTTP server
    httpServer.close(() => {
      console.log("🛑 HTTP server closed");
    });

    // In production, would also:
    // - Stop price simulations
    // - Close database connections
    // - Save state if needed

    // Force exit after 10 seconds
    setTimeout(() => {
      console.error("❌ Forced shutdown after timeout");
      marketDataService.stopSimulation();
      process.exit(1);
    }, 10000);
  };

  // Graceful shutdown
  // Register shutdown handlers
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

/**
 * Error handler for unhandled rejections
 */
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

/**
 * Error handler for uncaught exceptions
 */
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
