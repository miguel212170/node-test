require("../models");

const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const request = require("supertest");
const app = require("../app");

const URL_BASE = '/api/v1/movies';

let movieId
let genresId
let actorsId
let directorsId

const movie = { 
    name: "Star Wars",
    image: "random image sw",
    synopsis: "random text",
    releaseYear: "1982"
}
/*
BeforeAll(async () => {
    // Genres
    genre = await Genre.create({
        name: "Accion"
    })

    genresId = genre.id
    // Actors
    // Directors
    // Movies

});
*/

// CREATE
test("POST --> URL_BASE,  return status code 201 , res.body.firstName === movie.name", async () => {

    const res = await request(app)
        .post(URL_BASE)
        .send(movie)
    
    movieId = res.body.id

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name);
})

/// GETALL

test("GET --> URL_BASE,  return status code 200", async() => {
    const res = await request(app)
        .get(URL_BASE)
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveLength(1);
})


/// GET ONE
test(" GET 'URL_BASE/:id' Return Status Code 200 and res.body.firstName === movie.name ", async () => {
    const res = await request(app)
    .get(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})


// PUT / UPDATE
test("PUT 'URL_BASE/:id' Return Satus Code 200 and res.body == bodyUpdate.name ", async () => {
    const bodyUpdate = {
        name: "Start Treck"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(bodyUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

//   /POST/movies/:id/actors
test("POST --> URL_BASE/:id/actors, Return Status Code 200 and res.body.leng === 1 ", async () => {
    const actors = {
        firstName: "Kevin",
        lastName: "Costner",
        nationality: "USA",
        image: "Random Image",
        birthday: "1970-01-01"
    }
    const createActor = await Actor.create(actors)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([createActor.id])

  // console.log(res.body);
   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
   expect(res.body[0].moviesActors.movieId).toBe(createActor.id)
   expect(res.body[0].moviesActors.actorId).toBe(movieId)
   await createActor.destroy()
    
})

//   /POST/movies/:id/directors
test("POST --> URL_BASE/:id/directors, Return Status Code 200 and res.body.leng === 1 ", async () => {
    const directors = {
        firstName: "Francis",
        lastName: "Ford Coppola",
        nationality: "USA",
        image: "Random Image",
        birthday: "1960-01-01"
    }

    const createDirector = await Director.create(directors)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([createDirector.id])

   //console.log(res.body);
   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
   expect(res.body[0].moviesDirectors.movieId).toBe(createDirector.id)
   expect(res.body[0].moviesDirectors.directorId).toBe(movieId)
   await createDirector.destroy()
    
});

//   /POST/movies/:id/genres
test("POST --> URL_BASE/:id/genres, Return Status Code 200 and res.body.leng === 1 ", async () => {
    const genres = {
        name: "Terror"
    }

    const createGenre = await Genre.create(genres)

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([createGenre.id])

  // console.log(res.body);
   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
   expect(res.body[0].moviesGenres.movieId).toBe(createGenre.id)
   expect(res.body[0].moviesGenres.genreId).toBe(movieId)
   await createGenre.destroy()
});

// DELETE
test("DELETE --> 'URL_BASE/:id' Return Status Code 204  ", async () => {
    const res = await request(app)
    .delete(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(204)
    
})

