import { Router } from 'express';
import { get, create, update, remove } from '../controllers/schedule';

const router = Router();

router.get('/', get);
router.post('/', create);
router.put('/', update);
router.delete('/:id', remove);

export default router;
