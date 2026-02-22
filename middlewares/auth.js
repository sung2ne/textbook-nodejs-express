// filename: middlewares/auth.js
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다.' });
  }
  next();
};

module.exports = auth;
