import globalInput from "../../enum/enum";
import AddToCartPage from "../pages/AddToCartPage";
import DashboardPage from "../pages/DashboardPage";

beforeEach(() => {
  cy.visit("https://www.demoblaze.com/index.html");
});

it("Create an account and SignIn", () => {
  cy.step("Register existing user");
  DashboardPage.registerUser(
    globalInput.registeredUsername,
    globalInput.registeredPassword
  );

  cy.step("Check If user isn't registered");
  DashboardPage.closeBtn().should("be.visible");

  cy.step("Close the popUp");
  DashboardPage.closeBtn().click();

  // ------------------ Negative Tests ------------------
  cy.step("Login Wrong User");
  DashboardPage.signInUser(
    globalInput.registeredUsername,
    globalInput.wrongPassword
  );

  cy.step("Check If user can't login");
  DashboardPage.closeBtnSignIn().should("be.visible");

  cy.step("Close the popUp");
  DashboardPage.closeBtnSignIn().click();

  DashboardPage.signUpAndSignIn(
    globalInput.signUpUsername,
    globalInput.signUpPassword
  );

  cy.step("Assert if the user is Logged In");
  DashboardPage.nameOfUser().should("be.visible");

  cy.step("Select first product");
  DashboardPage.firstProduct().click();

  cy.step("Check if Add to Cart page is opened and then click");
  AddToCartPage.addToCartBtn().should("be.visible");
  AddToCartPage.addToCartBtn().click();

  cy.step("Go back to home page and add second product");
  DashboardPage.homeBtn().click();
  DashboardPage.secondProduct().click();
  AddToCartPage.addToCartBtn().should("be.visible");
  AddToCartPage.addToCartBtn().click();

  cy.step("Go back to home page and add third product");
  DashboardPage.homeBtn().click();
  DashboardPage.thirdProduct().click();
  AddToCartPage.addToCartBtn().should("be.visible");
  AddToCartPage.addToCartBtn().click();

  cy.step("Open Cart");
  DashboardPage.cartBtn().click();

  cy.step("Check If Cart is open");
  cy.wait(1500);
  AddToCartPage.placeOrderBtn().should("be.visible");

  cy.step("Validate Total Amount");
  AddToCartPage.totalAmount() // Get the total amount element
    .invoke("text") // Extract the text content
    .then((initialTotal) => {
      cy.wrap(initialTotal).as("initialTotalAmount"); // Save the initial total amount in an alias
      cy.log(`Initial total amount: ${initialTotal}`); // Log the initial total amount
    });
  cy.step("Delete First Product");
  AddToCartPage.deleteBtn().click();

  cy.wait(2500); // Wait for the change to reflect (or replace with a better strategy like cy.waitUntil())

  cy.step("Validate Total Amount is changed");
  AddToCartPage.totalAmount() // Get the total amount again
    .invoke("text") // Extract the new total amount text content
    .then((newTotal) => {
      cy.get("@initialTotalAmount").then((initialTotal) => {
        // Assert that the new total is different from the initial total
        expect(newTotal).to.not.equal(initialTotal);
        cy.log(`New total amount after delete: ${newTotal}`); // Log the new total amount
        console.log(`New total amount after delete: ${newTotal}`); // Log to the browser console
      });
    });

  cy.step("Place Order");
  AddToCartPage.placeOrderBtn().click();
  AddToCartPage.placeOrder(
    globalInput.name,
    globalInput.country,
    globalInput.city,
    globalInput.creditCard,
    globalInput.month,
    globalInput.year
  );

  cy.step("Success Message Assert");
  AddToCartPage.SuccessMessage().should("be.visible");

  cy.step("Click on Ok Button");
  cy.wait(600);
  AddToCartPage.okayBtn().click();

  cy.step("Make Sure that OK button isn't present anymore");
  AddToCartPage.okayBtn().should("not.exist");
});
