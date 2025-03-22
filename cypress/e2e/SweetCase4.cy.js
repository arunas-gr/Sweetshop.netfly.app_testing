// Test Case 4. "Sweets" page functionality test

// 4. "Sweets" page functionality test
//     4.1. Go to 'https://sweetshop.netlify.app/sweets'
//     4.2. Verify if page is displayed correctly
//     4.3. Add 1 item of each type to the basket
//     4.4. Go to the "Basket"
//     4.5. Verify if all items are displayed in "Basket"
//     4.6. Verify delivery method functionality

/// <reference types="cypress" />

describe('Checkout Process', () => {
  beforeEach(() => {
    //     4.1. Go to 'https://sweetshop.netlify.app/sweets'
    cy.visitWebsite();
  });

  //     4.2. Verify if page is displayed correctly
  it('Verify if page is displayed correctly', () => {
    cy.verifyCorrectDisplay();

    it('Test case 4.1. Checkout process with "Collect" option', () => {
      cy.addProducts(2);
      cy.get('#navbarColor01 > ul > li:nth-child(4) > a').click();
      cy.get('#exampleRadios1').check();
      cy.clientData();
    });
  });

  it('Test case 4.2. Checkout process with "Standard Shipping" option', () => {
    cy.addProducts(2);
    cy.get('#navbarColor01 > ul > li:nth-child(4) > a').click();
    // radio mygtuko pasirinkimas neveikia
    // cy.get('#exampleRadios2').check({force: true});
    cy.get('#exampleRadios2').then($radio => {
      // Check if the element is hidden or obstructed, and force click if necessary
      if ($radio.is(':visible')) {
        cy.wrap($radio).click({ force: true });
      } else {
        cy.wrap($radio).click({ force: true });
      }
    });
    cy.clientData();
  });

  it('test case 4.3. Checkout process using Promo code', () => {
    cy.addProducts(1);
    cy.get('#navbarColor01 > ul > li:nth-child(4) > a').click();
    cy.get('input.form-control[placeholder="Promo code"]').type('DISCOUNT10');
    cy.get('button.btn.btn-secondary').click();
    cy.clientData();
  });
});