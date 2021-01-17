import express from 'express';

import scheduleRoutes from './schedule';

const router = express.Router();

router.use('/schedule', scheduleRoutes);

export { router };
