import express from 'express';
import schedule from './schedule';
import activity from './activity';
import snippets from './snippets';

const router = express.Router();

router.use('/activity', activity);
router.use('/snippets', snippets);
router.use('/schedule', schedule);

export { router };
