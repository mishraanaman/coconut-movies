const express = require("express");
const { searchMovies, getMoviePoster } = require("./movie.controller");
const { checkToken } = require("../login/login.controller");
const router = express.Router();

// GET /api/movies/search?q=...
router.get("/search", searchMovies);
router.get("/posters", getMoviePoster);

module.exports = router;
