//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//converteer datumstring naar date object
const _converteerDatum = (datum) => {
    //splits datumstring met / als separator
    const _datum = datum.split(/[/]+/);

    //probeer te converteren
    try { return new Date(`${_datum[1]} ${_datum[0]} ${_datum[2]}`) }
    catch { return false}
}

//als geboortedatum niet geconverteerd is, status 406
const _valideerDatum = (datum) => {
    if (_converteerDatum(datum) == false) return false;
    else return true;
}

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getTankkaarten = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM tankkaarten", (err, results, fields) => {
        if (err) res.status(500).send({});
        res.status(200).send(results);
    })
}

const getTankkaart = (req, res) => {
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");

    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM tankkaarten WHERE tanId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(500).send("er is iets misgelopen");
        if (results == "") res.status(400).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createTankkaart = (req, res) => {
    if (!_valideerDatum(req.body.tanGeldigheidsdatum))
        res.status(400).send(`datum ${req.body.tanGeldigheidsdatum} kon niet herkend worden`);

    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO tankkaarten
                        (tanKaartnummer,
                        tanGeldigheidsdatum,
                        tanPincode,
                        tanGeblokkeerd)
                    VALUES
                        (${req.body.tanKaartnummer},
                        ${_converteerDatum(req.body.tanGeldigheidsdatum)},
                        ${req.body.tanPincode},
                        ${req.body.tanGeblokkeerd});`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(201).send(results);
                    })
};

const updateTankkaart = (req, res) => {
    if (!_valideerId(req.params.id))
        res.status(400).send("id moet een positieve integer zijn");
    if (!_valideerDatum(req.body.tanGeldigheidsdatum))
        res.status(400).send(`${req.body.tanGeldigheidsdatum} kon niet herkend worden`);

    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        tankkaarten
                    SET
                        tanKaartnummer = ${req.body.rijNummer},
                        tanGeldigheidsdatum = ${_converteerDatum(req.body.tanGeldigheidsdatum)},
                        tanPincode = ${req.body.tanPincode},
                        tanGeblokkeerd = ${req.body.tanGeblokkeerd}
                    WHERE
                        tanId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(500).send("er is iets misgelopen");
                        res.status(200).send(results);
                    })
};

module.exports = {getTankkaarten, getTankkaart, createTankkaart, updateTankkaart}