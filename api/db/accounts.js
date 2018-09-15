const shortid = require('shortid');
const connectRunClose = require('./connectRunClose');

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
