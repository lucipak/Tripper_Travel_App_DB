const { Client } = require('pg');

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'trips',
  port: 5432,
  password: 'root',
});

client
  .connect()
  .then(() => console.log('successful db connection'))
  .catch((err) => console.log(err));

module.exports = client;
