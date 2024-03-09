///  <reference types="cypress"/>




describe("Search Property on ibapi", ()=>{
    var baseURL = null;
    const payload = {
        "key_val": [
          [
            "property",
            "'P1'"
          ],
          [
            "Bank",
            "'PUNJAB NATIONAL BANK'"
          ],
          [
            "State",
            "'UP'"
          ],
          [
            "property",
            "'P1'"
          ],
          [
            "period",
            "'202312'"
          ]
        ]
      }
    before(()=>{
        cy.fixture('ibapi').then((payload)=>{
            baseURL = payload.baseUrl;
        });
    });
    it("Serach property", ()=>{
        cy.request({
            method: 'post',
            url: baseURL,
            body:payload
        }).then((response)=>{
            expect(response.status).to.eq(200);
            console.log('Response Body : ', response.body);
        })
    });
});