const app = require('express')();
const bodyParser = require('body-parser');
const accounts = require('./db/accounts');

app.use(bodyParser.json());

app.put('/api/accounts', async (req, res) => {
  try {
    await accounts.create();
    res.end();
  } catch (error) {
    res.status(400).end();
  }
});

const server = app.listen(3000);

module.exports = server;
