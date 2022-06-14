//import express from 'express';
//import { createVoertuigtype, getVoertuigtype, getVoertuigtypes, updateVoertuigtype } from '../controllers/voertuigtypeController.js';
const express = require('express');
const controller = require('../controllers/voertuigtypeController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getVoertuigtype)
    .put(controller.updateVoertuigtype);

router.route('/')
    .get(controller.getVoertuigtypes)
    .post(controller.createVoertuigtype);

//export default router;
module.exports = router;