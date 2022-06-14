//import express from 'express';
//import { createTankkaart, getTankkaart, getTankkaarten, updateTankkaart } from '../controllers/tankkaartController.js';
const express = require('express');
const controller = require('../controllers/tankkaartController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getTankkaart)
    .put(controller.updateTankkaart);

router.route('/')
    .get(controller.getTankkaarten)
    .post(controller.createTankkaart);

module.exports = router;