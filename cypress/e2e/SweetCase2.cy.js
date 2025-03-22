// Test Case 2: Add product to cart

// 2.1. Add 1 item of each type from the page "Sweet shop" page to basket
// 2.2. Verify if items count on the basket logo basket display correctly.
// 2.3. Navigate to the basket.
// 2.4. Verify if items are displayed correctly.
// 2.5. Delete 1 item from the basket
// 2.6. Verify if items count on the basket logo basket display correctly.
// 2.7. Navigate to the basket.
// 2.8. Verify if items are displayed correctly.

describe('Test Case 2: Add product to cart', () => {
    beforeEach(() => {
        cy.visitWebsite();
    });

    // 2.1. Add 1 item of each type from the "Sweet Shop" page to the basket
    it('add product to cart', () => {
        // itemsCount - variable to check if number of added items matches the declared one        
        let itemsCount = 0;

        cy.contains('Sweets').click();

        cy.get('.btn-success').each(($button) => {
            cy.wrap($button).click();
            itemsCount += 1;
            cy.wait(100); // Imitating human behavior
            cy.wrap($button).click();
            itemsCount += 1;
            cy.wait(100); // Imitating human behavior
        }).then(() => {
            // 2.2. Verify if the items count on the basket icon displays correctly
            cy.get('span.badge.badge-success').invoke('text').then((badgeText) => {
                const displayedCount = parseInt(badgeText.trim(), 10);
                expect(displayedCount).to.equal(itemsCount);
            });

            // 2.3. Navigate to the basket.
            cy.visit('https://sweetshop.netlify.app/basket');

            // 2.4. Verify if items are displayed correctly.
            const expectedLength = Math.floor(itemsCount / 2) + 1;

            cy.get('.list-group-item')
                .should('have.length', expectedLength)
                .each(($img) => {
                    cy.wrap($img)
                        .should('be.visible')
                });

            // 2.5. Delete 1 item from the basket

            cy.get('.small[href="javascript:removeItem(1);"]').eq(0).click();
            // cy.get('.modal').should('be.visible'); 
            // cy.contains('Gerai').click();
            // cy.get('.list-group-item').should('not.exist');

            // cy.get('.small[href="javascript:removeItem(1);"]').eq(1).click();  // did not worked out
            // cy.get('.small[href="javascript:removeItem(1);"]').eq(2).click();  // did not worked out

            // 2.6. Verify if items count on the basket logo basket display correctly.
            cy.get('#basketCount').invoke('text').then((basketText) => {
                const basketCount = parseInt(basketText.trim(), 10);
                expect(basketCount).to.equal(itemsCount - 2); // -2 because each item was added twice
            });

        });
        // 2.8. Delete items from the basket
        cy.visit('https://sweetshop.netlify.app/basket');
        cy.contains('Empty Basket').click();
        cy.get('.list-group').should('not.have.descendants')

    });
});

