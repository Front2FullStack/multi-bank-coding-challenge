import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NewsFeed from "../NewsFeed";

describe("NewsFeed", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders the section title and description", () => {
    render(<NewsFeed />);

    expect(screen.getByText("Market News")).toBeInTheDocument();
    expect(
      screen.getByText("Latest updates from trusted financial sources")
    ).toBeInTheDocument();
  });

  it("displays initial news items", () => {
    render(<NewsFeed />);

    expect(
      screen.getByText(
        "Tech Stocks Rally as Markets React to Positive Economic Data"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Federal Reserve Signals Potential Interest Rate Changes"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Major Tech Companies Report Strong Q4 Earnings")
    ).toBeInTheDocument();
  });

  it("renders news items with source and time", () => {
    render(<NewsFeed />);

    expect(screen.getByText("Financial Times")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(screen.getByText("Bloomberg")).toBeInTheDocument();
    expect(screen.getByText("3 hours ago")).toBeInTheDocument();
  });

  it("renders news items with categories", () => {
    render(<NewsFeed />);

    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Economy")).toBeInTheDocument();
    expect(screen.getByText("Earnings")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
    expect(screen.getByText("Crypto")).toBeInTheDocument();
    expect(screen.getByText("Energy")).toBeInTheDocument();
  });

  it("displays 6 news items initially", () => {
    const { container } = render(<NewsFeed />);

    const grid = container.querySelector(".grid");
    expect(grid?.children.length).toBe(6);
  });

  it("has proper section structure with secondary background", () => {
    const { container } = render(<NewsFeed />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-secondary/30");
  });
});
