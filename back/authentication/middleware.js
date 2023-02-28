const jwt = require('jsonwebtoken');
const secret = 'secret_key';

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

module.exports = checkAuth;
