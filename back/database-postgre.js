const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'overlord_db',
  password: 'Bc93150$',
  port: 5432,
});

module.exports = pool;
