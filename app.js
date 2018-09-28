const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid')
const connectRunClose = require('./api/db/connectRunClose');

const app = express();

app.use(bodyParser.json());

app.post('/api/addThing', async (req, res) => {
  const thing = req.body;
  const result = await connectRunClose('things', things => things.insertOne(thing));
  if (result.result.ok === 1) {
    res.status(200).end();
  }
  res.status(500).end();
})

app.post('/api/createAccountId', async (req, res) => {
  const accountId = shortid.generate();
  const result = await connectRunClose('accountIds', accountIds => accountIds.insertOne({ accountId }));
  if (result.result.ok === 1) {
    res.status(200).json({ accountId });
  }
  res.status(500).end();
})

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/api/account/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const result = await connectRunClose('things', things => things.find({ accountId }).toArray());
  res.json(result);
});

const server = app.listen(3000);

module.exports = server;
