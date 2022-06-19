//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getBrandstoftankkaarten = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM brandstoftankkaarten", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

const getBrandstoftankkaart = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM brandstoftankkaarten WHERE bratId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        if (results == "") res.status(200).send(`400: database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createBrandstoftankkaart = (req, res) => {
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO brandstoftankkaarten (bratNaam, bratOmschrijving)
                    VALUES ("${req.body.bratNaam}", "${req.body.bratOmschrijving}");`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen" + err);
                        res.status(201).send({bratId: results.insertId, bratNaam: req.body.bratNaam, bratOmschrijving: req.body.bratOmschrijving});
                    })
};

const updateBrandstoftankkaart = (req, res) => {
    //valideer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");
   
    //query
    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        brandstoftankkaarten 
                    SET
                        bratNaam = "${req.body.bratNaam}",
                        bratOmschrijving = "${req.body.bratOmschrijving}"
                    WHERE
                        bratId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen" + err);
                        res.status(200).send({bratId: req.params.id, bratNaam: req.body.bratNaam, bratOmschrijving: req.body.bratOmschrijving});
                    })
};

const deleteBrandstoftankkaart = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`DELETE FROM brandstoftankkaarten WHERE bratId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        res.status(200).send(results);
    })
};

module.exports = {getBrandstoftankkaarten, getBrandstoftankkaart, createBrandstoftankkaart, updateBrandstoftankkaart, deleteBrandstoftankkaart }