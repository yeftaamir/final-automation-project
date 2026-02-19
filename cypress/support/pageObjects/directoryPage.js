class DirectoryPage {

  directoryMenu() {
    return cy.contains('span', 'Directory')
  }

  employeeNameInput() {
    return cy.get('input[placeholder="Type for hints..."]')
  }

  jobTitleDropdown() {
    return cy.get('.oxd-select-text').eq(0)
  }

  locationDropdown() {
    return cy.get('.oxd-select-text').eq(1)
  }

  searchButton() {
    return cy.contains('button', 'Search')
  }

  resetButton() {
    return cy.contains('button', 'Reset')
  }

  employeeCards() {
    return cy.get('.orangehrm-directory-card')
  }

  noRecordMessage() {
    return cy.contains('No Records Found')
  }

  // ACTIONS
  clickDirectoryMenu() {
    this.directoryMenu().click()
  }

  enterEmployeeName(name) {
    this.employeeNameInput().clear().type(name)
  }

  clickSearch() {
    this.searchButton().click()
  }

  clickReset() {
    this.resetButton().click()
  }

}

module.exports = DirectoryPage