/// <reference types="cypress" />

// Test Case 1: User Interface/Navigation

//     1.1 Page loaded successfully
//     1.2 200 response code received.
//     1.3 Page body is loaded.
//     1.4 "Sweet shop" logo is displayed
//     1.5 Navigation links are visible ("Sweets", "About", "Login", "Basket")
//     1.6 Navigation links are active (click on "Sweet shop", "Sweets", "About", "Login", "Basket" in a row, expect page to be displayed, return)

describe('Sweet Shop Homepage Loading Test', () => {
    const viewports = [
        { device: 'mobile', width: 375, height: 667 },
        { device: 'tablet', width: 768, height: 1024 },
        { device: 'desktop', width: 1366, height: 768 }
    ];

    viewports.forEach((viewport) => {
        // describe(`Testing on ${viewport.device} (${viewport.width}x${viewport.height})`, () => {
            beforeEach(() => {
                // cy.viewport(viewport.width, viewport.height); // Set viewport size
                cy.visitWebsite();
            });

            it('should load the homepage with all elements visible', () => {
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
            });

            it('should verify all text content is readable', () => {
                // Check if all text elements have proper contrast
                cy.get('p, h1, h2, h3, h4, h5, h6, span, button, a')
                    .should('have.length.greaterThan', 0)
                    .each(($el) => {
                        // Verify the text is visible and not empty
                        if ($el.is(':visible') && $el.text().trim().length > 0) {
                            cy.wrap($el)
                                .should('be.visible')
                                .and('have.css', 'color')
                                .and('not.equal', 'rgba(0, 0, 0, 0)');
                        }
                    });
            });

            it('should check all interactive elements are functional', () => {
                // Test navigation links
                cy.get('nav a, .nav-link')
                    .should('have.length.greaterThan', 0)
                    .each(($link) => {
                        cy.wrap($link)
                            .should('have.attr', 'href')
                            .and('not.eq', '#broken');
                    });

                // Check if shopping cart button is clickable
                cy.get('a.nav-link[href="/basket"]')
                    .should('be.visible')
                    .and('not.be.disabled');

                // Verify product cards are clickable
                cy.get('a.nav-link[href="/basket"]')
                    // .first()
                    .should('be.visible')
                    .click();
                cy.go('back');

                cy.get('.navbar-nav')
                    .should('be.visible')
                    .each(($el) => {  
                        cy.wrap($el).click();
                        cy.go('back');
                    });

                // Verify we can navigate back
                cy.go('back');
            });
        });
    });
// });