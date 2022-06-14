//import express from 'express';
//import { createBrandstof, getBrandstof, getBrandstoffen, updateBrandstof } from '../controllers/brandstofvoertuigController.js';
const express = require('express');
const controller = require('../controllers/brandstofvoertuigController.js');
const router = express.Router();

router.route('/:id')
    .get(controller.getBrandstof)
    .put(controller.updateBrandstof);

router.route('/')
    .get(controller.getBrandstoffen)
    .post(controller.createBrandstof);

module.exports = router;