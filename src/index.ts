// filename: src/index.ts
import express, { Application } from 'express';
import path from 'path';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// 정적 파일
app.use(express.static(path.join(__dirname, '../public')));

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// 전역 데이터
app.locals.siteName = 'Node.js Board';
app.locals.year = new Date().getFullYear();

// 라우터
app.get('/', (req, res) => {
  res.render('index', { title: '홈' });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).render('index', { title: '404 - 페이지를 찾을 수 없습니다' });
});

// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
