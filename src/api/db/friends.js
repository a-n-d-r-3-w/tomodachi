// @flow
const shortid = require('shortid');
const accounts = require('./accounts');
const connectRunClose = require('./connectRunClose');

const get = async (accountId: string) => {
  const account = await accounts.get(accountId);
  const { friends } = account;
  return friends ? friends : [];
};

const count = async (accountId: string) => {
  const friends = await get(accountId);
  return friends.length;
}

const add = async (accountId: string, friend: {
  name: string,
  about: Array<string>,
  toTalkAbout: Array<string>,
}) => {
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