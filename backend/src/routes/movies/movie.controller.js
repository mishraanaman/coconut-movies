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
                    fuzzy: {
                      maxEdits: 2,
                      prefixLength: 1,
                    },
                  },
                },
                {
                  autocomplete: {
                    query,
                    path: "cast",
                    fuzzy: {
                      maxEdits: 2,
                      prefixLength: 1,
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

    const results = await collection
      .find({ poster: { $exists: true, $ne: "" } })
      .sort({ released: -1 })
      .limit(7)
      .project({ poster: 1 })
      .toArray();

    res.json(results);
  } catch (err) {
    console.error("Poster fetch error:", err);
    res.status(500).json({ error: "Error fetching posters" });
  }
};

module.exports = { searchMovies, getMoviePoster };
