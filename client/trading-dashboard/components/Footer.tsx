import { BarChart3 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">MarketHub</span>
          </div>

          <p className="text-muted-foreground text-center md:text-right">
            © 2024 MarketHub. Real-time market data and insights.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
