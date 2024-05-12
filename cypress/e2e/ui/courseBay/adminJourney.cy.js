/// <reference types="cypress"/>

describe("Test the admin flow on course bay web app", ()=>{
    let testData = null;
    before(()=>{
        cy.fixture('courseBay_test_data').then((payload)=>{
            testData = payload;
            cy.viewport("macbook-16");
            cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage();
        });
    });
    beforeEach(()=>{
        cy.visit(testData.admin_site);
        cy.get('.MuiTypography-h2').contains("The Learning Curve");
    });
    describe("Positive Testing", ()=>{
        it("Check landing page", ()=>{
            cy.landingPageItems();
        });
        it("Navigate to login page and validate it", ()=>{
            cy.get('.MuiButton-contained').contains("Login").click();
            cy.loginOnCourseBay(testData.credentials.username, testData.credentials.password);
        });
        it("Logout and navigate back to home page", ()=>{
            cy.get('.MuiButton-contained').contains("Login").click();
            cy.loginOnCourseBay(testData.credentials.username, testData.credentials.password);
            cy.get('.MuiToolbar-root > .MuiButton-root').should('have.text', 'Log out').click();
            cy.landingPageItems();
        });
    });
    describe("Negative Testing", ()=>{
        it("User should not be able to login with invalid creds", ()=>{
            cy.get('.MuiButton-contained').contains("Login").click();
            cy.loginOnCourseBay(testData.invalid_credentials.username, testData.invalid_credentials.password);
            cy.on('window:alert', (t)=>{
                expect(t).to.eq("Invalid username or password");
            });
            cy.on('window:alert', (t) => {
                expect(t);
            });
        });
    });
   
});