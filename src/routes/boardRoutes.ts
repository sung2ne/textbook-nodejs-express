// filename: src/routes/boardRoutes.ts
import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

// 목록 조회
router.get('/', boardController.list);

// 등록 폼
router.get('/new', boardController.create);

// 상세 조회
router.get('/:id', boardController.show);

export default router;
