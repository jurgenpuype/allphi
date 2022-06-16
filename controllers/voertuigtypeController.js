//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getVoertuigtypes = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM voertuigtypes", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

const getVoertuigtype = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400 id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM voertuigtypes WHERE voetId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500 er is iets misgelopen");
        if (results == "") res.status(200).send(`400 database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

//nieuwe brandstof toevoegen aan database
const createVoertuigtype = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO voertuigtypes (voetNaam, voetOmschrijving)
                    VALUES ("${req.body.voetNaam}", "${req.body.voetOmschrijving}");`,
        (err, results, fields) => {
            if (err) res.status(200).send("500 er is iets misgelopen");
            res.status(201).send(results);
        })
};

//specifieke bestuurder updaten via id
const updateVoertuigtype = (req, res) => {
    //valideer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400 id moet een positieve integer zijn");

    //query
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        voertuigtypes
                    SET
                        voetNaam = "${req.body.voetNaam}",
                        voetOmschrijving = "${req.body.voetOmschrijving}"
                    WHERE
                        voetId = ${req.params.id};`,
        (err, results, fields) => {
            if (err) res.status(200).send("500 er is iets misgelopen");
            res.status(200).send(results);
        })
};

module.exports = {updateVoertuigtype, createVoertuigtype,getVoertuigtype, getVoertuigtypes}