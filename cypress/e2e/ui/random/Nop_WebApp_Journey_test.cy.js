/// <reference types= "cypress"/>

const toTitleCase = (temp_str) => {
    return temp_str.replace(/\w\S*/g, (str)=>{
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    });
}

describe("Verify the buyer buying journey for a cellphone", ()=>{
    let testData = null;
    before(()=>{
        cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage();
        cy.viewport('ipad-mini');
        cy.fixture('demo_store_test_data').then((payload)=>{
            testData = payload;
        });
    });
    after(()=>{
        cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage();
    });

    beforeEach(()=>{
        cy.visit(testData.base_url);
        cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage();
    });
    it("Verify the home page title and welcome message", ()=>{
        cy.title().should('eq' ,testData.title);
        cy.get(`.topic-block-title`, {timeout: 5000}).children('h2').should('have.text', 'Welcome to our store');
    });
    it("Search the product and buy it", ()=>{
        cy.get('#small-searchterms').clear().type(testData.product);
        cy.get('#small-search-box-form').children('.button-1').click();
        cy.get('.product-title').children('a').should('have.attr', 'href', "/" + testData.product_name.replaceAll(" ", "-")).click();
        cy.get('.product-name').children('h1').should('have.text', toTitleCase(testData.product_name));
        cy.get('.product-price > span').contains(testData.currency).contains(testData.product_price);
        cy.get('#add-to-cart-button-20').should('be.enabled').click();
        cy.get('#bar-notification').children('div').first('p').should('have.text', 'The product has been added to your shopping cart');
        cy.get('#bar-notification').children('div').children('span').should('have.class', 'close').click();
        cy.get('.ico-cart').children('span').first().should('have.text', 'Shopping cart');
        cy.get('.ico-cart').children('span').last().should('have.text', '(1)').trigger('mousemove').click({force: true});
        cy.get('.page-title > h1').should('have.text', 'Shopping cart');
        cy.get('.product-name').should('have.attr', 'href', "/" + testData.product_name.replaceAll(" ", "-"))
        .should('have.text', toTitleCase(testData.product_name));
        cy.get('.quantity > input').clear().type(testData.purchase_unit);
        cy.get('#updatecart').should('be.enabled').click();
        cy.get('.product-subtotal').invoke('text').then((data)=>{
            expect(parseFloat(1047.00)).to.eq(testData.product_price * testData.purchase_unit);
        });
        cy.get('.value-summary > strong').contains(testData.currency);
        cy.get('#checkout').should('be.enabled').click();
        // cy.get('.ui-dialog-titlebar').should('be.visible').should('have.text', 'Terms of service');
        cy.get('#terms-of-service-warning-box > p').should('have.text', 'Please accept the terms of service before the next step.');
        cy.get('.ui-button').should('be.enabled').click();
        cy.get('#termsofservice').check();
        cy.get('#checkout').should('be.enabled').click();
        cy.get('.page-title > h1').should('have.text', 'Welcome, Please Sign In!');
    });
});