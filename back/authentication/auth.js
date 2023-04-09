const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database-postgre.js');
const User = require('./user');

const secret = 'secret_key';

const register = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Hash and salt the password
  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    const user = new User(email, hashedPassword);

    // Store the user in the database
    const query = {
      text: 'INSERT INTO users(email, password) VALUES($1, $2)',
      values: [user.email, user.password],
    };

    pool.query(query)
      .then(() => {
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
        res.json({
          message: 'User registered successfully',
          token: token
        });
      })
      .catch(error => {
        console.error(error.stack);
        res.status(500).json({
          error: 'An error occurred while storing the user in the database'
        });
      });
  });
};

const login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Retrieve the user from the database
  const query = {
    text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
    values: [email],
  };

  pool.query(query)
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

      const user = new User(result.rows[0].email, result.rows[0].password);

      // Check if the password is correct
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({ email: email }, secret, { expiresIn: '1h' });
          return res.json({
            message: 'User logged in successfully',
            token: token
          });
        }
        return res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch(error => {
      console.error(error.stack);
      res.status(500).json({
        error: 'An error occurred while retrieving the user from the database'
      });
    });
};

module.exports = { register, login };