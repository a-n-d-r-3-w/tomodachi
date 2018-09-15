const shortid = require('shortid');
const connectRunClose = require('./connectRunClose');

const create = async () => {
  const id = shortid.generate();
  const result = await connectRunClose(collection => collection.insertOne({ id }));
  if (result.result.ok === 1) {
    return result.ops[0].id;
  }
  throw new Error('Failed to create account.');
};

const count = async () => connectRunClose(collection => collection.countDocuments({}));

const drop = () => connectRunClose(collection => collection.drop());

module.exports = {
  count,
  create,
  drop,
};
