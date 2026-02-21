const LoginPage = require('../support/pageObjects/loginPage')
const ForgotPasswordPage = require('../support/pageObjects/forgotPasswordPage')

describe('Forgot Password Test Cases', () => {

  const loginPage = new LoginPage()
  const forgotPage = new ForgotPasswordPage()

  beforeEach(() => {
  loginPage.visit()
  forgotPage.clickForgotPassword()
})


  it('TC-FOP-01 - Should navigate to forgot password from login page', () => {
    cy.url().should('include', '/auth/requestPasswordResetCode')
  })


  it('TC-FOP-02 - Should display all element from Forgot Password Page', () => {
    forgotPage.usernameInput().should('be.visible')
    forgotPage.resetButton().should('be.visible')
    forgotPage.cancelButton().should('be.visible')
  })


  it('TC-FOP-03 - Should submit forgot password form', () => {
    forgotPage.enterUsername('Admin')
    forgotPage.clickReset()

    cy.contains('Reset Password link sent successfully')
      .should('be.visible')

  })


  it('TC-FOP-04 - Should show error with empty username', () => {
    forgotPage.clickReset()
    forgotPage.requiredMessage().should('be.visible')
  })


  it('TC-FOP-05 - Should cancel password reset and navigate back to login', () => {
    forgotPage.clickCancel()
    cy.url().should('include', '/auth/login')
  })


  it('TC-FOP-06 - Should clear and re-enter username', () => {
    forgotPage.enterUsername('Admin')
    forgotPage.clearUsername()
    forgotPage.enterUsername('Admin')
  })


  it('TC-FOP-07 - Should handle username with spaces', () => {
    
    forgotPage.enterUsername('   Admin   ')
    forgotPage.clickReset()

    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  })


  it('TC-FOP-08 - Should handle case sensitive username', () => {
    forgotPage.enterUsername('admin')
    forgotPage.clickReset()

    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  })


  it('TC-FOP-09 - Should submit form using enter key', () => {
    forgotPage.enterUsername('Admin')
    forgotPage.submitWithEnter()

    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  })

})