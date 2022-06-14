//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getBrandstoffen = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM brandstoffen", (err, results, fields) => {
        if (err) res.status(500).send({});
        res.status(200).send(results);
    })
}

const getBrandstof = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM brandstoffen WHERE bravId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(500).send("er is iets misgelopen");
        if (results == "") res.status(400).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createBrandstof = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO brandstoffen (bravNaam, bravOmschrijving)
                    VALUES (${req.body.bravNaam}, ${req.body.bravOmschrijving});`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(201).send(results);
                    })
};

const updateBrandstof = (req, res) => {
    //valideer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //query
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        brandstoffen
                    SET
                        bravNaam = ${req.body.besNaam},
                        bravOmschrijving = ${req.body.bravOmschrijving}
                    WHERE
                        bravId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(200).send(results);
                    })
};

module.exports = {getBrandstoffen, getBrandstof, createBrandstof, updateBrandstof}