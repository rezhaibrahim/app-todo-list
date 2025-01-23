const jwt = require('jsonwebtoken');

// Ganti dengan kunci rahasia Anda
const SECRET_KEY = 'test';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.send(401, { message: 'Unauthorized' });
    return next(false);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Simpan data user di request
    return next();
  } catch (err) {
    res.send(401, { message: 'Invalid token' });
    return next(false);
  }
}

module.exports = authenticate;