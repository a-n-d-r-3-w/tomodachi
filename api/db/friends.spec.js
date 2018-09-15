const accounts = require('./accounts');
const friends = require('./friends');

afterEach(async () => {
  await accounts.drop();
  expect(await accounts.count()).toBe(0);
});

describe('get', () => {
  test('Empty', async () => {
    const id = await accounts.create();
    const myFriends = await friends.get(id);
    expect(myFriends).toEqual([]);
  });
});

test('add', async () => {
  const id = await accounts.create();
  await friends.add(id, 'Grimlock');
  const count1 = await friends.count(id);
  expect(count1).toBe(1);

  const myFriends1 = await friends.get(id);
  expect(myFriends1).toEqual(['Grimlock']);

  await friends.add(id, 'Swoop');
  const count2 = await friends.count(id);
  expect(count2).toBe(2);

  const myFriends2 = await friends.get(id);
  expect(myFriends2).toEqual(['Grimlock', 'Swoop']);
});

test('add same name twice', async () => {
  const id = await accounts.create();
  await friends.add(id, 'Grimlock');
  const count1 = await friends.count(id);
  expect(count1).toBe(1);

  const myFriends1 = await friends.get(id);
  expect(myFriends1).toEqual(['Grimlock']);

  await friends.add(id, 'Grimlock');
  const count2 = await friends.count(id);
  expect(count2).toBe(1);

  const myFriends2 = await friends.get(id);
  expect(myFriends2).toEqual(['Grimlock']);
});