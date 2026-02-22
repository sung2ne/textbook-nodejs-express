// filename: routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('홈 페이지');
});

router.get('/about', (req, res) => {
  res.send('<h1>소개 페이지</h1>');
});

module.exports = router;
