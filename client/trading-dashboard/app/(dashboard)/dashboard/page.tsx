"use client";

import { useEffect, useState } from "react";

import { BarChart3, AlertCircle, Menu, X, Moon, Sun } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { useTradingData } from "@/hooks/useTradingData";
import { Ticker } from "@/types";
import { TickerDetails } from "@/components/TickerDetails";
import { StatsGrid } from "@/components/StatsGrid";
import { PriceChart } from "@/components/PriceChart";
import { useDarkMode } from "@/hooks/userDarkMode";

const TradingDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    tickers,
    selectedTicker,
    setSelectedTicker,
    chartData,
    chartDays,
    setChartDays,
    loading,
    error,
    priceStatus,
  } = useTradingData();

  const { isDarkMode, setIsDarkMode } = useDarkMode();

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  const handleSelectTicker = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header
        className={`${
          isDarkMode
            ? "bg-gray-950 border-gray-800"
            : "bg-white border-gray-200"
        } border-b sticky top-0 z-50`}
      >
        <div className="px-4 sm:px-6 lg:px-8 lg:pr-16">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 rounded-lg ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              >
                {sidebarOpen ? (
                  <X
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                )}
              </button>
              <div className="flex items-center space-x-2 overflow-hidden"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-green-900 rounded-lg`}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-green-400" : "text-green-700"
                  }`}
                >
                  Live
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2  rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar
          tickers={tickers}
          selectedTicker={selectedTicker}
          onSelectTicker={handleSelectTicker}
          isLoading={loading.tickers}
          priceStatus={priceStatus}
          isOpen={sidebarOpen}
          isDarkMode={isDarkMode}
        />

        {/* Main content */}
        <main
          className={`flex-grow p-6 overflow-y-auto ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {error && (
            <div
              className={`${
                isDarkMode
                  ? "bg-red-800 border-red-700 text-red-200"
                  : "bg-red-100 border-red-400 text-red-700"
              } px-4 py-3 rounded-lg relative mb-6 flex items-center`}
              role="alert"
            >
              <AlertCircle
                className={`w-5 h-5 mr-3 ${
                  isDarkMode ? "text-red-300" : "text-red-700"
                }`}
                aria-hidden="true"
              />
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {selectedTicker ? (
            <>
              {/* Header Info */}
              <TickerDetails ticker={selectedTicker} isDarkMode={isDarkMode} />

              {/* Stats Cards */}
              <StatsGrid ticker={selectedTicker} isDarkMode={isDarkMode} />

              {/* Chart Section */}
              <PriceChart
                data={chartData}
                chartDays={chartDays}
                onChartDaysChange={setChartDays}
                isDarkMode={isDarkMode}
                isLoading={loading.chart}
              />
            </>
          ) : (
            <div
              className={`flex flex-col justify-center items-center h-full ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <BarChart3 className="w-16 h-16 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold">No Ticker Selected</h2>
              <p className="text-center max-w-xs">
                Please select a ticker from the list to view details.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TradingDashboard;
