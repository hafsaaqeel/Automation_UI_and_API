class addToCartPage {
  constructor() {
    this.addToCartBtn = () =>
      cy.get("a.btn.btn-success").contains("Add to cart");
    this.totalAmount = () => cy.get("#totalp");
    this.deleteBtn = () => cy.get("a").contains("Delete").first();
    this.placeOrderBtn = () =>
      cy.get("button.btn.btn-success").contains("Place Order");
    this.nameField = () => cy.get("#name");
    this.country = () => cy.get("#country");
    this.city = () => cy.get("#city");
    this.creditCard = () => cy.get("#card");
    this.month = () => cy.get("#month");
    this.year = () => cy.get("#year");
    this.purchaseBtn = () =>
      cy.get("button.btn.btn-primary").contains("Purchase");
    this.SuccessMessage = () => cy.get(".sweet-alert > h2");
    this.okayBtn = () => cy.get(".confirm");
  }

  placeOrder(name, country, city, creditCard, month, year) {
    this.nameField().type(name);
    this.country().type(country);
    this.city().type(city);
    this.creditCard().type(creditCard);
    this.month().type(month);
    this.year().type(year);
    this.purchaseBtn().click();
  }
}

export default new addToCartPage();
