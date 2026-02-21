# Cypress Automation Testing - OrangeHRM
OrangeHRM is a web-based Human Resource Management System (HRMS) application used to manage human resource data and processes within a company.

## 🚀 Overview
In this project, I performed automation testing using Cypress with the following best practice approach:

1️⃣ Using Page Object Model (POM)
The testing structure is separated based on pages to improve:
1. Maintainability
2. Reusability
3. Clean code structure

2️⃣ Using Intercept for API Validation
I used Intercept to:
1. Capture API requests during login and employee searches
2. Synchronize tests with backend responses
3. Ensure response status and data are correct
4. This approach makes tests more stable and less flaky.

## Feature
In this automation project, testing focuses on:
✅ Login Feature - 15 Test Cases
- Valid login
- Invalid login validation
- Error message verification

✅ Forgot Password - 9 Test Cases
- Redirect to reset page
- Send username
- Success message validation

✅ Directory Feature - 11 Test Cases
- Display all page elements
- Verify dropdown options
- Search for employees (by name)
- Filter by position
- Filter by location
- Combined search criteria
- Reset filters
- Validate default employee display

##💡 Objectives of This Automation Project
This project aims to:
- Test the stability of OrangeHRM's key features.
- Implement best practice automation (POM + Intercept).
- Improve reliability testing with API synchronization.
- Create a scalable and interview-ready automation suite.

##🏆 Conclusion
Through this project, I successfully:
- Implemented Cypress-based automation testing
- Used the Page Object Model architecture
- Integrated intercepts for API validation
- Created a structured and maintainable test suite