// filename: src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import boardRoutes from './routes/boardRoutes';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.locals.siteName = 'Node.js Board';
app.locals.year = new Date().getFullYear();

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: '홈' });
});

app.use('/boards', boardRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).render('error/404', { title: '404' });
});

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

// 메서드 오버라이드 (PUT, DELETE)
// npm install method-override 후 사용
