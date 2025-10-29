const express = require("express");
const { getNearestTheaters, getTheaters } = require("./theaters.controller");

const router = express.Router();

// GET /theaters/nearest?longitude=...&latitude=...&limit=...
router.get("/nearest", getNearestTheaters);

// GET /theaters - get all theaters
router.get("/", getTheaters);

module.exports = router;