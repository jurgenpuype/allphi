//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

const getVoertuigen = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM voertuigen", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

const getVoertuig = (req, res) => {
    if (!_valideerId(req.params.id))
        res.status(200).send("400 id moet een positieve integer zijn");

    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM voertuigen WHERE voeId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500 er is iets misgelopen");
        if (results == "") res.status(200).send(`400 database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

const createVoertuig = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO voertuigen
                        (voeMerk,
                        voeModel,
                        voeChasisnummer,
                        voeNummerplaat,
                        voeBrandstoftype,
                        voeVoertuigtype,
                        voeRijbewijs,
                        voeKleur,
                        voeAantalDeuren,
                        voeVerwijderd)
                    VALUES
                        ("${req.body.voeMerk}",
                        "${req.body.voeModel}",
                        "${req.body.voeChasisnummer}",
                        "${req.body.voeNummerplaat}",
                        ${req.body.voeBrandstoftype},
                        ${req.body.voeTypeWagen},
                        ${req.body.voeRijbewijs},
                        "${req.body.voeKleur}",
                        ${req.body.voeAantalDeuren},
                        ${req.body.voeVerwijderd});`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500 er is iets misgelopen" + err);
                        res.status(201).send(
                       {voeId: results.insertId, 
                        voeMerk: req.body.voeMerk,
                        voeModel: req.body.voeModel,
                        voeChasisnummer: req.body.voeChasisnummer,
                        voeNummerplaat: req.body.voeNummerplaat,
                        voeBrandstoftype: req.body.voeBrandstoftype,
                        voeVoertuigtype: req.body.voeVoertuigtype,
                        voeRijbewijs: req.body.voeRijbewijs,
                        voeKleur: req.body.voeKleur,
                        voeAantalDeuren: req.body.voeAantalDeuren,
                        voeVerwijderd: req.body.voeVerwijderd});
                    })
};

const updateVoertuig = (req, res) => {
    if (!_valideerId(req.params.id))
        res.status(200).send("400 id moet een positieve integer zijn");

    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        voertuigen
                    SET
                        voeMerk = "${req.body.voeMerk}",
                        voeModel = "${req.body.voeModel}",
                        voeChasisnummer = "${req.body.voeChasisnummer}",
                        voeNummerplaat = "${req.body.voeNummerplaat}",
                        voeBrandstoftype = ${req.body.voeBrandstoftype},
                        voeVoertuigtype = ${req.body.voeTypeWagen},
                        voeRijbewijs = ${req.body.voeRijbewijs},
                        voeKleur = "${req.body.voeKleur}",
                        voeAantalDeuren = ${req.body.voeAantalDeuren},
                        voeVerwijderd = ${req.body.voeVerwijderd}
                    WHERE
                        voeId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500 er is iets misgelopen" + err);
                        res.status(200).send({voeId: req.params.id, 
                        voeMerk: req.body.voeMerk,
                        voeModel: req.body.voeModel,
                        voeChasisnummer: req.body.voeChasisnummer,
                        voeNummerplaat: req.body.voeNummerplaat,
                        voeBrandstoftype: req.body.voeBrandstoftype,
                        voeVoertuigtype: req.body.voeVoertuigtype,
                        voeRijbewijs: req.body.voeRijbewijs,
                        voeKleur: req.body.voeKleur,
                        voeAantalDeuren: req.body.voeAantalDeuren,
                        voeVerwijderd: req.body.voeVerwijderd});
                    })
};

const deleteVoertuig = (req, res) => {
    if (!_valideerId(req.params.id))
        res.status(200).send("400 id moet een positieve integer zijn");

    const _connection = mysql.createConnection(config);
    _connection.query(`DELETE FROM voertuigen WHERE voeId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500 er is iets misgelopen");
        res.status(200).send(results);
    })
};

module.exports = {getVoertuigen, getVoertuig, createVoertuig, updateVoertuig, deleteVoertuig }