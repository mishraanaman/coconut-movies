const express = require('express');
const moviesRouter = require("../routes/movies/movie.router");
const theatersRouter = require("../routes/theaters/theaters.router");
const api = express.Router();

// GET /api/search?q=...
api.use("/movies", moviesRouter);
api.use("/theaters", theatersRouter);

module.exports = api;