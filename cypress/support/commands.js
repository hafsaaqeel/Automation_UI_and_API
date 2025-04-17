import "cypress-file-upload";
import "cypress-wait-until";

Cypress.Commands.add("Base_URL", () => {
  cy.visit("https://www.demoblaze.com/cart.html");
});

Cypress.Commands.add("step", (message) => {
  cy.log(message);
});

