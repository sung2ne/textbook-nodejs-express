// filename: src/routes/boardRoutes.ts
import { Router } from 'express';
import * as boardController from '../controllers/boardController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

// 목록 조회
router.get('/', boardController.list);

// 등록 폼 (로그인 필요)
router.get('/new', requireAuth, boardController.create);

// 등록 처리 (로그인 필요)
router.post('/', requireAuth, boardController.store);

// 상세 조회
router.get('/:id', boardController.show);

export default router;
