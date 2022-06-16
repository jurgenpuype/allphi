//import express from 'express';
//import { createBrandstof, getBrandstof, getBrandstoffen, updateBrandstof } from '../controllers/brandstofvoertuigController.js';
const express = require('express');
const controller = require('../controllers/brandstofvoertuigController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getBrandstofvoertuig)
    .put(controller.updateBrandstofvoertuig);

router.route('/')
    .get(controller.getBrandstofvoertuigen)
    .post(controller.createBrandstofvoertuig);

module.exports = router;