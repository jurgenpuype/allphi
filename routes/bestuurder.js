//import express from 'express';
//import { createBestuurder, getBestuurder, getBestuurders, updateBestuurder } from '../controllers/bestuurderController.js';
const express = require('express');
const controller = require('../controllers/bestuurderController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getBestuurder)
    .put(controller.updateBestuurder)
    .delete(controller.deleteBestuurder);

router.route('/')
    .get(controller.getBestuurders)
    .post(controller.createBestuurder);

module.exports = router;