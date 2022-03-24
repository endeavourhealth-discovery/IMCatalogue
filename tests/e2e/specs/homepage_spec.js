describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.url().should("include", "/snomedLicense");
  });

  it("redirects to snomed when rejects agreement", () => {
    cy.contains("Decline").click();
    cy.url().should("include", "www.snomed.org");
  });

  it("loads dashboard when accepts agreement", () => {
    cy.get(".p-button-label")
      .contains("Agree")
      .click();
    cy.contains("Instance overview");
  });
});
