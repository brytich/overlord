const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user');

const secret = 'secret_key';

const router = express.Router();

router.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User(email, password);
  await user.save();

  const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

  res.json({
    message: 'User registered successfully',
    token: token
  });
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Récupérez l'utilisateur depuis la base de données
  // Vérifiez si l'email existe et si le mot de passe est correct

  const token = jwt.sign({ email: email }, secret, { expiresIn: '1h' });

  res.json({
    message: 'User logged in successfully',
    token: token
  });
});

module.exports = router;