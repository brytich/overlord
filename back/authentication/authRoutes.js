const express = require('express');
const router = express.Router();
const authController = require('./auth');
const checkAuth = require('./middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', checkAuth, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully',
    user: req.userData
  });
});

module.exports = router;
