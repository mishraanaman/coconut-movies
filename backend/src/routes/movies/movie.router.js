const express = require("express");
const { searchMovies, getMoviePoster, getMovies, getShows } = require("./movie.controller");

const router = express.Router();

router.get("/search", searchMovies);
router.get("/posters", getMoviePoster);
router.get("/movies", getMovies);
router.get("/shows", getShows);

module.exports = router;
