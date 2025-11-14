import { FC } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Ticker } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TickerIcon } from "@/components/TickerIcon";

interface TickerDetailsHeaderProps {
  ticker: Ticker;
  isDarkMode: boolean;
}

export const TickerDetails: FC<TickerDetailsHeaderProps> = ({
  ticker,
  isDarkMode,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div className="flex items-center mb-4 sm:mb-0 space-x-4">
        <TickerIcon symbol={ticker.symbol} /> {/* <-- Usage here */}
        <div className="truncate">
          <h1
            className={`text-3xl font-extrabold truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {ticker.name}
          </h1>
          <p
            className={`text-sm truncate ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {ticker.symbol}
          </p>
        </div>
      </div>
      <div className="text-left sm:text-right">
        <p
          className={`text-4xl font-extrabold font-mono ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {formatCurrency(ticker.price)}
        </p>
        <p
          className={`text-xl font-semibold flex items-center justify-start sm:justify-end mt-1 ${
            ticker.change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {ticker.change >= 0 ? (
            <ArrowUp className="w-5 h-5 mr-1" aria-hidden="true" />
          ) : (
            <ArrowDown className="w-5 h-5 mr-1" aria-hidden="true" />
          )}
          {ticker.change.toFixed(2)}% (24h)
        </p>
      </div>
    </div>
  );
};
