import Hero from "@/components/Hero";
import NewsFeed from "@/components/NewsFeed";
import TickerGrid from "@/components/TickerGrid";

// Converted to a synchronous Server Component (no data fetching here) so Jest can render it.
export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TickerGrid />
      <NewsFeed />
    </div>
  );
}
