/* eslint-disable global-require */
const request = require('supertest');
const shortid = require('shortid');
const connectRunClose = require('./api/db/connectRunClose');

let server;

beforeAll(async () => {
  server = require('./app');
});

afterAll(async () => {
  await server.close();
});

afterEach(async () => {
  await connectRunClose('things', things => things.deleteMany({}));
  expect(await connectRunClose('things', things => things.countDocuments({}))).toBe(0);
  await connectRunClose('accountIds', accountIds => accountIds.deleteMany({}));
  expect(await connectRunClose('accountIds', accountIds => accountIds.countDocuments({}))).toBe(0);
});

test('Create account ID', async () => {
  const response = await request(server).post('/api/createAccountId');
  expect(response.status).toBe(200);
  expect(JSON.parse(response.text).accountId).toEqual(expect.any(String));
});

describe('Add thing', () => {
  it('Happy path', async () => {
    const response = await request(server).post('/api/addThing').send({ accountId: 'accountId' });
    expect(response.status).toBe(200);
    expect(await connectRunClose('things', things => things.countDocuments({}))).toBe(1);
  });

  it('Request is missing accountId', async () => {
    const response = await request(server).post('/api/addThing');
    expect(response.status).toBe(400);
    expect(await connectRunClose('things', things => things.countDocuments({}))).toBe(0);
  });
});

test('Get things', async () => {
  const createAccountIdResponse = await request(server).post('/api/createAccountId');
  expect(createAccountIdResponse.status).toBe(200);
  const { accountId } = JSON.parse(createAccountIdResponse.text);

  const thing = {
    accountId,
    content: 'blah',
    contentType: 'about',
    friendName: 'Sludge',
    friendId: shortid.generate(),
  };
  await request(server).post('/api/addThing').send(thing);

  const getThingsResponse = await request(server).get(`/api/getThings?accountId=${accountId}`);
  const things = JSON.parse(getThingsResponse.text);
  expect(things.length).toBe(1);
  expect(things[0]).toEqual({ _id: expect.any(String), ...thing });
});