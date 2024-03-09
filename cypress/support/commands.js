// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to to do login on course bay app
Cypress.Commands.add("loginOnCourseBay", (username, password)=>{
    cy.get('.MuiTypography-h5').contains("Sign in");
    cy.get('#email').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('.PrivateSwitchBase-input').click();
    cy.get('.MuiButton-root').contains('Sign In').click();
});
// Cutom command to verify landing page items
Cypress.Commands.add("landingPageItems", ()=>{
    cy.get('.MuiTypography-h2').contains("The Learning Curve");
    cy.get('.MuiButton-contained').contains("Login");
    cy.get('.MuiButton-outlined').contains("Register");
    cy.get('.MuiTypography-h5 > .MuiTypography-root').contains("info@thelearningcurve.com");
});

// command to click button on nop
Cypress.Commands.add("clickNopButtons", (buttonTitle)=>{
    cy.get('.frontend-button > .button-text').should("have.text", buttonTitle).click();
});

// command to compare title case string
Cypress.Commands.add("toTitleCase", (temp_str)=>{
    return temp_str.replace(/\w\S*/g, (str)=>{
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    })
});