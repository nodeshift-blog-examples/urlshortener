const { MONGO_USER, MONGO_PASSWORD, MONGO_SERVER } = process.env;
const MONGO_DB = "urls";
const MONGO_COLLECTION = "routes";

function getMongoConnectionString() {
  let uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}`;
  if (process.env.MONGO_VERSION === "3.6") uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}/${MONGO_DB}?useUnifiedTopology=true`
  return uri;
}

function getMongoDB() {
  return MONGO_DB;
}

function getMongoCollection() {
  return MONGO_COLLECTION;
}

module.exports = {
  getMongoConnectionString,
  getMongoDB,
  getMongoCollection
}