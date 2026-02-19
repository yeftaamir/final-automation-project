const LoginPage = require('../support/pageObjects/loginPage')
const DirectoryPage = require('../support/pageObjects/directoryPage')

describe('Directory OrangeHRM Test Cases', () => {

  const loginPage = new LoginPage()
  const directoryPage = new DirectoryPage()

  beforeEach(() => {
    cy.session('loginSession', () => {
      loginPage.visit()
      loginPage.enterUsername('Admin')
      loginPage.enterPassword('admin123')
      loginPage.clickLogin()
      cy.url().should('include', '/dashboard')
    })

    cy.visit('/web/index.php/directory/viewDirectory')

    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('directorySearch')

  })


  it('TC-DIR-01 : Should display all directory page elements', () => {
    directoryPage.employeeNameInput().should('be.visible')
    directoryPage.jobTitleDropdown().should('be.visible')
    directoryPage.locationDropdown().should('be.visible')
    directoryPage.searchButton().should('be.visible')
    directoryPage.resetButton().should('be.visible')
  })

  it('TC-DIR-02 : Should search all employees (empty search)', () => {
    directoryPage.clickSearch()

    cy.wait('@directorySearch')

    directoryPage.employeeCards()
      .should('have.length.greaterThan', 0)

  })

  it('TC-DIR-03 : Should show job title dropdown options', () => {
    directoryPage.jobTitleDropdown().click()

    cy.get('.oxd-select-dropdown')
      .should('be.visible')

    cy.get('.oxd-select-option')
      .should('have.length.greaterThan', 1)

    cy.contains('.oxd-select-option', 'Software Engineer')
      .should('exist')

  })


  it('TC-DIR-04 : Should show location dropdown options', () => {
    directoryPage.locationDropdown().click()

    cy.get('.oxd-select-option')
      .should('have.length.greaterThan', 1)

  })

  it('TC-DIR-05 : Should verify form labels and placeholders', () => {
    cy.contains('label', 'Employee Name').should('be.visible')
    cy.contains('label', 'Job Title').should('be.visible')
    cy.contains('label', 'Location').should('be.visible')

    directoryPage.employeeNameInput()
      .should('have.attr', 'placeholder', 'Type for hints...')

  })

  it('TC-DIR-06 : Should display employee directory by default', () => {
    cy.wait('@directorySearch')
      .its('response.statusCode')
      .should('eq', 200)

    directoryPage.employeeCards()
      .should('have.length.greaterThan', 0)

  })

  it('TC-DIR-07 : Should search employee by name', () => {
    directoryPage.enterEmployeeName('Timothy Lewis Amiano')
    directoryPage.clickSearch()

    cy.wait('@directorySearch')
    .its('response.body.data')
    .should('have.length.greaterThan', 0)

    directoryPage.employeeCards().should('exist')

  })

  it('TC-DIR-08 : Should reset search filters', () => {
    directoryPage.enterEmployeeName('Timothy Lewis Amiano')
    directoryPage.clickSearch()

    cy.wait('@directorySearch')

    directoryPage.clickReset()

    cy.wait('@directorySearch')

    directoryPage.employeeNameInput()
      .should('have.value', '')
  })

  it('TC-DIR-09 : Should filter by job title only', () => {

    directoryPage.jobTitleDropdown().click()
    cy.contains('.oxd-select-option', 'Software Engineer').click()

    directoryPage.clickSearch()

    cy.wait('@directorySearch')

    cy.contains(/Software Engineer/i).should('be.visible')

  })

  it('TC-DIR-10 : Should filter by location only', () => {
    directoryPage.locationDropdown().click()
    cy.contains('.oxd-select-option', 'New York Sales Office').click()

    directoryPage.clickSearch()

    cy.wait('@directorySearch')

    directoryPage.employeeCards()
      .should('have.length.greaterThan', 0)

  })

  it('TC-DIR-11 : Should handle combined search criteria', () => {
    directoryPage.employeeNameInput()
      .clear()
      .type('Russ', { delay: 100 })

    cy.get('.oxd-autocomplete-option')
      .should('be.visible')

    cy.contains('.oxd-autocomplete-option', 'Russel Hamilton')
      .click()

    directoryPage.jobTitleDropdown().click()
    cy.contains('.oxd-select-option', 'Software Engineer').click()

    directoryPage.clickSearch()

    cy.wait('@directorySearch')
      .its('response.body.data')
      .should('have.length.greaterThan', 0)

    cy.contains(/Russel Hamilton/i).should('be.visible')
    cy.contains(/Software Engineer/i).should('be.visible')
  })
})