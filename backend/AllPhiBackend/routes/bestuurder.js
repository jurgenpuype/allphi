import express from 'express';
import { createBestuurder, getBestuurder, getBestuurders, updateBestuurder } from '../controllers/bestuurderController.js';
const router = express.Router();

router.route('/:id')
    .get(getBestuurder)
    .put(updateBestuurder);

router.route('/')
    .get(getBestuurders)
    .post(createBestuurder);

export default router;