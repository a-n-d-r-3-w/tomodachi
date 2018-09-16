const shortid = require('shortid');
const accounts = require('./accounts');
const connectRunClose = require('./connectRunClose');

const get = async accountId => {
  const account = await accounts.get(accountId);
  const { friends } = account;
  return friends ? friends : [];
};

const count = async accountId => {
  const friends = await get(accountId);
  return friends.length;
}

const add = async (accountId, friend) => {
  if (!friend ||
    !friend.name || !(typeof friend.name === 'string') ||
    !friend.about || !Array.isArray(friend.about) ||
    !friend.toTalkAbout || !Array.isArray(friend.toTalkAbout)) {
    throw new Error('"friend" is malformed.');
  }
  const friends = await get(accountId);
  friends.push({
    friendId: shortid.generate(),
    ...friend,
  });
  return connectRunClose(accounts => accounts.updateOne({ accountId }, { $set: { friends }}));
}

module.exports = {
  add,
  count,
  get,
}