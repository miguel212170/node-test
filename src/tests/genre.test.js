require("../models");

const request = require("supertest");
const app = require("../app");

const URL_BASE = '/api/v1/genres';
const genre = { 
    name: "Drama"
}

let genreId

// CREATE
test("POST --> URL_BASE,  return status code 201 , res.body.name === genre.name", async () => {

    const res = await request(app)
        .post(URL_BASE)
        .send(genre)
    
    genreId = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

/// GETALL
test("GET --> URL_BASE,  Return Status Code 200", async() => {
    const res = await request(app)
        .get(URL_BASE)
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1);
})


/// GET ONE
test(" GET 'URL_BASE/:id' Return Status Code 200 and res.body.name === genre.name ", async () => {
    const res = await request(app)
    .get(`${URL_BASE}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})


// PUT / UPDATE
test("PUT 'URL_BASE/:id' Return Satus Code 200 and res.body == bodyUpdate.name ", async () => {
    const bodyUpdate = {
        name: "SciFi"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${genreId}`)
        .send(bodyUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

// DELETE
test("DELETE --> 'URL_BASE/:id' Return Status Code 204  ", async () => {
    const res = await request(app)
    .delete(`${URL_BASE}/${genreId}`)
    expect(res.status).toBe(204)
})

