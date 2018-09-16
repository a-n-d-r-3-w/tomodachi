// This test requires mongod to be running in the background.
const accounts = require('./accounts');
const friends = require('./friends');

afterEach(async () => {
  await accounts.drop();
  expect(await accounts.count()).toBe(0);
});

describe('get', () => {
  test('Empty', async () => {
    const accountId = await accounts.create();
    const myFriends = await friends.get(accountId);
    expect(myFriends).toEqual([]);
  });
});

test('add', async () => {
  const accountId = await accounts.create();
  const grimlock = {
    name: 'Grimlock',
    about: [ 'Likes to listen to stories.' ],
    toTalkAbout: [ 'This new story I heard.' ],
  };
  await friends.add(accountId, grimlock);
  const count1 = await friends.count(accountId);
  expect(count1).toBe(1);

  const myFriends1 = await friends.get(accountId);
  expect(myFriends1).toEqual([ {
    friendId: expect.any(String),
    ...grimlock,
  }]);

  const swoop = {
    name: 'Swoop',
    about: [ 'Likes to fly.' ],
    toTalkAbout: [ 'Where the Decepticons are.' ],
  };
  await friends.add(accountId, swoop);
  const count2 = await friends.count(accountId);
  expect(count2).toBe(2);

  const myFriends2 = await friends.get(accountId);
  expect(myFriends2).toEqual([ 
    { 
      friendId: expect.any(String),
      ...grimlock, 
    },
    {
      friendId: expect.any(String),
      ...swoop,
    },
  ]);
});
