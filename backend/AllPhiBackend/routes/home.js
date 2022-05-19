import express from 'express';
import mysql from 'mysql2';
import config from '../database/config.js';

const router = express.Router();

//homepage als dev test voor connectie db_test (zie config.js)
router
    .route('/')
    .get((req, res) => {
        const connection = mysql.createConnection(config);
        connection.query("SELECT * FROM table_test", (err, results, fields) => {
            if (err) {
                console.log(err);
                res.status(404).send(err);
            } 
            console.log("fetched table?", results);
            res.send(results);
        });
    });


export default router;