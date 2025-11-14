describe("Home page", () => {
  it("loads and shows hero text", () => {
    cy.visit("/");
    cy.contains("Live Market Data").should("be.visible");
  });
});
