import { FC } from "react";

interface TickerIconProps {
  symbol: string;
}

/**
 * A component that displays a colored icon with the first letter of a stock symbol.
 * The color is deterministically chosen based on the symbol's first character.
 */
export const TickerIcon: FC<TickerIconProps> = ({ symbol }) => {
  const firstLetter = symbol.charAt(0).toUpperCase();

  // A palette of Tailwind CSS background colors
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-500",
  ];

  // Choose a color based on the character code of the first letter
  const colorIndex = symbol.charCodeAt(0) % colors.length;

  return (
    <div
      className={`w-10 h-10 rounded-lg ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm select-none shrink-0`}
      aria-hidden="true"
    >
      {firstLetter}
    </div>
  );
};
