//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//converteer datumstring naar date object
const _converteerDatum = (datum) => {
    if (datum == null || datum == "") return null;

    //splits datumstring met / als separator
    const _datum = datum.split(/[/]+/);

    //probeer te converteren
    try { const date = new Date(`${_datum[1]} ${_datum[0]} ${_datum[2]}`) }
    catch { return ""}
    finally {return `${_datum[2]}/${_datum[1]}/${_datum[0]}` }
}

//converteer nullable datumstring naar date object
const _converteerNDatum = (datum) => {
    if (datum == null || datum == "") return null;

    //splits datumstring met / als separator
    const _datum = datum.split(/[/]+/);

    //probeer te converteren
    try { const date = new Date(`${_datum[1]} ${_datum[0]} ${_datum[2]}`) }
    catch { return ""}
    finally {return `"${_datum[2]}/${_datum[1]}/${_datum[0]}"` }
}

//als geboortedatum niet geconverteerd is, status 406
const _valideerDatum = (datum) => {
    if (_converteerDatum(datum) == "") return false;
    else return true;
}

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

//alle Rijbewijzen ophalen uit database. error? 400 + lege json array
const getRijbewijzen = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM rijbewijzen", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

//specifiek Rijbewijs ophalen uit database via id
const getRijbewijs = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM rijbewijzen WHERE rijId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        if (results == "") res.status(200).send(`400: database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

//nieuw Rijbewijs toevoegen aan database
const createRijbewijs = (req, res) => {
    //valideer datum
    //if (!_valideerDatum(req.body.rijAfgifte)) res.status(200).send(`400: ${req.body.rijAfgifte} kon niet herkend worden`);
    //if (!_valideerDatum(req.body.rijGeldigheid) && req.body.rijGeldigheid != null && req.body.rijGeldigheid != "") res.status(200).send(`400: ${req.body.rijGeldigheid} kon niet herkend worden`);

    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO rijbewijzen
                        (rijNummer,
                        rijAfgifte,
                        rijGeldigheid,
                        rijCategories)
                    VALUES
                        ("${req.body.rijNummer}",
                        "${_converteerDatum(req.body.rijAfgifte)}",
                        ${_converteerNDatum(req.body.rijGeldigheid)},
                        "${req.body.rijCategories}");`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen" + err);
                        res.status(201).send({
                                rijId: req.body.rijId,
                                rijNummer: req.body.rijNummer,
                                rijAfgifte: req.body.rijAfgifte,
                                rijGeldigheid: req.body.rijGeldigheid,
                                rijCategories: req.body.rijCategories
                            });
                    })
};

//specifieke bestuurder updaten via id
const updateRijbewijs = (req, res) => {
    //valideer id en data
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");
    if (!_valideerDatum(req.body.rijAfgifte))
        res.status(200).send(`400: ${req.body.rijAfgifte} kon niet herkend worden`);
    if (!_valideerDatum(req.body.rijGeldigheid) && req.body.rijGeldigheid != null)
        res.status(200).send(`400: ${req.body.rijGeldigheid} kon niet herkend worden`);

    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        rijbewijzen
                    SET
                        rijNummer = "${req.body.rijNummer}",
                        rijAfgifte = "${_converteerDatum(req.body.rijAfgifte)}",
                        rijGeldigheid = ${_converteerNDatum(req.body.rijGeldigheid)},
                        rijCategories = "${req.body.rijCategories}"
                    WHERE
                        rijId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen bij de query" + err);
                        res.status(200).send(
                            {
                                rijId: req.body.rijId,
                                rijNummer: req.body.rijNummer,
                                rijAfgifte: req.body.rijAfgifte,
                                rijGeldigheid: req.body.rijGeldigheid,
                                rijCategories: req.body.rijCategories
                            });
                    })
};

module.exports = {getRijbewijzen, getRijbewijs, createRijbewijs, updateRijbewijs}