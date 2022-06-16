//import express from 'express';
//import { createBrandstoftankkaart, getBrandstoftankkaart, getBrandstoftankkaarten, updateBrandstoftankkaart } from '../controllers/brandstoftankkaartController.js';
const express = require('express');
const controller = require('../controllers/brandstoftankkaartController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getBrandstoftankkaart)
    .put(controller.updateBrandstoftankkaart);

router.route('/')
    .get(controller.getBrandstoftankkaarten)
    .post(controller.createBrandstoftankkaart);

module.exports = router;