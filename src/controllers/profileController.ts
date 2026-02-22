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

// 프로필 수정 화면
export const editForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req.user as any)._id);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }
    res.render('profile/edit', { title: '프로필 수정', user, error: null });
  } catch (error) {
    next(error);
  }
};

// 프로필 수정 처리
export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await User.findById((req.user as any)._id);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }
    user.name = name;
    user.email = email;
    await user.save();
    req.flash('success', '프로필이 수정되었습니다.');
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
};
