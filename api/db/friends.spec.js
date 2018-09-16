// This test requires mongod to be running in the background.
const accounts = require('./accounts');
const friends = require('./friends');

afterEach(async () => await accounts.drop());

describe('get', async () => {
  test('Empty', async () => {
    const accountId = await accounts.create();
    const myFriends = await friends.get(accountId);
    expect(myFriends).toEqual([]);
  });
});

describe('add', async () => {
  test('Happy path', async () => {
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

  test('Missing "friend.name"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      about: [ 'Likes to listen to stories.' ],
      toTalkAbout: [ 'This new story I heard.' ],
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });

  test('Missing "friend.about"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      name: 'Grimlock',
      toTalkAbout: [ 'This new story I heard.' ],
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });

  test('Missing "friend.toTalkAbout"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      name: 'Grimlock',
      about: [ 'Likes to listen to stories.' ],
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });

  test('Malformed "friend.name"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      name: [ '"friend.name" should be a string' ],
      about: [ 'Likes to listen to stories.' ],
      toTalkAbout: [ 'This new story I heard.' ],
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });

  test('Malformed "friend.about"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      name: 'Grimlock',
      about: '"friend.about" should be an array',
      toTalkAbout: [ 'This new story I heard.' ],
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });

  test('Malformed "friend.toTalkAbout"', async () => {
    expect.assertions(2);
    const accountId = await accounts.create();
    const grimlock = {
      name: 'Grimlock',
      about: [ 'Likes to listen to stories.' ],
      toTalkAbout: '"friend.toTalkAbout" should be an array',
    };
    try {
      await friends.add(accountId, grimlock);
    } catch (error) {
      expect(error).toBeTruthy();
    }
    const count = await friends.count(accountId);
    expect(count).toBe(0);
  });
});
