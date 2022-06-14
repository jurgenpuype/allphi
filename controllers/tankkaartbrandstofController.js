//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

//alle Rijbewijzen ophalen uit database. error? 400 + lege json array
const getTankkaartbrandstoffen = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM tankkaartbrandstoffen", (err, results, fields) => {
        if (err) res.status(500).send({});
        res.status(200).send(results);
    })
}

//specifiek Rijbewijs ophalen uit database via id
const getTankkaartbrandstof = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM tankkaartbrandstoffen WHERE tabrId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(500).send("er is iets misgelopen");
        if (results == "") res.status(400).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

//nieuw Rijbewijs toevoegen aan database
const createTankkaartbrandstof = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO tankkaartbrandstoffen
                        (tabrTankkaartId,
                        tabrBrandstofType)
                    VALUES
                        (${req.body.tabrTankkaartId},
                        ${req.body.tabrBrandstofType}
                        );`,
        (err, results, fields) => {
            if (err) res.status(500).send("er is iets misgelopen");
            res.status(201).send(results);
        })
};

//specifieke bestuurder updaten via id
const updateTankkaartbrandstof = (req, res) => {
    //valideer id, rijksregisternummer en geboortedatum
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    //valideerRijksregisterNr(req.body.besRijksregisterNr);
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        tankkaartbrandstoffen
                    SET
                        tabrTankkaartId = ${req.body.tabrTankkaartId},
                        tabrBrandstofType = ${req.body.tabrBrandstofType}
                    WHERE
                        tabrId = ${req.params.id};`,
        (err, results, fields) => {
            if (err) res.status(500).send("er is iets misgelopen");
            res.status(200).send(results);
        })
};

module.exports = {getTankkaartbrandstoffen, getTankkaartbrandstof, createTankkaartbrandstof, updateTankkaartbrandstof}