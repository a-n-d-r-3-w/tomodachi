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

const add = async (id, newFriend) => {
  const friends = await get(id);
  for (let i = 0; i < friends.length; i++) {
    const oldFriend = friends[i];
    if (newFriend === oldFriend) {
      return;
    }
  }
  friends.push(newFriend);
  return connectRunClose(accounts => accounts.updateOne({ id }, { $set: { friends }}));
}

module.exports = {
  add,
  count,
  get,
}