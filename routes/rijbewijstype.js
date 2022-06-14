//import express from 'express';
//import { createRijbewijstype, getRijbewijstype, getRijbewijstypes, updateRijbewijstype } from '../controllers/rijbewijstypeController.js';
const express = require('express');
const controller = require('../controllers/rijbewijstypeController.js');
const router = express.Router();



//via rijbewijstype id, get of update data
router.route('/:id')
    .get(controller.getRijbewijstype)
    .put(controller.updateRijbewijstype);

//alle rijbewijzen ophalen, nieuw rijbewijs aanmaken
router.route('/')
    .get(controller.getRijbewijstypes)
    .post(controller.createRijbewijstype);

module.exports = router;