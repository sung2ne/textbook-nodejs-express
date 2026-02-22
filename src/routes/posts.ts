// filename: src/routes/posts.ts
import { Router, Request, Response } from 'express';

const router = Router();

const posts = [
  { id: 1, title: '첫 번째 게시글', author: '홍길동', createdAt: new Date() },
  { id: 2, title: '두 번째 게시글', author: '김철수', createdAt: new Date() }
];

// GET /posts
router.get('/', (req: Request, res: Response) => {
  res.render('posts', { title: '게시글 목록', posts });
});

export default router;
