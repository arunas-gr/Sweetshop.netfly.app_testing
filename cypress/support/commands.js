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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitWebsite', () => {
    cy.visit('https://sweetshop.netlify.app/');
    cy.url().should('eq', 'https://sweetshop.netlify.app/');
    cy.get('body').should('be.visible');
})

Cypress.Commands.add('addProducts', (quantityOfEachProduct) => {
    cy.visitWebsite();
    cy.get('a.btn.btn-primary.btn-lg.sweets').click();
    let itemsCount = 0;

    for (let i = 0; i < quantityOfEachProduct; i++) {
        cy.contains('Sweets').click();

        cy.get('.btn-success').each(($button) => {
            cy.wrap($button).click();
            itemsCount += 1;
            cy.wait(100); // Imitating human behavior
        })
    }

    cy.then(() => {
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

    });
})

Cypress.Commands.add('clientData', () => {

    cy.get('label[for="firstName"]').parent().find('input').type('Petras');
    cy.get('label[for="lastName"]').parent().find('input').type('Antrasis');
    cy.get('#email').type('saldaniu.valgytojas@dantisto-kabinetas.ly');
    cy.get('#address').type('Cukraus al. 68');
    cy.get('#address2').type('1 butas');
    cy.get('#country').select('United Kingdom');
    cy.get('#city').select('Swansea');
    cy.get('#zip').type('SA1 1AA');
    cy.get('#cc-name').type('Petras Antrasis');
    cy.get('#cc-number').type('1234 5678 9012 3456');
    cy.get('#cc-expiration').type('12/25');
    cy.get('#cc-cvv').type('123');
    cy.get('button.btn.btn-primary.btn-lg.btn-block')
        .contains('Continue to checkout')
        .click();
})

Cypress.Commands.add('verifyCorrectDisplay', () => {
    // Check if the page title
    cy.request('https://sweetshop.netlify.app/').its('status').should('eq', 200);
    cy.title().should('include', 'Sweet Shop');

    // Check if the header/navigation is visible
    cy.get('header').should('be.visible');
    cy.get('nav').should('be.visible');

    // Check if logo is visible and loaded
    cy.get('.navbar-brand, img[src="favicon.png"]')
        .should('be.visible')
        .its('length').should('be.gt', 0);

    // Check if main heading text is visible
    cy.get('h1, .main-heading').should('be.visible');

    // Check if promotional text is displayed
    cy.get('body > div > p > span').should('exist').and('be.visible')
    cy.get('body > div > p > span').should('have.text', 'Our most popular choice of retro sweets.');

    // Check if  all product images are loaded
    cy.get('.row')
        .should('have.length.greaterThan', 0)
        .each(($img) => {
            // For each image, verify it has loaded
            cy.wrap($img)
                .should('be.visible')
            // .and(($image) => {
            //   expect($image[0].naturalWidth).to.be.greaterThan(0);
            // }); // - kodėl neveikia?
        });

    // Check for product titles/names
    cy.get('.row .card-body h4')
        .each(($el) => {
            cy.wrap($el).should('not.be.empty');
        });

    // Check if  product prices are visible
    cy.get('.row p')
        .each(($el) => {
            cy.wrap($el).should('not.be.empty');
            // cy.wrap($el).should('contain', '£'); // kažkur klaida
        });

    // Check if footer is visible
    cy.get('footer').should('be.visible');

    // Verify cart icon is visible
    cy.get('a.nav-link[href="/basket"]').should('be.visible').and('contain', 'Basket');

    // Test for any broken images
    cy.get('img').each(($img) => {
        cy.wrap($img).should(($image) => {
            expect($image[0].naturalWidth).to.be.greaterThan(0);
        });
    });
})

Cypress.Commands.add('checkSorting', (locationToCheck) => {
    cy.get('#transactions tbody tr').should('have.length', 3);

    // Sort by "Order Number"
    it('checks if the rows are sorted after clicking on Order Number', () => {
        // Capture the initial order of the rows
        cy.get('#transactions tbody tr').then(($rows) => {
            const initialRows = $rows.map((index, row) => {
                return Cypress.$(row).find('th').text();
            }).get();

            // Click on the sorting parameter header to trigger sorting
            cy.get(locationToCheck).click();
            cy.wait(500); // Wait for sorting to complete

            // Verify that the order has changed
            cy.get('#transactions tbody tr').then(($newRows) => {
                const newRows = $newRows.map((index, row) => {
                    return Cypress.$(row).find('th').text();
                }).get();

                // Assert that the initial and new rows are different (i.e., they have been sorted)
                expect(initialRows).to.not.deep.equal(newRows);
            });
        });
    });
})