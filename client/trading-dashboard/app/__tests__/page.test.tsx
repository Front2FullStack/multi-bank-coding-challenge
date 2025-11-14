import { render, screen } from "@testing-library/react";
import Index from "../page";
// IMPORTANT: mock child components BEFORE importing the page so the page uses the mocked versions.
jest.mock("@/components/Hero", () => ({
  __esModule: true,
  default: () => <div data-testid="hero">Hero Component</div>,
}));

jest.mock("@/components/TickerGrid", () => ({
  __esModule: true,
  default: () => <div data-testid="ticker-grid">TickerGrid Component</div>,
}));

jest.mock("@/components/NewsFeed", () => ({
  __esModule: true,
  default: () => <div data-testid="news-feed">NewsFeed Component</div>,
}));

describe("Homepage (Index)", () => {
  it("renders all main sections: Hero, TickerGrid, and NewsFeed", () => {
    render(<Index />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("ticker-grid")).toBeInTheDocument();
    expect(screen.getByTestId("news-feed")).toBeInTheDocument();
  });

  it("has correct layout structure with min-h-screen and bg-background", () => {
    const { container } = render(<Index />);
    const mainDiv = container.querySelector(".min-h-screen.bg-background");
    expect(mainDiv).toBeInTheDocument();
  });
});
