"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { API_BASE_URL, WS_URL, MOCK_TICKERS } from "@/constants";
import type { Ticker } from "@/types";

type PriceStatus = "up" | "down" | "neutral";

interface WebSocketContextValue {
  connected: boolean;
  clientId?: string;
  tickers: Ticker[];
  priceStatus: Record<string, PriceStatus>;
  subscribe: (symbols: string[]) => void;
  unsubscribe: (symbols: string[]) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clientId, setClientId] = useState<string | undefined>();
  const [tickersMap, setTickersMap] = useState<Record<string, Ticker>>({});
  const [priceStatus, setPriceStatus] = useState<Record<string, PriceStatus>>(
    {}
  );
  const subscribed = useRef<Set<string>>(new Set());

  // Keep previous prices to determine direction
  const prevPrices = useRef<Record<string, number>>({});

  const { sendJsonMessage, readyState, lastMessage } = useWebSocket(WS_URL, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
    onOpen: () => {
      // After open, if we already have initial list, resubscribe
      const symbols = Array.from(subscribed.current);
      if (symbols.length) {
        sendJsonMessage({ type: "subscribe", payload: { symbols } });
      }
    },
    onError: (e) => {
      // Non-fatal; UI will still show initial REST data
      console.error("WebSocket error:", e);
    },
  });

  const connected = readyState === ReadyState.OPEN;

  // Initial bootstrap: fetch tickers once, populate map, and subscribe to all
  useEffect(() => {
    let cancelled = false;
    const bootstrap = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tickers`);
        if (!res.ok) throw new Error("Failed to fetch initial tickers");
        const json = await res.json();
        const initialTickers: Ticker[] = json?.data?.tickers ?? MOCK_TICKERS;

        if (cancelled) return;

        setTickersMap((prev) => {
          const next: Record<string, Ticker> = { ...prev };
          for (const t of initialTickers) {
            next[t.symbol] = t;
            prevPrices.current[t.symbol] = t.price;
          }
          return next;
        });

        const symbols = initialTickers.map((t) => t.symbol.toUpperCase());
        symbols.forEach((s) => subscribed.current.add(s));

        // Subscribe via WS when available (or once connected)
        sendJsonMessage({ type: "subscribe", payload: { symbols } });
      } catch (e) {
        console.error("Failed to bootstrap tickers:", e);
        // Populate with mock to keep UI alive
        setTickersMap((prev) => {
          const next: Record<string, Ticker> = { ...prev };
          for (const t of MOCK_TICKERS) {
            next[t.symbol] = t;
            prevPrices.current[t.symbol] = t.price;
          }
          return next;
        });
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle incoming WS messages
  useEffect(() => {
    if (!lastMessage?.data) return;
    try {
      const data = JSON.parse(lastMessage.data as string);
      const { type, payload } = data || {};

      if (type === "connected" && payload?.clientId) {
        setClientId(payload.clientId);
      }

      if (type === "data" && payload?.ticker) {
        const incoming: Ticker = normalizeTicker(payload.ticker);

        setTickersMap((prev) => {
          const prevTicker = prev[incoming.symbol];
          const next: Record<string, Ticker> = {
            ...prev,
            [incoming.symbol]: incoming,
          };

          // Determine price direction for animation/status
          const oldPrice =
            prevTicker?.price ?? prevPrices.current[incoming.symbol];
          if (typeof oldPrice === "number") {
            if (incoming.price > oldPrice) {
              setPriceStatus((ps) => ({ ...ps, [incoming.symbol]: "up" }));
            } else if (incoming.price < oldPrice) {
              setPriceStatus((ps) => ({ ...ps, [incoming.symbol]: "down" }));
            }
          }
          prevPrices.current[incoming.symbol] = incoming.price;
          return next;
        });
      }
    } catch (e) {
      // ignore malformed messages
    }
  }, [lastMessage]);

  const tickers = useMemo(() => Object.values(tickersMap), [tickersMap]);

  const subscribe = (symbols: string[]) => {
    const list = symbols.map((s) => s.toUpperCase());
    list.forEach((s) => subscribed.current.add(s));
    sendJsonMessage({ type: "subscribe", payload: { symbols: list } });
  };

  const unsubscribe = (symbols: string[]) => {
    const list = symbols.map((s) => s.toUpperCase());
    list.forEach((s) => subscribed.current.delete(s));
    sendJsonMessage({ type: "unsubscribe", payload: { symbols: list } });
  };

  const value = useMemo<WebSocketContextValue>(
    () => ({
      connected,
      clientId,
      tickers,
      priceStatus,
      subscribe,
      unsubscribe,
    }),
    [connected, clientId, tickers, priceStatus]
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

function normalizeTicker(t: any): Ticker {
  return {
    symbol: String(t.symbol),
    name: String(t.name),
    price: Number(t.price),
    previousClose: Number(t.previousClose ?? t.price),
    change: Number(t.change),
    changePercent: Number(t.changePercent),
    volume: Number(t.volume),
    high24h: Number(t.high24h),
    low24h: Number(t.low24h),
    lastUpdate:
      typeof t.lastUpdate === "string"
        ? t.lastUpdate
        : new Date(t.lastUpdate).toISOString(),
  } as Ticker;
}

export const useWebSocketContext = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    // Provide a safe fallback when not wrapped by provider (e.g., unit tests)
    return {
      connected: false,
      tickers: [] as Ticker[],
      priceStatus: {} as Record<string, PriceStatus>,
      subscribe: () => {},
      unsubscribe: () => {},
    } as WebSocketContextValue;
  }
  return ctx;
};
