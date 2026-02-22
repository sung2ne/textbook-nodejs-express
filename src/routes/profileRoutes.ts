import { Router } from 'express';
import { show } from '../controllers/profileController';

const router = Router();

// 프로필 보기
router.get('/', show);

export default router;
