const LoginPage = require('../support/pageObjects/loginPage')
const loginData = require('../fixtures/loginData.json')

describe('Login Feature - OrangeHRM', () => {

  const loginPage = new LoginPage()

  beforeEach(() => {

    cy.intercept('GET', '**/auth/login').as('loginPage')

    loginPage.visit()

    cy.wait('@loginPage')
    cy.url().should('include', '/auth/login')
  })

  it('TC-LOG-01: Verification Login Page', () => {

    loginPage.logo().should('be.visible')
    loginPage.usernameInput().should('be.visible')
    loginPage.passwordInput().should('be.visible')
    loginPage.loginButton().should('be.visible')
    loginPage.loginTitle().should('be.visible')

  })

  it('TC-LOG-02: Login Success With Valid Credential', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    )

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOG-03: Login Failed - Wrong Password', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login(
      loginData.wrongPassword.username,
      loginData.wrongPassword.password
    )

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-04: Login Failed - Wrong Username', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login(
      loginData.wrongUsername.username,
      loginData.wrongUsername.password
    )

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-05: Validation When Username Empty', () => {

    loginPage.enterPassword(loginData.validUser.password)
    loginPage.clickLogin()

    cy.contains('Required').should('be.visible')
  })

  it('TC-LOG-06: Validation When Password Empty', () => {

    loginPage.enterUsername(loginData.validUser.username)
    loginPage.clickLogin()

    cy.contains('Required').should('be.visible')
  })

  it('TC-LOG-07: Validation When Both Fields Empty', () => {

    loginPage.clickLogin()

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
  })

  it('TC-LOG-08: Password Field Must Be Masked', () => {

    loginPage.passwordInput()
      .should('have.attr', 'type', 'password')
  })

  it('TC-LOG-09: Login Using Enter Key', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.enterUsername(loginData.validUser.username)
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.pressEnter()

    cy.wait('@loginRequest')

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOG-10: Login Failed - Both Incorrect', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login('WrongUser', 'WrongPass')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-11: Login With Leading/Trailing Spaces in Username', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login('  Admin  ', 'admin123')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-12: Login With Leading/Trailing Spaces in Password', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login('Admin', '  admin123  ')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-13: Login Success When Username Uppercase', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login('ADMIN', 'admin123')

    cy.wait('@loginRequest')

    cy.url().should('include', '/dashboard')
  })

  it('TC-LOG-14: Login Failed When Password Uppercase', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.login('Admin', 'ADMIN123')

    cy.wait('@loginRequest')

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC-LOG-15: Navigate Between Fields Using Tab', () => {

    loginPage.usernameInput().focus()
    cy.realPress('Tab')

    loginPage.passwordInput().should('have.focus')

    cy.realPress('Tab')

    loginPage.loginButton().should('have.focus')
  })

})