import Hero from "@/components/Hero";
import NewsFeed from "@/components/NewsFeed";
import TickerGrid from "@/components/TickerGrid";

const Index = async () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TickerGrid />
      <NewsFeed />
    </div>
  );
};

export default Index;
