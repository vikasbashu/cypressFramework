/// <reference types = "cypress" />

describe("CourseBay end point testing", ()=>{
    var baseURL = '';
    let course_id = null, access_token = '', sample_data = {};
    before(()=>{
        cy.fixture('api_base_data').then((payload)=>{
            baseURL = payload.baseURL;
        });
        cy.fixture('sample_course_details').then((payload)=>{
            sample_data = payload;
        });
    });
    describe("Admin flow test", ()=> {
    
        describe("Positive Testing", ()=>{
            it("Validate that admin should be able to login with valid creds", ()=> {
                cy.request({
                    method: 'POST',
                    url: `${baseURL}/admin/login`,
                    headers: {
                        'username': 'Schebrina',
                        'password': 'admin123'
                    }
                }).then((response)=> {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Logged in successfully");
                    expect(response.body.token).length.above(50);
                    access_token = response.body.token;
                })
            });
            
            it("Verify that admin can see the list of available course", ()=> {
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/admin/courses`,
                    headers: {
                        Authorization : `Bearer ${access_token}`
                    },
                    //failOnStatusCode: false    
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.courses).length.greaterThan(4);
                    });
                });
            it("Verify that admin can create a course", ()=>{
                cy.request({
                    method: 'POST',
                    url:`${baseURL}/admin/courses`,
                    headers:{
                        authorization:`Bearer ${access_token}`
                    },
                    body:{
                        'title': sample_data.title,
                        "description": sample_data.description,
                        "price": sample_data.price,
                        "imageLink": sample_data.imageLink,
                        "published": sample_data.published
                    }
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.message).to.eq("Course created successfully");
                        expect(response.body.courseId).length.greaterThan(10);
                        course_id = response.body.courseId;
                    });
            });
            it("Verify that admin can view the specific course details", ()=>{
                cy.request({
                    method:'GET',
                    url: `${baseURL}/admin/courses/${course_id}`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    }
                }).then((response)=>{
                    expect(response.status).to.eq(200);
                    expect(response.body._id).length.greaterThan(10);
                    expect(response.body.title).to.eq(sample_data.title);
                    expect(response.body.description).to.eq(sample_data.description);
                    expect(response.body.price).to.eq(sample_data.price);
                    expect(response.body.imageLink).to.eq(sample_data.imageLink);
                    expect(response.body.published).to.eq(sample_data.published);
                });
            });
             
            it("Verify that admin can update course details", ()=>{
                cy.request({
                    method:'PUT',
                    url: `${baseURL}/admin/courses/${course_id}`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    },
                    body:{
                        "published": true
                    },
                    failOnStatusCode: false
                }).then((response)=>{
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Course updatd successfully");
                });
            });
            
            it("Validate token", ()=> {
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/util/tokenValidator`,
                    headers: {
                        "Authorization":`Bearer ${access_token}`,
                    },
                    //failOnStatusCode: false 
                }).then((response)=>{
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Valid");
                });
            });
        });
        describe("Negative Testing", ()=>{
            it("Validate that admin should not be able to login with invalid creds", ()=> {
                cy.request({
                    method: 'POST',
                    url: `${baseURL}/admin/login`,
                    headers: {
                        'username': 'test',
                        'password': 'admin123'
                    },
                    failOnStatusCode: false
                }).then((response)=> {
                    expect(response.status).to.eq(401);
                    expect(response.body.message).to.eq("Invalid username or password");
                })
            });
            it("Verify that admin should get the error message when invalid id is used to fetch course details", ()=>{
                cy.request({
                    method:'GET',
                    url: `${baseURL}/admin/courses/${course_id}1`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    },
                    failOnStatusCode: false
                }).then((response)=>{
                    expect(response.status).to.eq(404);
                    expect(response.body.message).to.eq("Invalid course id. Course not found");
                });
            });   
            it("Verify that admin should get the error message when invalid id is used to update course details", ()=>{
                cy.request({
                    method:'PUT',
                    url: `${baseURL}/admin/courses/${course_id}1`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    },
                    failOnStatusCode: false
                }).then((response)=>{
                    expect(response.status).to.eq(404);
                    expect(response.body.message).to.eq("Invalid course id. Course not found");
                });
            });
            it("Verify that admin should get the error message when invalid id is used to delete course details", ()=>{
                cy.request({
                    method:'DELETE',
                    url: `${baseURL}/admin/courses/${course_id}1`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    },
                    failOnStatusCode: false
                }).then((response)=>{
                    expect(response.status).to.eq(404);
                    expect(response.body.message).to.eq("Invalid course id. Course not found");
                });
            });
        });    
    });
    describe("User flow test", ()=>{
        describe("Positive Testing", ()=>{
            let user_purchased_course = 0, user_access_token = null;
            it("Validate that user should be able to login with valid creds", ()=> {
                cy.request({
                    method: 'POST',
                    url: `${baseURL}/users/login`,
                    headers: {
                        'username': 'shapack',
                        'password': 'test123'
                    },
                    failOnStatusCode: false
                }).then((response)=> {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Logged in successfully");
                    expect(response.body.token).length.above(50);
                    user_access_token = response.body.token;
                })
            });
            it("Verify that user can see the list of available course", ()=> {
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/users/courses`,
                    headers: {
                        Authorization : `Bearer ${user_access_token}`
                    },
                    //failOnStatusCode: false    
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.courses).length.greaterThan(4);
                    })
            });
            it("Verify that user can see the list of puchased courses", ()=> {
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/users/purchasedCourses`,
                    headers: {
                        Authorization : `Bearer ${user_access_token}`
                    },
                    //failOnStatusCode: false    
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.purchasedCourses).length.gte(0);
                        user_purchased_course = response.body.purchasedCourses.length;
                    })
            });
            it("Verify that user can purchased a course", ()=>{
                cy.request({
                    method:"POST",
                    url: `${baseURL}/users/courses/${course_id}`,
                    headers: {
                        Authorization : `Bearer ${user_access_token}`
                    }
                }).then((response)=>{
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Course purchased successfully");
                })
            });
            it("Verify that newly purchased course should be added in user library", ()=>{
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/users/purchasedCourses`,
                    headers: {
                        Authorization : `Bearer ${user_access_token}`
                    },
                    //failOnStatusCode: false    
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.purchasedCourses).length.greaterThan(user_purchased_course);
                    })
            });
            it("Verify that admin can delete a course", ()=>{
                cy.request({
                    method:'DELETE',
                    url: `${baseURL}/admin/courses/${course_id}`,
                    headers:{
                        Authorization : `Bearer ${access_token}`
                    },
                    failOnStatusCode: false
                }).then((response)=>{
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq("Course deleted successfully");
                });
            });
            it("Being a super admin - delete the all test courses", ()=>{
                cy.request({
                    method: 'GET',
                    url: `${baseURL}/admin/courses`,
                    headers: {
                        Authorization : `Bearer ${access_token}`
                    },
                    failOnStatusCode: false    
                    }).then((response)=>{
                        expect(response.status).to.eq(200);
                        expect(response.body.courses).length.greaterThan(1);
                        response.body.courses.forEach((course) => {
                            if(course.title.includes("testTitle123")){
                                cy.log(`Deleting Course with id:${course._id}`);
                                cy.request({
                                    method:'DELETE',
                                    url: `${baseURL}/admin/courses/${course._id}`,
                                    headers:{
                                        Authorization : `Bearer ${access_token}`
                                    },
                                    failOnStatusCode: false
                                }).then((response)=>{
                                    expect(response.status).to.eq(200);
                                    expect(response.body.message).to.eq("Course deleted successfully");
                                });
                            }
                        });
                    });
            });
        });
        describe("Negative Testing", ()=>{
            it("Validate that user should not be able to login with invalid creds", ()=> {
                cy.request({
                    method: 'POST',
                    url: `${baseURL}/users/login`,
                    headers: {
                        'username': 'test',
                        'password': 'user123'
                    },
                    failOnStatusCode: false
                }).then((response)=> {
                    expect(response.status).to.eq(401);
                    expect(response.body.message).to.eq("Invalid username or password");
                })
            });
        });
    });

});

