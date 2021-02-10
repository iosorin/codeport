import express from 'express';
import schedule from './schedule';
import activity from './activity';

const router = express.Router();

router.use('/schedule', schedule);
router.use('/activity', activity);

export { router };
