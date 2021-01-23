import { Router } from 'express';
import { get, create, remove } from '../controllers/schedule';

const router = Router();

router.get('/', get);
router.post('/', create);
router.delete('/:id', remove);

export default router;
