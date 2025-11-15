import WebSocket, { WebSocketServer } from "ws";
import { WSClient, WSMessage, Ticker, IMarketDataService } from "@/core/types";

export class WebSocketManager {
  private wss: WebSocketServer;
  private clients: Map<string, WSClient> = new Map();
  private marketDataService: IMarketDataService;
  // Track callback IDs so we can properly unsubscribe and avoid memory leaks per client
  private subscriptionIds: Map<string, Map<string, string>> = new Map();

  constructor(port: number, marketDataService: IMarketDataService) {
    this.marketDataService = marketDataService;
    this.wss = new WebSocketServer({ port });
    this.initialize();
  }

  private initialize(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      const clientId = this.generateClientId();
      const client: WSClient = {
        id: clientId,
        ws: ws as any,
        subscriptions: new Set(),
        isAlive: true,
      };

      this.clients.set(clientId, client);
      console.log(`Client connected: ${clientId}`);

      ws.send(
        JSON.stringify({
          type: "connected",
          payload: { clientId },
        })
      );

      ws.on("message", (data: WebSocket.Data) => {
        this.handleMessage(client, data.toString());
      });

      ws.on("close", () => {
        this.handleDisconnect(clientId);
      });

      ws.on("error", (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
      });

      ws.on("pong", () => {
        client.isAlive = true;
      });
    });

    // Heartbeat
    setInterval(() => {
      this.clients.forEach((client) => {
        if (!client.isAlive) {
          client.ws.terminate();
          this.clients.delete(client.id);
          return;
        }
        client.isAlive = false;
        client.ws.ping();
      });
    }, 30000);
  }

  private handleMessage(client: WSClient, message: string): void {
    try {
      const msg: WSMessage = JSON.parse(message);

      switch (msg.type) {
        case "subscribe":
          this.handleSubscribe(client, msg.payload?.symbols || []);
          break;
        case "unsubscribe":
          this.handleUnsubscribe(client, msg.payload?.symbols || []);
          break;
        case "ping":
          client.ws.send(JSON.stringify({ type: "pong" }));
          break;
      }
    } catch (error) {
      client.ws.send(
        JSON.stringify({
          type: "error",
          payload: { message: "Invalid message format" },
        })
      );
    }
  }

  private async handleSubscribe(
    client: WSClient,
    symbols: string[]
  ): Promise<void> {
    for (const symbol of symbols) {
      const ticker = await this.marketDataService.getTicker(symbol);
      if (ticker) {
        client.subscriptions.add(symbol.toUpperCase());

        // Send initial data
        client.ws.send(
          JSON.stringify({
            type: "data",
            payload: { ticker },
          })
        );

        // Subscribe to updates
        const callbackId = this.marketDataService.subscribeToTicker(
          symbol,
          (updatedTicker) => {
            if (client.subscriptions.has(updatedTicker.symbol)) {
              client.ws.send(
                JSON.stringify({
                  type: "data",
                  payload: { ticker: updatedTicker },
                })
              );
            }
          }
        );
        if (!this.subscriptionIds.has(client.id)) {
          this.subscriptionIds.set(client.id, new Map());
        }
        this.subscriptionIds
          .get(client.id)!
          .set(symbol.toUpperCase(), callbackId);
      }
    }

    client.ws.send(
      JSON.stringify({
        type: "subscribed",
        payload: { symbols: Array.from(client.subscriptions) },
      })
    );
  }

  private handleUnsubscribe(client: WSClient, symbols: string[]): void {
    symbols.forEach((symbol) => {
      client.subscriptions.delete(symbol.toUpperCase());
      const perClient = this.subscriptionIds.get(client.id);
      const upper = symbol.toUpperCase();
      if (perClient && perClient.has(upper)) {
        const callbackId = perClient.get(upper)!;
        this.marketDataService.unsubscribeFromTicker(upper, callbackId);
        perClient.delete(upper);
      }
    });

    client.ws.send(
      JSON.stringify({
        type: "unsubscribed",
        payload: { symbols },
      })
    );
  }

  private handleDisconnect(clientId: string): void {
    console.log(`Client disconnected: ${clientId}`);
    // Clean up any active subscriptions for this client
    const perClient = this.subscriptionIds.get(clientId);
    if (perClient) {
      perClient.forEach((callbackId, symbol) => {
        this.marketDataService.unsubscribeFromTicker(symbol, callbackId);
      });
      this.subscriptionIds.delete(clientId);
    }
    this.clients.delete(clientId);
  }

  private generateClientId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  broadcast(ticker: Ticker): void {
    const message = JSON.stringify({
      type: "data",
      payload: { ticker },
    });

    this.clients.forEach((client) => {
      if (client.subscriptions.has(ticker.symbol)) {
        client.ws.send(message);
      }
    });
  }
}
