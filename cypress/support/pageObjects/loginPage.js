class LoginPage {

  visit() {
    cy.visit('/web/index.php/auth/login')
  }

  usernameInput() {
    return cy.get('input[name="username"]')
  }

  passwordInput() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  enterUsername(username) {
    this.usernameInput().clear().type(username)
  }

  enterPassword(password) {
    this.passwordInput().clear().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }
}

module.exports = LoginPage 
