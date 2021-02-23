var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

const uri = require("../utils/mongoConn").getMongoConnectionString();
const client = new MongoClient(uri);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({msg: "Hello"}).status(200);
});

router.get("/health", async (req, res) => {
  let dbStatus = false;
  console.log("Testing database connection");
  await client.connect().then(() => {
    console.log("Connected");
    dbStatus = true;
  }).catch(e => {
    console.log("Failed to connect");
    console.log(e);
    dbStatus = false;
  });
  console.log(`Database status is ${dbStatus}`);
  res.send({
    server: true,
    database: dbStatus
  }).status(200);
});

module.exports = router;
