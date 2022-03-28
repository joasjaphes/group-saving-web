/// <reference types="cypress" />


context('AUTHENTICATION', () => {
  beforeEach(() => {
    cy.clearStorage();
    cy.visit('http://localhost:4200');
  })

  it('CREATING ACCOUNT', () => {
    cy.request("DELETE", "http://localhost:9099/emulator/v1/projects/group-saving-test/accounts");
    cy.request("DELETE", "http://localhost:8080/emulator/v1/projects/group-saving-test/databases/(default)/documents");
    cy.contains("Start Here").click();
    cy.contains("Select country").click();
    cy.contains("Tanzania").click();
    cy.contains("Phone Number").click();
    cy.get('input[data-placeholder="OXXXXXXXXX"]').type("0718026490");
    cy.contains("Verify Phone Number").click();
    cy.get('input[data-placeholder="Your Name"]').type("Vincent");
    cy.contains("Group Name").click();
    cy.get('input[data-placeholder="Group Name"]').type("Trial Group");
    cy.contains("Continue").click();
    cy.get('input[data-placeholder="Minimum 6 characters"]').type("P@ssword123");
    cy.contains("Confirm").click();

    cy.get('input[data-placeholder="Enter Your Password"]').type("P@ssword123");
    cy.contains("Register").click();
  })
  it('LOGIN', () => {
    cy.visit('http://localhost:4200');
    cy.contains("Start Here").click();
    cy.contains("Select country").click();
    cy.contains("Tanzania").click();
    cy.contains("Phone Number").click();
    cy.get('input[data-placeholder="OXXXXXXXXX"]').type("0718026490")
    cy.contains("Verify Phone Number").click();
    cy.get('input[data-placeholder="Enter Your Password"]').type("P@ssword123");
    cy.contains("Login").click();
  })
})
