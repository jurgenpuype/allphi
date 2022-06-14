//import express from 'express';
//import { createVoertuig, getVoertuig, getVoertuigen, updateVoertuig } from '../controllers/voertuigController.js';
const express = require('express');
const controller = require('../controllers/voertuigController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getVoertuig)
    .put(controller.updateVoertuig);

router.route('/')
    .get(controller.getVoertuigen)
    .post(controller.createVoertuig);

//export default router;
module.exports = router;