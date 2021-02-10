import { Router } from 'express';
import { get, update, remove } from '../controllers/activity';

const router = Router();

router.get('/', get);
router.put('/', update);
router.delete('/:id', remove);

export default router;
