import express from 'express';
import { seriesPage } from '../controllers/series.js';

const router = express.Router();

router.get('/:seriesId', seriesPage);

export default router;
