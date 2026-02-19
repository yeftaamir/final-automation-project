import LoginPage from '../support/pageObjects/loginPage'
import loginData from '../fixtures/loginData.json'

describe('Login Feature - OrangeHRM', () => {

  beforeEach(() => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.intercept('GET', '**/auth/login').as('loginPage')

    LoginPage.visit()

    cy.wait('@loginPage')
    cy.url().should('include', '/auth/login')

    LoginPage.usernameInput().should('be.visible')
  })

  it('TC-LOG-01: Verification Login Page', () => {

    LoginPage.logo().should('be.visible')
    LoginPage.usernameInput().should('be.visible')
    LoginPage.passwordInput().should('be.visible')
    LoginPage.loginButton().should('be.visible')
    LoginPage.loginTitle().should('be.visible')

  })

  it('TC-LOG-02: Login Success With Valid Credential', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    )

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })


  it('TC-LOG-03: Login Failed If The Password is Incorrect', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login(
      loginData.wrongPassword.username,
      loginData.wrongPassword.password
    )

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', '/auth/login')
  })


  it('TC-LOG-04: Login Failed If The Username is Incorrect', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login(
      loginData.wrongUsername.username,
      loginData.wrongUsername.password
    )

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', '/auth/login')
  })


  it('TC-LOG-05: Validation When Username is Empty', () => {

    LoginPage.inputPassword(loginData.validUser.password)
    LoginPage.clickLogin()

    cy.get('.oxd-input-field-error-message')
      .should('contain.text', 'Required')
  })


  it('TC-LOG-06: Validation When Password is Empty', () => {

    LoginPage.inputUsername(loginData.validUser.username)
    LoginPage.clickLogin()

    cy.get('.oxd-input-field-error-message')
      .should('contain.text', 'Required')
  })


  it('TC-LOG-07: Validation When Both Fields Are Empty', () => {

    LoginPage.clickLogin()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
  })


  it('TC-LOG-08: Password Field Must Be Masked', () => {

    LoginPage.passwordInput()
      .should('have.attr', 'type', 'password')

    LoginPage.inputPassword('admin123')

    LoginPage.passwordInput()
      .invoke('attr', 'type')
      .should('eq', 'password')
  })


  it('TC-LOG-09: Log in by pressing the Enter key', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.inputUsername(loginData.validUser.username)
    LoginPage.inputPassword(loginData.validUser.password)
    LoginPage.pressEnter()

    cy.wait('@loginRequest')

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC-LOG-10: Login Failed When Username and Password Incorrect', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login('WrongUser', 'WrongPass')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LOG-11: Login With Leading or Trailing Spaces', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login('  Admin  ', 'admin123')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-12: Login Failed When Password Contains Leading or Trailing Spaces', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login('Admin', '  admin123  ')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-13: Login Success When Username Is Uppercase', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login('ADMIN', 'admin123')

    cy.wait('@loginRequest')

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOG-14: Login Failed When Password Is Uppercase', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    LoginPage.login('Admin', 'ADMIN123')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-15: Should Navigate Between Fields Using Tab Key', () => {

    LoginPage.usernameInput().focus()

    cy.realPress('Tab')

    LoginPage.passwordInput().should('have.focus')

    cy.realPress('Tab')

    LoginPage.loginButton().should('have.focus')
  })

})