var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

const { MONGO_USER, MONGO_PASSWORD, MONGO_SERVER } = process.env;
const MONGO_DB = "urls";
const MONGO_COLLECTION = "routes";

let uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}`;
if (process.env.MONGO_VERSION === "3.6") uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DB}?useUnifiedTopology=true`
const client = new MongoClient(uri);

router.get('/', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await  db.collection(MONGO_COLLECTION);
  const routes = await collection.find().toArray();

  res.send(routes).status(200);;
});

router.post("/", async (req, res) => {
  let document = {
    route: req.body.route,
    url: req.body.url
  };
  console.log("Adding document to DB", document);
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION);
  const result = await collection.insertOne(document);
  console.log(result);
  res.send(result).status(200);
});

module.exports = router;
