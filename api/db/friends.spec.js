// This test requires mongod to be running in the background.
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
  const grimlock = {
    name: 'Grimlock',
    about: [ 'Likes to listen to stories.' ],
    toTalkAbout: [ 'This new story I heard.' ],
  };
  await friends.add(id, grimlock);
  const count1 = await friends.count(id);
  expect(count1).toBe(1);

  const myFriends1 = await friends.get(id);
  expect(myFriends1).toEqual([ {
    id: expect.any(String),
    ...grimlock,
  }]);

  const swoop = {
    name: 'Swoop',
    about: [ 'Likes to fly.' ],
    toTalkAbout: [ 'Where the Decepticons are.' ],
  };
  await friends.add(id, swoop);
  const count2 = await friends.count(id);
  expect(count2).toBe(2);

  const myFriends2 = await friends.get(id);
  expect(myFriends2).toEqual([ 
    { 
      id: expect.any(String),
      ...grimlock, 
    },
    {
      id: expect.any(String),
      ...swoop,
    },
  ]);
});
