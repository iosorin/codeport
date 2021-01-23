import express from 'express';
import schedule from './schedule';

const router = express.Router();

router.use('/schedule', schedule);

export { router };
