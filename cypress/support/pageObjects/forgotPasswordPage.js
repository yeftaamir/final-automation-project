class ForgotPasswordPage {

  // ====== LOCATORS ======
  usernameInput() {
    return cy.get('input[name="username"]')
  }

  resetButton() {
    return cy.get('button[type="submit"]')
  }

  cancelButton() {
    return cy.contains('button', 'Cancel')
  }

  forgotPasswordLink() {
    return cy.contains('p', 'Forgot your password?')
  }

  successMessage() {
    return cy.contains('Reset Password link sent successfully')
  }

  requiredMessage() {
    return cy.contains('Required')
  }

  // ====== INTERCEPT ======
  interceptResetRequest() {
    cy.intercept('POST', '**/auth/sendPasswordReset').as('resetRequest')
  }


  // ====== ACTIONS ======
  clickForgotPassword() {
    this.forgotPasswordLink().click()
  }

  enterUsername(username) {
    this.usernameInput().clear().type(username)
  }

  clickReset() {
    this.resetButton().click()
  }

  clickCancel() {
    this.cancelButton().click()
  }

  submitWithEnter() {
    this.usernameInput().type('{enter}')
  }

  clearUsername() {
    this.usernameInput().clear()
  }
}

module.exports = ForgotPasswordPage  