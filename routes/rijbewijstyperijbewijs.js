//import express from 'express';
//import { createRijbewijstyperijbewijs, getRijbewijstyperijbewijs, getRijbewijstyperijbewijzen, updateRijbewijstyperijbewijs, deleteRijbewijstyperijbewijs } from '../controllers/rijbewijstyperijbewijsController.js';
const express = require('express');
const controller = require('../controllers/rijbewijstyperijbewijsController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getRijbewijstyperijbewijs)
    .put(controller.updateRijbewijstyperijbewijs)
    .delete(controller.deleteRijbewijstyperijbewijs);

router.route('/')
    .get(controller.getRijbewijstyperijbewijzen)
    .post(controller.createRijbewijstyperijbewijs);

module.exports = router;