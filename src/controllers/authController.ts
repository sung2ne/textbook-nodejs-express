import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User from '../models/User';

// 회원 가입 화면
export const registerForm = (req: Request, res: Response) => {
  res.render('auth/register', {
    title: '회원 가입',
    errors: req.flash('error'),
    formData: null
  });
};

// 회원 가입 처리
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    const errors: { msg: string }[] = [];

    if (!name || name.length < 2) {
      errors.push({ msg: '이름은 2자 이상이어야 합니다.' });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push({ msg: '올바른 이메일 형식이 아닙니다.' });
    }

    if (!phone || !/^010-\d{4}-\d{4}$/.test(phone)) {
      errors.push({ msg: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)' });
    }

    if (!password || password.length < 6) {
      errors.push({ msg: '비밀번호는 6자 이상이어야 합니다.' });
    }

    if (password !== confirmPassword) {
      errors.push({ msg: '비밀번호가 일치하지 않습니다.' });
    }

    if (errors.length > 0) {
      return res.render('auth/register', {
        title: '회원 가입',
        errors,
        formData: { name, email, phone }
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', {
        title: '회원 가입',
        errors: [{ msg: '이미 사용 중인 이메일입니다.' }],
        formData: { name, email, phone }
      });
    }

    await User.create({ name, email, phone, password });

    req.flash('success', '회원 가입이 완료되었습니다. 로그인해주세요.');
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

// 로그인 화면
export const loginForm = (req: Request, res: Response) => {
  res.render('auth/login', {
    title: '로그인',
    error: req.flash('error'),
    success: req.flash('success')
  });
};

// 로그인 처리 (Passport)
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: Express.User | false, info: { message?: string }) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash('error', info?.message || '로그인에 실패했습니다.');
      return res.redirect('/auth/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
      }

      req.flash('success', `${user.name}님, 환영합니다!`);
      res.redirect('/');
    });
  })(req, res, next);
};

// 로그아웃
export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', '로그아웃되었습니다.');
    res.redirect('/auth/login');
  });
};

// 아이디 찾기 화면
export const findIdForm = (req: Request, res: Response) => {
  res.render('auth/find-id', {
    title: '아이디 찾기',
    result: null,
    error: null
  });
};

// 아이디 찾기 처리
export const findId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findOne({ name, phone });

    if (!user) {
      return res.render('auth/find-id', {
        title: '아이디 찾기',
        result: null,
        error: '일치하는 회원 정보를 찾을 수 없습니다.'
      });
    }

    const maskedEmail = user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    res.render('auth/find-id', {
      title: '아이디 찾기',
      result: maskedEmail,
      error: null
    });
  } catch (error) {
    next(error);
  }
};

// 비밀번호 초기화 화면
export const resetPasswordForm = (req: Request, res: Response) => {
  res.render('auth/reset-password', {
    title: '비밀번호 초기화',
    step: 'verify',
    userId: null,
    error: null
  });
};

// 비밀번호 초기화 처리
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { step } = req.body;

    if (step === 'verify') {
      const { email, name, phone } = req.body;
      const user = await User.findOne({ email, name, phone });

      if (!user) {
        return res.render('auth/reset-password', {
          title: '비밀번호 초기화',
          step: 'verify',
          userId: null,
          error: '일치하는 회원 정보를 찾을 수 없습니다.'
        });
      }

      return res.render('auth/reset-password', {
        title: '비밀번호 초기화',
        step: 'reset',
        userId: user._id.toString(),
        error: null
      });
    }

    if (step === 'reset') {
      const { userId, newPassword, confirmPassword } = req.body;

      if (newPassword.length < 6) {
        return res.render('auth/reset-password', {
          title: '비밀번호 초기화',
          step: 'reset',
          userId,
          error: '비밀번호는 6자 이상이어야 합니다.'
        });
      }

      if (newPassword !== confirmPassword) {
        return res.render('auth/reset-password', {
          title: '비밀번호 초기화',
          step: 'reset',
          userId,
          error: '비밀번호가 일치하지 않습니다.'
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.redirect('/auth/reset-password');
      }

      user.password = newPassword;
      await user.save();

      req.flash('success', '비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.');
      return res.redirect('/auth/login');
    }

    res.redirect('/auth/reset-password');
  } catch (error) {
    next(error);
  }
};

// 이메일 중복 검사
export const checkEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ exists: false, message: '이메일이 필요합니다.' });
      return;
    }
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (error) {
    next(error);
  }
};
