import { Router } from 'express';
import {
  registerForm, register,
  loginForm, login, logout,
  findIdForm, findId,
  resetPasswordForm, resetPassword,
  checkEmail,
} from '../controllers/authController';

const router = Router();

// 회원 가입
router.get('/register', registerForm);
router.post('/register', register);

// 로그인 / 로그아웃
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);

// 아이디 찾기
router.get('/find-id', findIdForm);
router.post('/find-id', findId);

// 비밀번호 초기화
router.get('/reset-password', resetPasswordForm);
router.post('/reset-password', resetPassword);

// 이메일 중복 검사
router.post('/check-email', checkEmail);

export default router;
