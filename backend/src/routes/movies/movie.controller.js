const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
});

const dbName = "sample_mflix";
const collectionName = "movies";

const searchMovies = async (req, res) => {
  const query = req.query.q || "";

  try {
    await client.connect();
    const collection = client.db(dbName).collection(collectionName);

    const results = await collection
      .aggregate([
        {
          $search: {
            index: "default", // Atlas search index
            autocomplete: {
              query,
              path: "title",
              fuzzy: {
                maxEdits: 2,      // allow up to 2 typos
                prefixLength: 1,  // require first character to match exactly
              },
            },
          },
        },
        { $project: { title: 1, imdb: 1, poster: 1,score: { $meta: "searchScore" } } },
        { $limit: 10 },
      ])
      .toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching search results");
  } finally {
    await client.close();
  }
};

const getMoviePoster = async (req, res) => {
    const query = req.query.q || "";

  try {
    await client.connect();
    const collection = client.db(dbName).collection(collectionName);

    const results = await collection
      .find({  poster: {$exists: true, $ne: "" }})
      .sort({ released: -1 }).limit(7).project({poster:1})
      .toArray();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Posters");
  } finally {
    await client.close();
  }
}

module.exports = { searchMovies, getMoviePoster };
