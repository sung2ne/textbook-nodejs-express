// filename: src/routes/boardRoutes.ts
import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

router.get('/', boardController.list);
router.get('/new', boardController.create);
router.post('/', boardController.store);
router.get('/:id', boardController.show);
router.get('/:id/edit', boardController.edit);
router.put('/:id', boardController.update);

export default router;
