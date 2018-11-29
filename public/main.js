const addFriend = () =>
  fetch('/api/addThing', {
    method: 'post',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      accountId: (new URLSearchParams(document.location.search.substring(1))).get('accountId'),
      thing: {
        name: 'Sludge',
        about: [ 'Has a long neck' ],
        toTalkAbout: [ 'Does he like mud?' ],
      },
    }),
  })
  .then(() => {
    location.reload();
  });

const addInfo = (accountId, friendId) => {
  const newInfo = window.prompt("New info: ");
  console.log('accountId:', accountId);
  console.log('friendId:', friendId);
  console.log('newInfo:', newInfo);
};
