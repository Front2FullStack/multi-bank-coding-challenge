"use client";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  title: string;
  source: string;
  time: string;
  category: string;
  url: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      title: "Tech Stocks Rally as Markets React to Positive Economic Data",
      source: "Financial Times",
      time: "2 hours ago",
      category: "Markets",
      url: "#",
    },
    {
      title: "Federal Reserve Signals Potential Interest Rate Changes",
      source: "Bloomberg",
      time: "3 hours ago",
      category: "Economy",
      url: "#",
    },
    {
      title: "Major Tech Companies Report Strong Q4 Earnings",
      source: "Reuters",
      time: "5 hours ago",
      category: "Earnings",
      url: "#",
    },
    {
      title: "Global Markets Show Mixed Results Amid Trade Talks",
      source: "Wall Street Journal",
      time: "6 hours ago",
      category: "Global",
      url: "#",
    },
    {
      title: "Cryptocurrency Market Experiences Significant Volatility",
      source: "CNBC",
      time: "8 hours ago",
      category: "Crypto",
      url: "#",
    },
    {
      title: "Energy Sector Stocks Rise on Supply Chain Improvements",
      source: "The Guardian",
      time: "10 hours ago",
      category: "Energy",
      url: "#",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight delay (optional)
      setTimeout(() => {
        setNews((prevNews) => [...prevNews].sort(() => Math.random() - 0.5));
      }, 500); // optional internal visual delay
    }, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Market News
            </h2>
            <p className="text-muted-foreground text-lg">
              Latest updates from trusted financial sources
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
