import { Router } from 'express';
import { getAll, create, remove } from '../controllers/schedule';

const router = Router();

router.get('/get', getAll);
router.post('/post', create);
router.delete('/remove/:id', remove);

export default router;
