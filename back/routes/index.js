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

router.get("/health", (req, res) => {
  res.send({
    server: true,
    database: !!client
  }).status(200);
});

module.exports = router;
