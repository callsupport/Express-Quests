require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 8000;

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const usersHandlers = require("./usersHandlers");
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
app.delete("/api/users/:id", usersHandlers.deleteUsers);

const { validateMovie } = require("./validators.js");
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

const { validateUser } = require("./validators.js");
app.post("/api/users", validateUser, usersHandlers.postUsers);
app.put("/api/users/:id", validateUser, usersHandlers.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
