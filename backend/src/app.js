const express = require("express");
const helmet = require("helmet");
const apiRoutes = require('./routes/api');

module.exports = (dbs) => {
  const app = express();
  
  // Store database connections in app.locals for access in routes
  app.locals.moviesDB = dbs.moviesDB;
  
  app.use(express.json());
  app.use(require("cors")());
  app.use(helmet());

  // Routes
  app.use("/v1", apiRoutes);

  return app;
};
