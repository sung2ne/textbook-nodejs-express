// filename: src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

const app: Application = express();

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// 레이아웃 설정
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// 정적 파일
app.use(express.static(path.join(__dirname, '../public')));

// 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 전역 변수
app.locals.siteName = 'Node.js Board';
app.locals.year = new Date().getFullYear();

// 홈
app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: '홈' });
});

// 404 처리
app.use((req: Request, res: Response) => {
  res.status(404).render('error/404', { title: '404' });
});

// 에러 처리
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error/500', {
    title: '서버 에러',
    message: process.env.NODE_ENV === 'production'
      ? '서버 에러가 발생했습니다.'
      : err.message
  });
});

export default app;
