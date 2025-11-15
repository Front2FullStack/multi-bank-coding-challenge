import { FC } from "react";
import { formatCurrency } from "@/lib/utils";
import { useDarkMode } from "@/hooks/userDarkMode";

interface CustomTooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<any>;
  label?: number;
}

/**
 * A custom tooltip component for the Recharts AreaChart.
 */
export const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { isDarkMode } = useDarkMode();
  if (active && payload && payload.length && label) {
    return (
      <div
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border rounded-lg shadow-lg p-3`}
      >
        <p
          className={`text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } mb-1`}
        >
          {new Date(label).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p
          className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};
