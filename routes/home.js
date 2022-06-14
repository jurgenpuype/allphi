//express
//import express from 'express';
const express = require('express');
const router = express.Router();

//database
//import config from '../database/config/config.js';
//import mysql from 'mysql2';
const config = require('../database/config/config.js');
const mysql = require('mysql2');

router
    .route('/')
    .get(async (req, res) => {
        const connection = mysql.createConnection(config);
        connection.query(`SHOW TABLES;`, (err, results, fields) => {
                if (err) {console.log(err); res.status(404).send(err);}
                res.status(200).send(results);
            }
        )
    });

module.exports = router;