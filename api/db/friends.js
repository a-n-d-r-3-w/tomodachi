const shortid = require('shortid');
const accounts = require('./accounts');
const connectRunClose = require('./connectRunClose');

const get = async id => {
  const account = await accounts.get(id);
  const { friends } = account;
  return friends ? friends : [];
};

const count = async id => {
  const friends = await get(id);
  return friends.length;
}

const add = async (id, friend) => {
  const friends = await get(id);
  friends.push({
    id: shortid.generate(),
    ...friend,
  });
  return connectRunClose(accounts => accounts.updateOne({ id }, { $set: { friends }}));
}

module.exports = {
  add,
  count,
  get,
}