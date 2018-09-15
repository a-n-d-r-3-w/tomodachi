const app = require('express')();
const bodyParser = require('body-parser');
const accounts = require('./db/accounts');
const friends = require('./db/friends');

app.use(bodyParser.json());

app.post('/api/accounts', async (req, res) => {
  try {
    const id = await accounts.create();
    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.post('/api/friends', async (req, res) => {
  const { id, friend } = req.body;
  try {
    await friends.add(id, friend);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get('/api/friends', async (req, res) => {
  const { id } = req.body;
  try {
    const myFriends = await friends.get(id);
    res.json({ friends: myFriends })
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
})

const server = app.listen(3000);

module.exports = server;
