// filename: src/index.ts
import express, { Application } from 'express';
import path from 'path';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import postsRouter from './routes/posts';

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

app.use('/posts', postsRouter);

app.use((req, res) => {
  res.status(404).render('index', { title: '404 - 페이지를 찾을 수 없습니다' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
