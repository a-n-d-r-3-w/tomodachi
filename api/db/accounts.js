/* eslint-disable no-console */
const { MongoClient } = require('mongodb');
const shortid = require('shortid');

const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'tomodachi';
const COLLECTION_NAME = 'accounts';
const NUM_SALT_ROUNDS = 10;

const connectRunClose = async (fn) => {
  // noinspection JSCheckFunctionSignatures, because WebStorm doesn't know about useNewUrlParser.
  const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true });
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  const result = await fn(collection);

  if (client) {
    await client.close();
  }

  return result;
};

const create = async () => {
  const accountId = shortid.generate();
  return connectRunClose(collection => collection.insertOne({ accountId }));
};

const count = async () => connectRunClose(collection => collection.countDocuments({}));

const drop = () => connectRunClose(collection => collection.drop());

module.exports = {
  count,
  create,
  drop,
};
