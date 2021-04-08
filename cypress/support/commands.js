// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("loadfixtures", () => {
    cy.intercept('POST', '/getUserByPhoneNumber', { fixture: 'getUserByPhoneNumber.json' }).as('getUserByPhoneNumber');
})

Cypress.Commands.add("login", (phoneNumber,password) => {
    cy.visit('http://localhost:4200');
    cy.contains("Start Here").click();
    cy.contains("Select country").click();
    cy.contains("Tanzania").click();
    cy.contains("Phone Number").click();
    cy.get('input[data-placeholder="OXXXXXXXXX"]').type(phoneNumber)
    cy.contains("Verify Phone Number").click();
    cy.get('input[data-placeholder="Enter Your Password"]').type(password);
    cy.contains("Login").click();
})
Cypress.Commands.add("clearStorage", () => {
    indexedDB.deleteDatabase("group_saving_metadata");
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    localStorage.removeItem('group-saving-user');
    localStorage.removeItem('group_savings_active_group');
    localStorage.removeItem('group_savings_current_member');
    localStorage.removeItem('group-saving-user');
})
