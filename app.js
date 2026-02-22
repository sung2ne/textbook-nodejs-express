// filename: app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 커스텀 미들웨어
const logger = require('./middlewares/logger');
app.use(logger);

// 라우터 연결
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 핸들러
const AppError = require('./errors/AppError');
app.use((req, res, next) => {
  next(new AppError('페이지를 찾을 수 없습니다.', 404));
});

// 에러 처리 미들웨어
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
