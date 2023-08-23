/// <reference types = "cypress"/>

describe("Store demo sanity", ()=>{
    let testData = {};
    before(()=>{
        cy.fixture("nopCommerece").then((payload)=>{
            testData = payload;
        });
        cy.viewport("macbook-16");
        cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage().clearLocalStorage();
    });
    after(()=>{
        cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage().clearLocalStorage();
    });
    beforeEach(()=>{
        cy.visit(testData.base_url_ui);
        cy.get(".page-title > h1").contains("Store Demo");
    });
    it("Validate the store landing page", ()=>{
        cy.url().should('eq', testData.base_url_ui);
        cy.get('.admin-button > .button-text').should('have.text', 'Admin area');
        cy.get('.frontend-button > .button-text').should('have.text', 'Frontend');
    });
    it("Validate the store url and it's attributes", ()=>{
        // Validate that we are on the correct URL, with all params set to default values (empty)
        cy.location().should((location)=>{
            expect(location.hash).to.be.empty,
            expect(location.href).to.eq(testData.base_url_ui),
            expect(location.host).to.eq("www.nopcommerce.com");
            expect(location.hostname).to.eq("www.nopcommerce.com"),
            expect(location.origin).to.eq("https://www.nopcommerce.com"),
            expect(location.pathname).to.eq("/en/demo"),
            expect(location.port).to.eq(''),
            expect(location.protocol).to.eq("https:"),
            expect(location.search).to.be.empty
        });
    });
    it.skip("Navigate to frontend of site", ()=>{
        cy.get(".frontend-button", {timeout: 5000}).should("have.attr", "target", "_blank").contains("Frontend").invoke("removeAttr", "target").click();

        //cy.clickNopButtons("Frontend");
        // cy.window().then((win)=>{
        //     expect(win).to.exist; // make sure we have a window object available
        //     const winLocationHref = Cypress.dom.getElements(win)[0].location.href;// get location href from new window
        //     const winLocation = win.location.href;// get current url from within the browser context (in this case, Cypress)
        //     cy.log(winLocation, winLocationHref);
        //     cy.get(".topic-block-title > h2").should("have.text", "Welcome to our store");
        // });
        cy.get(".topic-block-title > h2").should("have.text", "Welcome to our store");
    });
});