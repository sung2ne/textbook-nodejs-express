// filename: src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import expressLayouts from 'express-ejs-layouts';
import './config/passport';
import passport from 'passport';
import boardRoutes from './routes/boardRoutes';
import authRoutes from './routes/authRoutes';
import apiAuthRouter from './routes/api/auth';

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

app.use(session({
  secret: process.env.SESSION_SECRET || 'nodejs-express-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user || null;
  res.locals.siteName = 'Node.js Board';
  res.locals.year = new Date().getFullYear();
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: '홈' });
});

app.use('/boards', boardRoutes);
app.use('/auth', authRoutes);
app.use('/api/auth', apiAuthRouter);

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
