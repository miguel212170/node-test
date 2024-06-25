require("../models");

const request = require("supertest");
const app = require("../app");

const URL_BASE = '/api/v1/actors';
const actor = { 
    firstName: "Kevin",
    lastName: "Costner",
    nationality: "USA",
    image: "Random Image",
    birthday: "1970-01-01"
}

let actorId

// CREATE
test("POST --> URL_BASE,  return status code 201 , res.body.firstName === actor.firstName", async () => {

    const res = await request(app)
        .post(URL_BASE)
        .send(actor)
    
    actorId = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

})

/// GETALL

test("GET --> URL_BASE,  return status code 200", async() => {
    const res = await request(app)
        .get(URL_BASE)
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1);
})


/// GET ONE
test(" GET 'URL_BASE/:id' Return Status Code 200 and res.body.firstName === actors.firstName ", async () => {
    const res = await request(app)
    .get(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


// PUT / UPDATE
test("PUT 'URL_BASE/:id' Return Satus Code 200 and res.body == bodyUpdate.FirstName ", async () => {
    const bodyUpdate = {
        firstName: "George",
        lastName: "Harrison"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(bodyUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

// DELETE
test("DELETE --> 'URL_BASE/:id' Return Status Code 204  ", async () => {
    const res = await request(app)
    .delete(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(204)
    
})

