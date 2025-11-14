import { FC } from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  isDark?: boolean;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  text,
  isDark = true,
}) => (
  <div
    aria-busy="true"
    role="status"
    className="flex flex-col items-center justify-center h-full"
  >
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
    {text && (
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {text}
      </p>
    )}
  </div>
);
