
// 6. Sweet Shop Login Test
//    6.1. Go to 'https://sweetshop.netlify.app'
//    6.2. Login (test using email not containing "@", expect error message
//    6.3. Login (using email containing "@", expect no error message)
//    6.4. Page should redirect to "Your account"
//    6.5. Check if "Your account" is loaded
//    6.6. Make sure that table items can be sorted by clicking links

import 'cypress-xpath';

describe('task 6', () => {
    it('Do the Work', () => {
        // 6.1. Go to 'https://sweetshop.netlify.app'
        cy.visitWebsite();
        cy.contains('a', 'Login').click();

        //    6.2. Login (test using email not containing "@", expect error message

        cy.get('#exampleInputEmail').type(' ');
        cy.get('#exampleInputPassword').type(' ');
        cy.contains('button', 'Login').click();
        cy.get('.invalid-feedback.invalid-email')
            .should('be.visible')
            .and('contain', 'Please enter a valid email address.');

        cy.get('#exampleInputEmail').type('kazkas');
        cy.get('#exampleInputPassword').type('123');
        cy.contains('button', 'Login').click();
        cy.get('.invalid-feedback.invalid-email')
            .should('be.visible')
            .and('contain', 'Please enter a valid email address.');

        cy.get('#exampleInputEmail').clear();

        //    6.3. Login (using email containing "@", expect no error message)

        cy.get('#exampleInputEmail').type('sweets-eater@email.eu');
        cy.get('#exampleInputPassword').type(' ');
        cy.contains('button', 'Login').click();

        //    6.4. Page should redirect to "Your account"

        cy.get('h1.display-3')
            .should('be.visible')
            .and('contain', 'Your Account');

        //    6.5. Check if "Your account" is loaded
        // Wait for the body 'onload' event
        cy.document().should((doc) => {
            expect(doc.readyState).to.eq('complete');
        });

        // Ensure navigation bar is visible
        cy.get('.navbar').should('be.visible');

        // Ensure "Your Account" title is visible
        cy.get('h1.display-3').should('be.visible').and('contain', 'Your Account');

        // Ensure basket items section exists
        cy.get('#basketItems').should('exist');

        // Ensure table transactions are fully loaded
        cy.get('#transactions tbody tr').should('have.length.greaterThan', 0);

        // Ensure Chart.js is loaded
        cy.get('#transactionChart').should('exist');

        // Ensure the footer is loaded
        cy.get('footer.py-5').should('be.visible');

//    6.6. Make sure that table items can be sorted by clicking links

        cy.get('#transactions tbody tr').should('have.length', 3);

        // Sort by "Order Number"
        cy.checkSorting('th a.order-number');
     
        // Sort by "Date Ordered"
        cy.checkSorting('th a.order-date');

       // Sort by "Order Description"
        cy.checkSorting('th a.order-description')

        // Sort by "Order Total"
        cy.checkSorting('th a.order-total');
        
    })

})