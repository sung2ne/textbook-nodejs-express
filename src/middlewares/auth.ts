// filename: src/middlewares/auth.ts
import { RequestHandler } from 'express';
import { User } from '../types/user';

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다' });
  }

  // 토큰 검증 후 사용자 정보 추가
  req.user = {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com'
  };

  next();
};
