//import express from 'express';
//import { createRijbewijs, getRijbewijs, getRijbewijzen, updateRijbewijs } from '../controllers/rijbewijsController.js';
//import { getRijbewijstypeViaRijbewijs } from '../controllers/rijbewijstypeController.js';
const express = require('express');
const controller = require('../controllers/rijbewijsController.js');
const controllerRbt = require('../controllers/rijbewijstypeController.js');
const router = express.Router();

//met rijbewijs id, geef alle rijbewijstypes gelinkt aan dit rijbewijs
router.route('/categories/:id')
    .get(controllerRbt.getRijbewijstypeViaRijbewijs);

//select/update via id
router.route('/:id')
    .get(controller.getRijbewijs)
    .put(controller.updateRijbewijs);

//select * en update
router.route('/')
    .get(controller.getRijbewijzen)
    .post(controller.createRijbewijs);

module.exports = router;