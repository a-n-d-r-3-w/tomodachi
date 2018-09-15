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
  const response = await request(server).post('/api/accounts');
  expect(response.status).toBe(200);
  expect(JSON.parse(response.text).id).toEqual(expect.any(String));
});

test('Add friend', async () => {
  const response1 = await request(server).post('/api/accounts');
  expect(response1.status).toBe(200);
  const { id } = JSON.parse(response1.text);
  const response2 = await request(server).post('/api/friends').send({
    id,
    friend: {
      name: 'Sludge',
      about: [ 'Has a long neck' ],
      toTalkAbout: [ 'Does he like mud?' ],
    },
  });
  expect(response2.status).toBe(200);
})