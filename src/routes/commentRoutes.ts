import { Router } from 'express';
import { store, index, update, destroy } from '../controllers/commentController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

// 댓글 등록
router.post('/:boardId', requireAuth, store);

// 댓글 목록 조회
router.get('/:boardId/list', index);

// 댓글 수정
router.put('/:id', requireAuth, update);

// 댓글 삭제
router.delete('/:id', requireAuth, destroy);

export default router;
