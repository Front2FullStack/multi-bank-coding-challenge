import { FC, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { HistoricalData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { TIME_FRAMES } from "@/constants";
import { CustomTooltip } from "@/components/ui/CutomTooltip";

interface PriceChartProps {
  data: HistoricalData[];
  isLoading: boolean;
  chartDays: number;
  onChartDaysChange: (days: number) => void;
  isDarkMode: boolean;
}

export const PriceChart: FC<PriceChartProps> = ({
  data,
  isLoading,
  chartDays,
  onChartDaysChange,
  isDarkMode,
}) => {
  const chartDomain = useMemo(() => {
    if (!data || data.length === 0) return [0, 100];
    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  }, [data]);

  return (
    <div
      className={`rounded-lg p-6 flex flex-col flex-grow shadow-md ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Time Frame Selector */}
      <div className="flex justify-end mb-4">
        <div
          className={`flex items-center rounded-md p-1 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          {TIME_FRAMES.map(({ label, days }) => (
            <button
              key={days}
              onClick={() => onChartDaysChange(days)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 mr-2 last:mr-0 ${
                chartDays === days
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-600"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              aria-pressed={chartDays === days}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-grow w-full min-w-0 h-72 md:h-96">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
          </div>
        ) : (
          <ResponsiveContainer
            minWidth={0}
            minHeight={undefined}
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)"
                }
              />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) =>
                  new Date(time).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={chartDomain}
                tickFormatter={(value) => formatCurrency(Number(value))}
                stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                orientation="right"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
