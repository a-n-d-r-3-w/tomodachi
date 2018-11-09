const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const connectRunClose = require('./api/db/connectRunClose');

const app = express();

app.use(bodyParser.json());

app.post('/api/createAccountId', async (req, res) => {
  const accountId = shortid.generate();
  const result = await connectRunClose('accountIds', accountIds => accountIds.insertOne({ accountId }));
  if (result.result.ok === 1) {
    res.status(200).json({ accountId });
  }
  res.status(500).end();
});

const accountIdExists = async accountId => {
  const accountIdsWithMongoDbIds = await connectRunClose('accountIds', accountIds => accountIds.find({}).toArray());
  const accountIds = accountIdsWithMongoDbIds.map(obj => obj.accountId);
  return accountIds.includes(accountId);
};

app.post('/api/addThing', async (req, res) => {
  const thing = req.body;
  const { accountId } = thing;

  const hasAccountId = !!accountId;
  if (!hasAccountId) {
    res.status(400).send('Request is missing accountId.');
    return;
  }

  if (!(await accountIdExists(accountId))) {
    res.status(403).send('accountId does not exist.');
    return;
  }

  const result = await connectRunClose('things', things => things.insertOne(thing));
  if (result.result.ok === 1) {
    res.status(200).end();
  }
  res.status(500).end();
});

app.get('/api/getThings', async (req, res) => {
  const { accountId } = req.query;

  if (!(await accountIdExists(accountId))) {
    res.status(403).send('accountId does not exist.');
    return;
  }

  const result = await connectRunClose('things', things => things.find({ accountId }).toArray());
  res.status(200).json(result);
});

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/things', async (req, res) => {

  const { accountId } = req.query;

  if (!(await accountIdExists(accountId))) {
    res.status(403).send('accountId does not exist.');
    return;
  }

  const result = await connectRunClose('things', things => things.find({ accountId }).toArray());

  console.log(JSON.stringify(result, null, 2))

  res.render('things', { things: result })
});

const server = app.listen(3000);

module.exports = server;
