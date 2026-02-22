// filename: src/routes/v2/boardRoutes.ts
// 리팩토링된 라우터
import { Router } from 'express';
import * as boardController from '../../controllers/boardController';

const router = Router();

router.route('/')
  .get(boardController.list)
  .post(boardController.store);

router.get('/new', boardController.create);

router.route('/:id')
  .get(boardController.show)
  .put(boardController.update)
  .delete(boardController.destroy);

router.get('/:id/edit', boardController.edit);

export default router;
