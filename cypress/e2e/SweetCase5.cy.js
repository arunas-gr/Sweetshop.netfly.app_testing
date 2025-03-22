// 5. Billing functionality Test
//     5.1. Go to 'https://sweetshop.netlify.app/sweets'
//     5.2. Verify if page is visible
//     5.3. Add 2 samples of each item displayed
//     5.4. Go to "Basket", 
//     5.5. Remove 1 item from the basket, check if number of items in the basket has decreased accordingly
//     5.6. Fill in billing information
//     5.7. Press "Checkout", expect order confirmation.

describe('All tasks', () => {
    it('Do all tasks', () => {
        cy.visitWebsite();
        cy.verifyCorrectDisplay();
        cy.addProducts(2);
        cy.get('.small[href="javascript:removeItem(1);"]').eq(0).click();
        cy.clientData();
    })   
})