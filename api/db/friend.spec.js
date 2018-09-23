// This test requires mongod to be running in the background.
const accounts = require('./accounts');
const friends = require('./friends');

beforeEach(async () => {
  const accountId = await accounts.create();
    const grimlock = {
      name: 'Grimlock',
      about: [ 'Likes to listen to stories.' ],
      toTalkAbout: [ 'This new story I heard.' ],
    };
    await friends.add(accountId, grimlock);
    const count = await friends.count(accountId);
    expect(count).toBe(1);
});

afterEach(async () => await accounts.drop());

test('Add info', async () => {
  expect(true).toEqual(true);
});
