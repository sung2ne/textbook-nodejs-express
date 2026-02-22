// filename: app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 루트 경로 처리
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/about', (req, res) => {
  res.send('<h1>소개 페이지</h1><p>Express.js를 배우고 있습니다.</p>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>연락처</h1><p>email@example.com</p>');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
