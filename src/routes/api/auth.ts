// src/routes/api/auth.ts
import { Router, Request, Response } from 'express';
import User from '../../models/User';

const router = Router();

/**
 * 이메일 중복 검사 API
 * GET /api/auth/check-email?email=xxx
 */
router.get('/check-email', async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.json({
        available: false,
        message: '이메일을 입력해주세요.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        available: false,
        message: '올바른 이메일 형식이 아닙니다.'
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.json({
        available: false,
        message: '이미 사용 중인 이메일입니다.'
      });
    }

    res.json({
      available: true,
      message: '사용 가능한 이메일입니다.'
    });

  } catch (err) {
    console.error('이메일 중복 검사 오류:', err);
    res.status(500).json({
      available: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

export default router;
