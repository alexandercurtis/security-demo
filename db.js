const pg = require('pg');

const { Client } = pg;
const client = new Client({
  user: 'demo',
  password: 'demo',
  host: 'localhost',
  port: 5432,
  database: 'demo',
});

client.connect();


function checkLogin(name, password) {
  return client.query(`SELECT true AS success FROM login WHERE name = '${name}' AND password = '${password}'`)
    .then( res => res.rows[0]?.success );
}

function getBackers() {
  return client.query('SELECT name, message FROM users')
    .then( res => res.rows );
}

function addBacker( name, message ) {
  return client.query(`INSERT INTO users(name, message) VALUES( '${name}', '${message}' ) RETURNING number`)
   .then( res => res.rows[0].number );
}


module.exports = {
  checkLogin,
  getBackers,
  addBacker
};

