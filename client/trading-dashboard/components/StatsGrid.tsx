import { FC } from "react";
import { Ticker } from "@/types";
import { formatLargeNumber } from "@/lib/utils";
import { TrendingUp, BarChart3 } from "lucide-react";

interface StatsGridProps {
  ticker: Ticker;
  isDarkMode: boolean;
}

/**
 * A reusable card for displaying a single statistic.
 */
const StatCard: FC<{
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  isDarkMode: boolean;
}> = ({ icon, label, value, isDarkMode }) => (
  <div
    className={`rounded-lg p-5 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    {icon}
    <div>
      <p
        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
      >
        {label}
      </p>
      <div
        className={`text-lg font-semibold ${
          typeof value !== "string"
            ? ""
            : isDarkMode
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        {value}
      </div>
    </div>
  </div>
);

/**
 * Displays a grid of key statistics for a selected ticker.
 */
export const StatsGrid: FC<StatsGridProps> = ({ ticker, isDarkMode }) => {
  const stats = [
    {
      label: "24h Change",
      value: (
        <span
          className={ticker.change >= 0 ? "text-green-600" : "text-red-600"}
        >
          {ticker.change.toFixed(2)}%
        </span>
      ),
      icon: (
        <TrendingUp
          className={`w-8 h-8 ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
          aria-hidden="true"
        />
      ),
    },
    {
      label: "24h Volume",
      value: formatLargeNumber(ticker.volume),
      icon: (
        <BarChart3
          className={`w-8 h-8 ${
            isDarkMode ? "text-purple-400" : "text-purple-600"
          }`}
          aria-hidden="true"
        />
      ),
    },
    {
      label: "Market Cap",
      value: formatLargeNumber(ticker.price * 19700000), // Note: Using mock calculation from original
      icon: (
        <TrendingUp
          className={`w-8 h-8 ${
            isDarkMode ? "text-green-400" : "text-green-600"
          } rotate-180`}
          aria-hidden="true"
        />
      ),
    },
    {
      label: "Symbol",
      value: ticker.symbol.split("-")[0],
      icon: (
        <BarChart3
          className={`w-8 h-8 ${
            isDarkMode ? "text-yellow-400" : "text-yellow-500"
          }`}
          aria-hidden="true"
        />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};
