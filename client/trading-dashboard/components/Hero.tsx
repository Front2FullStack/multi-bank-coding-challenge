import { TrendingUp, Activity, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b  bg-gradient-to-br from-background via-background to-secondary py-20 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(210_100%_56%/0.1),transparent_50%)]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Live Market Data
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Real-Time Market
            <span className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Stay ahead with live ticker updates, breaking market news, and
            comprehensive trading insights all in one place.
          </p>

          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border">
              <TrendingUp className="w-8 h-8 text-success" />
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">Live</div>
                <div className="text-sm text-muted-foreground">
                  Price Updates
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Market Coverage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
