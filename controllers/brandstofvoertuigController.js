//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getBrandstofvoertuigen = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM brandstofvoertuigen", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

const getBrandstofvoertuig = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM brandstofvoertuigen WHERE bravId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        if (results == "") res.status(200).send(`400: database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createBrandstofvoertuig = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO brandstofvoertuigen (bravNaam, bravOmschrijving)
                    VALUES ("${req.body.bravNaam}", "${req.body.bravOmschrijving}");`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen" + err);
                        res.status(201).send({bravId: results.insertId, bravNaam: req.body.bravNaam, bravOmschrijving: req.body.bravOmschrijving});
                    })
};

const updateBrandstofvoertuig = (req, res) => {
    //valideer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");
   
    //query
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        brandstofvoertuigen
                    SET
                        bravNaam = "${req.body.bravNaam}",
                        bravOmschrijving = "${req.body.bravOmschrijving}"
                    WHERE
                        bravId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen" + err);
                        res.status(200).send({bravId: req.params.id, bravNaam: req.body.bravNaam, bravOmschrijving: req.body.bravOmschrijving});
                    })
};

const deleteBrandstofvoertuig = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`DELETE FROM brandstofvoertuigen WHERE bravId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        res.status(200).send(results);
    })
};

module.exports = {getBrandstofvoertuigen, getBrandstofvoertuig, createBrandstofvoertuig, updateBrandstofvoertuig, deleteBrandstofvoertuig}