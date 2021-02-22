var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

const { MONGO_USER, MONGO_PASSWORD, MONGO_SERVER } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}`;
const client = new MongoClient(uri);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({msg: "Hello"}).status(200);
});

router.get("/health", async (req, res) => {
  let dbStatus = false;
  await client.connect().then(() => dbStatus = true).catch(() => dbStatus = false);
  res.send({
    server: true,
    database: dbStatus
  }).status(200);
});

module.exports = router;
