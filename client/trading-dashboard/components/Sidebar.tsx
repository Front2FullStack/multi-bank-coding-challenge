import { FC } from "react";
import { Ticker } from "@/types/index";
import { TickerItem } from "@/components/TickerItem";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface SidebarProps {
  tickers: Ticker[];
  selectedTicker: Ticker | null;
  onSelectTicker: (ticker: Ticker) => void;
  isLoading: boolean;
  priceStatus: { [key: string]: "up" | "down" | "neutral" };
  isOpen: boolean;
  isDarkMode: boolean;
}

export const Sidebar: FC<SidebarProps> = ({
  tickers,
  selectedTicker,
  onSelectTicker,
  isLoading,
  priceStatus,
  isOpen,
  isDarkMode,
}) => {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 ${
        isDarkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
      } border-r transition-transform duration-300 ease-in-out flex flex-col mt-16 lg:mt-0 shadow-lg`}
      aria-label="Market Ticker List"
    >
      <div
        className={`p-6 ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        } border-b`}
      >
        <h2
          className={`text-sm font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          } uppercase tracking-wide`}
        >
          Markets
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } mt-1`}
        >
          {tickers.length} assets
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner text="Loading markets..." isDark={isDarkMode} />
        ) : (
          <div className="p-3 space-y-2">
            {tickers.map((ticker) => (
              <TickerItem
                key={ticker.symbol}
                ticker={ticker}
                isSelected={selectedTicker?.symbol === ticker.symbol}
                onSelect={onSelectTicker}
                status={priceStatus[ticker.symbol]}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
