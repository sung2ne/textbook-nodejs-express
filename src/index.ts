// filename: src/index.ts
import express, { Application } from 'express';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import usersRouter from './routes/users';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// 라우터
app.use('/users', usersRouter);

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ error: '페이지를 찾을 수 없습니다' });
});

// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
