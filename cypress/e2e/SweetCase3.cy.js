// Test Case 3. Shopping Cart

// 1. Test adding items to the cart
// 2. Verify cart updates when adding multiple items
// 3. Test updating quantity in the cart
// 4. Test removing items from the cart
// 5. Verify cart persists after page refresh
// 6. Test "continue shopping" functionality
// 7. Verify cart calculations are correct (subtotal, taxes, shipping, etc.) - bug - standard shipping - 142.99 GBP instead of 1.99

// 3. Dispaly on "Sweets" page visual test
//     3.1. Go to 'https://sweetshop.netlify.app/sweets'
//     3.2. Verify page is visible
//     3.3. Verify if each product has diplayed image, name, description, price

/// <reference types="cypress" />

describe('Add All Items and Calculate Total Price', () => {
    it('click each "Add to Basket" button and calculate the total', () => {
        let totalPrice = 0;
        cy.visitWebsite();
        cy.get('a.btn.btn-primary.btn-lg.sweets').click();

        // Clicking on every product
        cy.get('.card').each(($card) => {
            // Extracting the price from <p><small class="text-muted">£X.XX</small></p>
            const priceText = $card.find('p small.text-muted').text().replace('£', '').trim();
            const price = parseFloat(priceText); // Convert string price to float

            // Click the "Add to Basket" button
            cy.wrap($card).find('.btn-success').click();

            // Add to total price
            totalPrice += price;
        }).then(() => {
            // Log the total price after clicking all buttons
            cy.log(`Total Price: £${totalPrice.toFixed(2)}`);
        });

    });

    it('Test 3.4. delete single item from the cart', () => {
    cy.addProducts(5);
            cy.visit('https://sweetshop.netlify.app/basket');
            cy.get('basketItems')
                .contains('h6.my-0') // Find the item by index
                .parent() 
                .find('a.small')
                .click();
        });
    });

    it('Test case 3.5. delete all items from the cart', () => {
        cy.addProducts(2);
    });

// describe('Test Case 2: Add product to cart', () => {
//     it('add product to cart', () => {
//         cy.visit('https://sweetshop.netlify.app/');
//         cy.contains('Sweets').click();
//         // Įdedam į krepšį po du kiekvienos rūšies saldainius
//         cy.get('.btn btn-success btn-block addItem').each(($button) => {
//             if ($button.text().includes('Add to basket')) {
//                 cy.wrap($button).click();
//                 cy.wait(300); // palaukiam - suimituojam gyvo žmogaus elgesį
//                 cy.wrap($button).click();
//                 cy.wait(300); // palaukiam - suimituojam gyvo žmogaus elgesį
//             }
//         });
//     });
// })

// describe('Sweet Shop - Add to Basket', () => {
//     beforeEach(() => {
//       // Visit the sweet shop website
//       cy.visit('https://sweetshop.netlify.app/sweets');

//       // Wait for the page to fully load
//       cy.contains('Our Sweets', { timeout: 10000 }).should('be.visible');
//     });

//     it('should click on all "Add to Basket" buttons', () => {
//       // First, verify that products are loaded
//       cy.get('.sweet-item', { timeout: 10000 }).should('have.length.gt', 0);

//       // Find all add to basket buttons with proper selector
//       // Using case-insensitive matching and more flexible selection
//       cy.get('.sweet-item button', { timeout: 10000 })
//         .each(($button) => {
//           // Check if this button contains the text (case insensitive)
//           const buttonText = $button.text().toLowerCase();
//           if (buttonText.includes('add to basket') || buttonText.includes('add to cart')) {
//             // Log the sweet being added (for debugging)
//             cy.wrap($button)
//               .parents('.sweet-item')
//               .find('.sweet-name')
//               .then(($name) => {
//                 cy.log(`Adding "${$name.text()}" to basket`);
//               });

//             // Click the button
//             cy.wrap($button).click();

//             // Wait a moment between clicks
//             cy.wait(500);
//           }
//         });

//       // Optional: Verify that items were added to the basket
//       // This will depend on the actual structure of the page
//       cy.get('.basket').should('exist');
//     });
//   });

// describe('Test Case 4.1.: remove one item from the cart', () => {
//     it('delete items from the cart', () => {
//         cy.visit('https://sweetshop.netlify.app/basket');
//         cy.get('basketItems')
//         .contains('h6.my-0') // Find the item by name
//         .parent() // Get the parent <div>
//         .find('a.small') // Locate the "Delete Item" button inside the same div
//         .click();
//     });
// });

// describe('Test Case 4.2: delete all items from the cart', () => {
//     it('delete items from the cart', () => {
//         cy.visit('https://sweetshop.netlify.app/basket');
//     });
// });
