class DashboardPage {
  constructor() {
    this.signUpBtn = () => cy.get("#signin2");
    this.userName = () => cy.get("#sign-username");
    this.password = () => cy.get("#sign-password");
    this.signUp = () => cy.get("button.btn.btn-primary").contains("Sign up");
    this.closeBtn = () => cy.get('.modal-footer button[data-dismiss="modal"]').eq(1);
    this.closeBtnSignIn = () => cy.get('.modal-footer button[data-dismiss="modal"]').eq(2);
    this.loginBtn = () => cy.get('#login2')
    this.loginUserName=() => cy.get('#loginusername');
    this.loginPassword=() => cy.get('#loginpassword')
    this.login = () => cy.get("button.btn.btn-primary").contains("Log in");
    this.nameOfUser = () => cy.get('#nameofuser');
    this.firstProduct = () =>  cy.get('.card-block').eq(0).find('a')
    this.secondProduct = () =>  cy.get('.card-block').eq(1).find('a')
    this.thirdProduct = () =>  cy.get('.card-block').eq(2).find('a')
    this.homeBtn = () => cy.get('.active > .nav-link');
    this.cartBtn = () => cy.get('#cartur')
  }

  signUpAndSignIn(username, password) {
    const randomString = Math.random().toString(36).substring(2, 6); 
    const newUsername = username + randomString;  
    console.log(newUsername)
    this.signUpBtn().click();
    cy.wait(1000)
    this.userName().clear().type(newUsername);
    this.password().clear().type(password);
    this.signUp().click();
    this.loginBtn().click()
    cy.wait(1000)
    this.loginUserName().clear().type(newUsername);
    this.loginPassword().clear().type(password);
    this.login().click()
  }


  registerUser(username, password) {
    this.signUpBtn().click();
    cy.wait(1000)
    this.userName().clear().type(username);
    this.password().clear().type(password);
    this.signUp().click();
  }

  signInUser(userName,password){
    this.loginBtn().click()
    cy.wait(1000)
    this.loginUserName().clear().type(userName);
    this.loginPassword().clear().type(password);
    this.login().click()
  }
}  

export default new DashboardPage();
