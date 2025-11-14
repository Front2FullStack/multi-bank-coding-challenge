import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsFeed from "@/components/NewsFeed";
import Footer from "@/components/Footer";
import TickerGrid from "@/components/TickerGrid";

const Index = async () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <NewsFeed />
      <TickerGrid />
      <Footer />
    </div>
  );
};

export default Index;
