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
  const result1 = await accounts.create();
  expect(result1.result.ok).toBe(OK);
  expect(result1.ops[0].accountId).toEqual(expect.any(String));
  expect(await accounts.count()).toBe(1);

  const result2 = await accounts.create();
  expect(result2.result.ok).toBe(OK);
  expect(result2.ops[0].accountId).toEqual(expect.any(String));
  expect(await accounts.count()).toBe(2);
});
