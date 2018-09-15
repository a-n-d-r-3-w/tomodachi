/* eslint-disable global-require */
const request = require('supertest');
const accounts = require('./db/accounts');

let server;

beforeEach(async () => {
  server = require('./index');
});

afterEach(async () => {
  server.close();
  const result = await accounts.drop();
  expect(await accounts.count()).toBe(0);
});

test('Create account', async () => {
  const response = await request(server).put('/api/accounts');
  expect(response.status).toBe(200);
});
