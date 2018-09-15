const shortid = require('shortid');
const connectRunClose = require('./connectRunClose');

const create = async () => {
  const accountId = shortid.generate();
  const result = await connectRunClose(collection => collection.insertOne({ accountId }));
  if (result.result.ok === 1) {
    return result.ops[0].accountId;
  }
  throw new Error('Failed to create account.');
};

const count = () => connectRunClose(collection => collection.countDocuments({}));

const drop = () => connectRunClose(collection => collection.drop());

const get = accountId => connectRunClose(collection => collection.findOne({ accountId }));

module.exports = {
  count,
  create,
  drop,
  get,
};
