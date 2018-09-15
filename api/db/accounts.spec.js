/* globals beforeEach, describe, expect, test */
// This test requires mongod to be running in the background.
const accounts = require('./accounts');

const OK = 1; // 1 means 'OK' in the Node.js MongoDB Driver API.

afterEach(async () => {
  const result = await accounts.drop();
  expect(result).toBe(true);
  expect(await accounts.count()).toBe(0);
});

test('create', async () => {
  const id1 = await accounts.create();
  expect(id1).toEqual(expect.any(String));
  expect(await accounts.count()).toBe(1);

  const id2 = await accounts.create();
  expect(id2).toEqual(expect.any(String));
  expect(await accounts.count()).toBe(2);
});

test('get', async () => {
  const id = await accounts.create();
  const account = await accounts.get(id);
  expect(account.id).toBe(id);
});