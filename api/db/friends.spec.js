const accounts = require('./accounts');
const friends = require('./friends');

afterEach(async () => {
  await accounts.drop();
  expect(await accounts.count()).toBe(0);
});

test('get', async () => {
  await accounts.create();
  friends.get();
});