import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', '로그인이 필요합니다.');
  res.redirect('/auth/login');
};
