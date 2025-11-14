import { FC } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Ticker } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TickerIcon } from "@/components/TickerIcon";

interface TickerItemProps {
  ticker: Ticker;
  isSelected: boolean;
  onSelect: (ticker: Ticker) => void;
  status: "up" | "down" | "neutral";
  isDarkMode: boolean;
}

export const TickerItem: FC<TickerItemProps> = ({
  ticker,
  isSelected,
  onSelect,
  status,
  isDarkMode,
}) => {
  const priceColor =
    status === "up"
      ? "text-green-600"
      : status === "down"
      ? "text-red-600"
      : isDarkMode
      ? "text-gray-400"
      : "text-gray-500";

  return (
    <button
      onClick={() => onSelect(ticker)}
      className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center justify-between border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
        isSelected
          ? isDarkMode
            ? "bg-blue-900 border-blue-600 shadow"
            : "bg-blue-50 border-blue-600 shadow"
          : isDarkMode
          ? "bg-gray-950 border-gray-800 hover:bg-gray-900 hover:shadow"
          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow"
      }`}
      aria-current={isSelected ? "true" : undefined}
    >
      <div className="flex items-center space-x-3">
        <TickerIcon symbol={ticker.symbol} />
        <div className="truncate">
          <p
            className={`font-semibold truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {ticker.name}
          </p>
          <p
            className={`text-xs truncate ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {ticker.symbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-mono font-semibold text-base ${priceColor}`}>
          {formatCurrency(ticker.price)}
        </p>
        <p
          className={`text-sm font-semibold flex items-center justify-end ${
            ticker.change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {ticker.change >= 0 ? (
            <ArrowUp className="w-4 h-4 mr-1" aria-hidden="true" />
          ) : (
            <ArrowDown className="w-4 h-4 mr-1" aria-hidden="true" />
          )}
          {ticker.change >= 0 ? "+" : ""}
          {ticker.change.toFixed(2)}%
        </p>
      </div>
    </button>
  );
};
