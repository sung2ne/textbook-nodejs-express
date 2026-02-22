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

// 비밀번호 변경 화면
export const changePasswordForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.render('profile/change-password', { title: '비밀번호 변경', error: null });
  } catch (error) {
    next(error);
  }
};

// 비밀번호 변경 처리
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById((req.user as any)._id);
    if (!user) {
      res.redirect('/auth/login');
      return;
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.render('profile/change-password', {
        title: '비밀번호 변경',
        error: '현재 비밀번호가 올바르지 않습니다.',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      res.render('profile/change-password', {
        title: '비밀번호 변경',
        error: '새 비밀번호가 일치하지 않습니다.',
      });
      return;
    }
    user.password = newPassword;
    await user.save();
    req.flash('success', '비밀번호가 변경되었습니다.');
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
};
