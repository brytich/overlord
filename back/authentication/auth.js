const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    // Store the user in a database

    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

    res.json({
      message: 'User registered successfully',
      token: token
    });
  });
};

const login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Retrieve the user from the database

  // Check if the email exists and the password is correct
  // Compare the password with the hashed password stored in the database
  bcrypt.compare(password, hashedPassword, function(err, result) {
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
};

module.exports = { register, login };
