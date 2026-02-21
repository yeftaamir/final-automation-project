class LoginPage {

  visit() {
    cy.visit('/web/index.php/auth/login')
  }

  logo() {
    return cy.get('.orangehrm-login-branding')
  }

  loginTitle() {
    return cy.contains('Login')
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

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
  }

  pressEnter() {
    this.passwordInput().type('{enter}')
  }
}

module.exports = LoginPage