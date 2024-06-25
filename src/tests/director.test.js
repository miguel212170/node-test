require("../models");

const request = require("supertest");
const app = require("../app");

const URL_BASE = '/api/v1/directors';
const director = { 
    firstName: "Francis",
    lastName: "Ford Coppola",
    nationality: "USA",
    image: "Random Image",
    birthday: "1960-01-01"
}

let directorId

// CREATE
test("POST --> URL_BASE,  Return Status Code 201 , res.body.firstName === director.firstName", async () => {

    const res = await request(app)
        .post(URL_BASE)
        .send(director)
    
    directorId = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

})

/// GETALL

test("GET --> URL_BASE,  Return status code 200", async() => {
    const res = await request(app)
        .get(URL_BASE)

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1);

})


/// GET ONE
test(" GET 'URL_BASE/:id' Return Status Code 200 and res.body.firstName === director.firstName ", async () => {
    const res = await request(app)
    .get(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

// PUT / UPDATE
test("PUT 'URL_BASE/:id' Return Satus Code 200 and res.body == bodyUpdate.FirstName ", async () => {
    const bodyUpdate = {
        firstName: "George",
        lastName: "Lucas"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(bodyUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

// DELETE
test("DELETE --> 'URL_BASE/:id' Return Status Code 204  ", async () => {
    const res = await request(app)
    .delete(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(204)
    
})
