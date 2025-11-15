import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Ticker } from "@/types";

const TickerCard = ({ symbol, name, price, change, changePercent }: Ticker) => {
  const isPositive = change >= 0;

  return (
    <Card
      data-testid={`ticker-card-${symbol}`}
      className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-gradient-to-br from-card to-card/80"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{symbol}</h3>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
        {isPositive ? (
          <TrendingUp className="w-6 h-6 text-success" />
        ) : (
          <TrendingDown className="w-6 h-6 text-destructive" />
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          ${price.toFixed(2)}
        </div>
        <div
          data-testid={`ticker-change-${symbol}`}
          className={`flex items-center gap-2 text-sm font-medium ${
            isPositive ? "text-success" : "text-destructive"
          }`}
        >
          <span>
            {isPositive ? "+" : ""}
            {change.toFixed(2)}
          </span>
          <span>
            ({isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TickerCard;
