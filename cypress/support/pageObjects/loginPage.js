class LoginPage {

  usernameInput() {
    return cy.get('input[name="username"]')
  }

  passwordInput() {
    return cy.get('input[name="password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  logo() {
    return cy.get('.orangehrm-login-branding')
  }

  loginTitle() {
    return cy.contains('Login')
  }

  visit() {
    cy.visit('/web/index.php/auth/login')
  }

  inputUsername(username) {
    this.usernameInput().should('be.visible').clear().type(username)
  }

  inputPassword(password) {
    this.passwordInput().should('be.visible').clear().type(password)
  }

  clickLogin() {
    this.loginButton().click()
  }

  pressEnter() {
    this.passwordInput().type('{enter}')
  }

  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }
}

export default new LoginPage()