const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Bc93150$',
  database: 'overlord_db'
});

/*
const query = `
  INSERT INTO users (email, password, first_name, last_name, phone_number, birth_date)
  VALUES ('john.doe@example.com', 'your_hashed_password', 'John', 'Doe', '+1234567890', '1997-11-06');
`;
client.query(query)
  .then(res => console.log(res))
  .catch(err => console.error(err.stack));
*/

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));