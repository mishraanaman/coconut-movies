const searchMovies = async (req, res) => {
  const query = req.query.q || "";

  try {
    const collection = req.app.locals.moviesDB.collection("movies");

    const results = await collection
      .aggregate([
        {
          $search: {
            index: "default", // Atlas search index
            compound: {
              should: [
                {
                  autocomplete: {
                    query,
                    path: "title",
                    score: { boost: { value: 5 } },
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 2,
                      maxExpansions: 20,
                    },
                  },
                },
                {
                  autocomplete: {
                    query,
                    path: "cast",
                    score: { boost: { value: 1 } },
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 3,
                      maxExpansions: 10,
                    },
                  },
                },
              ],
              minimumShouldMatch: 1,
            },
          },
        },
        { $project: { title: 1, imdb: 1, tomatoes: 1, poster: 1, score: { $meta: "searchScore" } } },
        { $limit: 10 },
      ])
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Error fetching search results" });
  }
};

const getMoviePoster = async (req, res) => {
  try {
    const collection = req.app.locals.moviesDB.collection("movies");
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

    const results = await collection
      .aggregate([
        {
          $match: {
            type: "movie",
            poster: { $exists: true, $ne: "" },
            released: { $exists: true },
            imdb: { $exists: true },
            "imdb.rating": { $exists: true, $gte: 7.0 }
          }
        },
        {
          $addFields: {
            releaseMonth: { $month: "$released" }
          }
        },
        {
          $match: {
            releaseMonth: currentMonth
          }
        },
        {
          $sort: { "imdb.rating": -1, "imdb.votes": -1 }
        },
        {
          $limit: 10
        },
        {
          $project: {
            title: 1,
            poster: 1,
            imdb: 1,
            year: 1,
            genres: 1,
            plot: 1,
            released: 1,
            runtime: 1
          }
        }
      ])
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Poster fetch error:", err);
    res.status(500).json({ error: "Error fetching posters" });
  }
};

const getMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const collection = req.app.locals.moviesDB.collection("movies");

    const results = await collection
      .find({
        type: "movie",
        poster: { $exists: true, $ne: "" },
        imdb: { $exists: true },
        "imdb.rating": { $exists: true, $gte: 6.0 }
      })
      .sort({ "imdb.rating": -1, released: -1 })
      .skip(skip)
      .limit(limit)
      .project({
        title: 1,
        poster: 1,
        imdb: 1,
        year: 1,
        genres: 1,
        plot: 1,
        released: 1,
        runtime: 1
      })
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Movies fetch error:", err);
    res.status(500).json({ error: "Error fetching movies" });
  }
};

const getShows = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const collection = req.app.locals.moviesDB.collection("movies");

    const results = await collection
      .find({
        type: "series",
        poster: { $exists: true, $ne: "" },
        imdb: { $exists: true },
        "imdb.rating": { $exists: true, $gte: 6.0 }
      })
      .sort({ "imdb.rating": -1, released: -1 })
      .skip(skip)
      .limit(limit)
      .project({
        title: 1,
        poster: 1,
        imdb: 1,
        year: 1,
        genres: 1,
        plot: 1,
        released: 1,
        runtime: 1,
        type: 1
      })
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Shows fetch error:", err);
    res.status(500).json({ error: "Error fetching shows" });
  }
};

const getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const collection = req.app.locals.moviesDB.collection("movies");
    const { ObjectId } = require('mongodb');

    const movie = await collection.findOne(
      { _id: new ObjectId(movieId) },
      {
        projection: {
          title: 1,
          poster: 1,
          fullplot: 1,
          plot: 1,
          imdb: 1,
          year: 1,
          genres: 1,
          released: 1,
          runtime: 1,
          directors: 1,
          cast: 1,
          awards: 1,
          countries: 1,
          languages: 1,
          type: 1,
          rated: 1,
          tomatoes: 1
        }
      }
    );

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    console.error("Movie detail fetch error:", err);
    res.status(500).json({ error: "Error fetching movie details" });
  }
};

module.exports = { searchMovies, getMoviePoster, getMovies, getShows, getMovieById };
