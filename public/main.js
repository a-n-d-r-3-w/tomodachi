const addFriend = () =>
  fetch('/api/friends', {
    method: 'post',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      accountId: (new URL(location.href)).pathname.split('/')[2],
      friend: {
        name: 'Sludge',
        about: [ 'Has a long neck' ],
        toTalkAbout: [ 'Does he like mud?' ],
      },
    }),
  })
  .then(() => {
    location.reload();
  });