/// <reference types="cypress" />


context('SETTINGS', () => {
  beforeEach(() => {
    cy.login("0718026490","P@ssword123");
    //cy.visit('http://localhost:4200/members');
    cy.contains("Members").click();
  })

  it('CREATING NEW MEMBER', () => {
    cy.contains("Add Members").click();
  })
  
})
