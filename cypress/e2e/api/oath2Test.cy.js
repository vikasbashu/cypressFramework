/// <reference types = "cypress"/>

describe("Oath2 type authoriation test", ()=> {
    const baseURL = 'http://coop.apps.symfonycasts.com';
    let accessToken = '', userId = '';
    before(async () => {
        var response = await cy.request({
            method: 'POST',
            url: `${baseURL}/token`,
            form: true,
            body: {
                "client_id": 'FarmingWorld',
                "client_secret": '266f25368987a03e2fa4e0dbffc3ae52',
                "grant_type": 'client_credentials'
            }
        });
        expect(response.status).to.eq(200);
        accessToken = response.body.access_token;
        // fetch the user id from access token
        response = await cy.request({
            method: 'GET',
            url: baseURL + '/api/me',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        expect(response.status).to.eq(200);
        userId = response.body.id;
        
    });
   
    it("Unlock the barn", ()=> {
        cy.request({
            method: 'POST',
            url: `${baseURL}/api/${userId}/barn-unlock`,
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("You just unlocked your barn! Watch out for strangers!");
        });
    });
});