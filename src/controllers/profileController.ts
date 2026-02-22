import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

// 프로필 보기
export const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req.user as any)._id);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }
    res.render('profile/view', { title: '프로필', user });
  } catch (error) {
    next(error);
  }
};
