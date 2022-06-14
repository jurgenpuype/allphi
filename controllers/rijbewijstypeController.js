//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getRijbewijstypes = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM rijbewijstypes", (err, results, fields) => {
        if (err) res.status(500).send({});
        res.status(200).send(results);
    })
}

const getRijbewijstype = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM rijbewijstypes WHERE rbtId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(500).send("er is iets misgelopen");
        if (results == "") res.status(400).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createRijbewijstype = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO rijbewijstypes (rbtNaam, rbtOmschrijving)
                    VALUES (${req.body.rbtNaam}, ${req.body.rbtOmschrijving});`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(201).send(results);
                    })
};

const updateRijbewijstype = (req, res) => {
    //valideer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //query
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        rijbewijstypes
                    SET
                        rbtNaam = ${req.body.rbtNaam},
                        rbtOmschrijving = ${req.body.rbtOmschrijving}
                    WHERE
                        rbtId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(200).send(results);
                    })
};

const getRijbewijstypeViaRijbewijs = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT rbtNaam, rbtOmschrijving FROM rijbewijstypes WHERE rbtId
                        IN (select rtrRijbewijsType from rijbewijstyperijbewijzen where rtrRijbewijsId = ${req.params.id})`,
        (err, results, fields) => {
        if (err) res.status(500).send("er is iets misgelopen");
        if (results == "") res.status(400).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

module.exports = {getRijbewijstypes, getRijbewijstype, createRijbewijstype, updateRijbewijstype, getRijbewijstypeViaRijbewijs}