const express = require('express');
const bodyParser = require('body-parser');
const accounts = require('./api/db/accounts');
const friends = require('./api/db/friends');

const app = express();

app.use(bodyParser.json());

app.post('/api/accounts', async (req, res) => {
  try {
    const accountId = await accounts.create();
    res.json({ accountId });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.post('/api/friends', async (req, res) => {
  const { accountId, friend } = req.body;
  try {
    await friends.add(accountId, friend);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get('/api/accounts/:accountId', async (req, res) => {
  const { accountId } = req.params;
  try {
    const myFriends = await friends.get(accountId);
    res.json({ friends: myFriends })
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.use(express.static('public'));

const server = app.listen(3000);

module.exports = server;
