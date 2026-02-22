import { Router } from 'express';
import {
  show,
  editForm, update,
  changePasswordForm, changePassword,
  deleteAccountForm, deleteAccount,
} from '../controllers/profileController';

const router = Router();

// 프로필 보기
router.get('/', show);

// 프로필 수정
router.get('/edit', editForm);
router.post('/edit', update);

// 비밀번호 변경
router.get('/change-password', changePasswordForm);
router.post('/change-password', changePassword);

// 회원 탈퇴
router.get('/delete-account', deleteAccountForm);
router.post('/delete-account', deleteAccount);

export default router;
