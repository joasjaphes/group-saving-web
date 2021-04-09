/// <reference types="cypress" />


context('SETTINGS', () => {
    beforeEach(() => {
      cy.clearStorage();
      cy.login("0718026490","P@ssword123");
    })
    it('ADDING GROUP INFORMATION', () => {
      cy.contains("Settings").click();
      cy.wait(2000);
      cy.contains("Add group information").click();
      cy.get("mat-select").click().get("mat-option").contains("Monthly").click();
      cy.get("mat-select").eq(1).click().get("mat-option").contains("Tanzanian").click();
      cy.contains("Social").click();
      cy.get("mat-select").eq(2).click().get("mat-option").contains("Yes").click();
      cy.get("button").contains("Save").click();
      cy.get("button").contains("Yes").click();
    })

    it('ADDING SOCIAL CONTRIBUTION DETAILS', () => {
      cy.contains("Settings").click();
      cy.contains("Add Social contribution details").click();
      cy.get("mat-select").eq(2).click().get("mat-option").contains("Yes").click();
      cy.contains("Next").click();

      cy.get("mat-select").eq(3).click().get("mat-option").contains("Each member must contribute").click({force: true});
      cy.get("mat-select").eq(4).click().get("mat-option").contains("Each member contribute same Amount").click();
      cy.get('input[type="number"]').type("30000");
      cy.contains("Next").click({force: true});

      cy.get("mat-select").eq(5).click().get("mat-option").contains("members are allowed to take loan from this contribution").click();
      cy.get("mat-select").eq(6).click().get("mat-option").get('mat-option[value="Yes"]').click({force: true});
      cy.get("mat-select").eq(7).click().get("mat-option").contains("Amount per month").click();
      cy.get('input[type="number"]').eq(1).type("5000");
      cy.contains("Save").click();
      cy.get('button').contains("Yes").click();
    })
    it('ADDING LOAN INFORMATION', () => {
      cy.contains("Settings").click();
      cy.contains("Add Loan Information").click();
      cy.get('input[data-placeholder="Loan name"]').click().type("Bussiness Loan");
      cy.contains("Next").click();

      cy.get("mat-select").eq(2).click().get("mat-option").contains("Fixed Percent").click();
      cy.get('input[data-placeholder="Interest Rate"]').click().type("5");
      cy.get("mat-select").eq(3).click().get("mat-option").contains("Yes").click();
      cy.get("mat-select").eq(4).click().get("mat-option").contains("Member receive full amount loaned").click();
      cy.get("mat-select").eq(5).click().get("mat-option").contains("Yes").click();
      cy.get('input[data-placeholder="Insurance Percent"]').click().type("5");
      cy.contains("Next").click({force: true});

      cy.get('input[data-placeholder="Minimum duration in Months"]').click().type("1");
      cy.get('input[data-placeholder="Maximum duration in Months"]').click().type("3");
      cy.get('input[data-placeholder="Minimum Amount"]').click().type("100000");
      cy.get("mat-select").eq(6).click().get("mat-option").contains("No Limit").click();
      cy.get("mat-select").eq(7).click().get("mat-option").contains("Yes").click();
      cy.contains("Next").click({force: true});

      cy.get("mat-select").eq(8).click().get("mat-option").contains("Yes").click();
      cy.get("mat-select").eq(9).click().get("mat-option").contains("Fixed").click();
      cy.get('input[data-placeholder="Fine amount"]').click().type("10000");
      cy.get("mat-select").eq(10).click().get("mat-option").contains("No").click();
      cy.contains("Next").click({force: true});
      cy.contains("Save").click();
      cy.get('button').contains("Yes").click();
    })

    it('ADDING MEETING RULES', () => {
      cy.contains("Settings").click();
      cy.contains("Add Meeting rules").click();
      cy.get("mat-select").eq(0).click().get("mat-option").contains("Monthly").click();
      cy.get("mat-select").eq(1).click().get("mat-option").contains("Yes").click();
      cy.get("mat-select").eq(2).click().get("mat-option").contains("There is no fine for being late").click();
      cy.contains("Save").click();
      cy.get('button').contains("Yes").click();
    })
    it('ADDING Members', () => {
      cy.contains("Settings").click();
      cy.contains("Add members").click();
      cy.get("mat-select").eq(0).click().get("mat-option").contains("+255").click();
      cy.get('input[data-placeholder="OXXXXXXXXX"]').type("0718026491");
      cy.get('input').eq(1).click().type("Arnold Minde");
      cy.get('mat-dialog-container button').contains("Add").click();

      cy.get("mat-select").eq(0).click().get("mat-option").contains("+255").click();
      cy.get('input[data-placeholder="OXXXXXXXXX"]').type("0718026492");
      cy.get('input').eq(1).click().type("Edith Minde");
      cy.get('mat-dialog-container button').contains("Add").click();
      cy.get('button').contains("Save").click();
      cy.get('button').contains("Yes").click();
    })

    it('ADDING LEADERSHIP INFORMATION', () => {
      cy.contains("Settings").click();
      cy.contains("Add leadership information").click();
      cy.wait(1000);
      cy.get('mat-select[placeholder="Select Chairperson"]').click().get("mat-option").contains("Arnold").click();
      cy.get('mat-select[placeholder="Select Secretary"]').click().get("mat-option").contains("Edith").click();
      cy.get('mat-select[placeholder="Select Treasury"]').click().get("mat-option").contains("Vincent").click();
      //cy.get("mat-dialog-container mat-select").eq(0).click().get("mat-option").contains("Arnold").click();
      //cy.get("mat-dialog-container mat-select").eq(1).click().get("mat-option").contains("Edith Minde").click();
      //cy.get("mat-dialog-container mat-select").eq(2).click().get("mat-option").contains("Vincent").click();
      cy.get('button').contains("Save").click();
      cy.get('button').contains("Yes").click();
    })

    it('ADDING STARTING BALANCES', () => {
      cy.contains("Settings").click();
      cy.contains("Add starting balances").click();
      cy.get("input").click().type("450000");
      cy.get('button').contains("Save").click();
      cy.get('button').contains("Yes").click();
    })
  })
  