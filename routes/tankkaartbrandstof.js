//import express from 'express';
//import { createTankkaartbrandstof, getTankkaartbrandstof, getTankkaartbrandstoffen, updateTankkaartbrandstof } from '../controllers/tankkaartbrandstofController.js';
const express = require('express');
const controller = require('../controllers/tankkaartbrandstofController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getTankkaartbrandstof)
    .put(controller.updateTankkaartbrandstof);

router.route('/')
    .get(controller.getTankkaartbrandstoffen)
    .post(controller.createTankkaartbrandstof);

//export default router;
module.exports = router;