/* eslint-disable global-require */
const request = require('supertest');
const connectRunClose = require('./api/db/connectRunClose');

let server;

beforeEach(async () => {
  server = require('./app');
});

afterEach(async () => {
  server.close();
  await connectRunClose('things', things => things.deleteMany({}));
  expect(await connectRunClose('things', things => things.countDocuments({}))).toBe(0);
  await connectRunClose('accountIds', accountIds => accountIds.deleteMany({}));
  expect(await connectRunClose('accountIds', accountIds => accountIds.countDocuments({}))).toBe(0);
});

test('foo', async () => {
  const response = await request(server).post('/api/createAccountId');
  expect(response.status).toBe(200);
})

// test('Create account', async () => {
//   const response = await request(server).post('/api/accounts');
//   expect(response.status).toBe(200);
//   expect(JSON.parse(response.text).accountId).toEqual(expect.any(String));
// });

// test('Add friend', async () => {
//   const response1 = await request(server).post('/api/accounts');
//   expect(response1.status).toBe(200);
//   const { accountId } = JSON.parse(response1.text);
//   const response2 = await request(server).post('/api/friends').send({
//     accountId,
//     friend: {
//       name: 'Sludge',
//       about: [ 'Has a long neck' ],
//       toTalkAbout: [ 'Does he like mud?' ],
//     },
//   });
//   expect(response2.status).toBe(200);
// });

// test('Get friends', async () => {
//   const response1 = await request(server).post('/api/accounts');
//   const { accountId } = JSON.parse(response1.text);
//   const sludge = {
//     name: 'Sludge',
//     about: [ 'Has a long neck' ],
//     toTalkAbout: [ 'Does he like mud?' ],
//   };
//   const snarl = {
//     name: 'Snarl',
//     about: [ 'Has plates on his back' ],
//     toTalkAbout: [ 'His tail' ],
//   };
//   await request(server).post('/api/friends').send({
//     accountId,
//     friend: sludge,
//   });
//   await request(server).post('/api/friends').send({
//     accountId,
//     friend: snarl,
//   });
//   const response2 = await request(server).get(`/api/accounts/${accountId}`);
//   expect(response2.status).toBe(200);
//   const myFriends = JSON.parse(response2.text).friends;
//   expect(myFriends.length).toBe(2);
//   expect(myFriends[0]).toEqual({
//     friendId: expect.any(String),
//     ...sludge,
//   });
//   expect(myFriends[1]).toEqual({
//     friendId: expect.any(String),
//     ...snarl,
//   });
// });