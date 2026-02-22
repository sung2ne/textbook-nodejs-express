// filename: src/index.ts
import express, { Application } from 'express';
import path from 'path';
import 'dotenv/config';
import { connectDatabase } from './config/database';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.locals.siteName = 'Node.js Board';
app.locals.year = new Date().getFullYear();

app.get('/', (req, res) => {
  res.render('index', { title: '홈' });
});

app.use((req, res) => {
  res.status(404).render('index', { title: '404 - 페이지를 찾을 수 없습니다' });
});

app.use(errorHandler);

// 서버 시작 (DB 연결 후)
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
});
