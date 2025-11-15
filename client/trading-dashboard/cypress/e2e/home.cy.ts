describe("Homepage", () => {
  context("base rendering", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/api/tickers", { fixture: "tickers.json" }).as(
        "getTickers"
      );
      cy.visit("/");
      cy.wait("@getTickers");
    });

    it("shows the hero heading", () => {
      cy.contains("Live Market Data").should("be.visible");
    });

    it("renders the ticker grid with items from API", () => {
      cy.get('[data-testid="ticker-grid"]').within(() => {
        cy.get('[data-testid^="ticker-card-"]').should("have.length", 5);
      });
      // Spot-check specific items using dynamic data-testid
      cy.get('[data-testid="ticker-card-AAPL"]').should("be.visible");
      cy.get('[data-testid="ticker-card-TSLA"]').should("be.visible");
    });

    it("formats prices and percent changes correctly", () => {
      // Positive change should be green
      cy.get('[data-testid="ticker-card-AAPL"]').within(() => {
        cy.contains("$185.50").should("be.visible");
        cy.contains("+0.82%").should("be.visible");
        cy.get('[data-testid="ticker-change-AAPL"]').should(
          "have.class",
          "text-success"
        );
      });

      // Negative change should be red
      cy.get('[data-testid="ticker-card-TSLA"]').within(() => {
        cy.contains("-1.70%").should("be.visible");
        cy.get('[data-testid="ticker-change-TSLA"]').should(
          "have.class",
          "text-destructive"
        );
      });
    });

    it("shows the news section header on the homepage", () => {
      cy.contains(/Market News/i).should("be.visible");
    });

    it("is responsive on mobile and desktop", () => {
      // Desktop
      cy.viewport(1280, 800);
      cy.contains("Live Market Data").should("be.visible");
      cy.get('[data-testid="ticker-grid"]').should("be.visible");

      // Mobile
      cy.viewport(375, 667);
      cy.contains("Live Market Data").should("be.visible");
      cy.get('[data-testid="ticker-grid"]').should("be.visible");
    });
  });
});
