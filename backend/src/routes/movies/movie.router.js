const express = require("express");
const { searchMovies, getMoviePoster } = require("./movie.controller");

const router = express.Router();

router.get("/search", searchMovies);
router.get("/posters", getMoviePoster);

module.exports = router;
