//import mysql from "mysql2";
//import config from '../database/config/config.js';
const mysql = require('mysql2');
const config = require('../database/config/config.js');

//Rijkregisternummer validatie
const _valideerRijksregisterNr = (RRNr, geboortedatum) => {
    //split rijksregisternummer in een array met . en - als separators
    //geboortedatum met / als separator
    //beide inputs zijn strings
    const _rrnr = RRNr.split(/[-.]+/);
    const _datum = geboortedatum.split(/[/]+/);

    //controle getal. als geboortejaar na 1999 is, een 2 ervoor toevoegen
    let _controle = _rrnr[0] + _rrnr[1] + _rrnr[2] + _rrnr[3];
    if (parseInt(_datum[2]) >= 2000) { _controle = "2" + _controle }

    //alle condities
    if (
        //RRNr lengte: 15
        RRNr.length == 15
        //RRNr jaar: rrnr jaar == geboortejaar
        && _rrnr[0] == _datum[2].substr(2)
        //RRNr maand/dag: maand en dag == geboortemaand en -dag, of zijn beiden "00". rrnr-maand mag ook +20 of +40 zijn
        && (//als beiden 00 zijn
            (_rrnr[1] == "00" && _rrnr[2] == "00")
            //of als geboortedag overeenkomt
            || (_rrnr[2] == _datum[0]
                //en geboortemaand overeenkomt na restdeling met 20
                //parse naar int, restdeling 20, vergelijk met geboorte
                && parseInt(_rrnr[1]) % 20 == parseInt(_datum[1])))
        //RRNr 3-cijfercode: tussen 001 en 998
        //parse naar int, vergelijk
        && (1 <= parseInt(_rrnr[3]) <= 998)
        //RRNR controlegetal: overig RRNr als een geheel cijfer, restdeling door 97. 97 - modulus == controlegetal
        && ((97 - (_controle % 97)) == parseInt(_rrnr[4]))
    ) return true;
    else return false;
}

//converteer datumstring naar date object
const _converteerDatum = (datum) => {
    //splits datumstring met / als separator
    const _datum = datum.split(/[/]+/);

    //probeer te converteren
    try { const date = new Date(`${_datum[1]} ${_datum[0]} ${_datum[2]}`) }
    catch { return ""}
    finally {return `${_datum[2]}/${_datum[1]}/${_datum[0]}` }
}

//valideer datum
const _valideerDatum = (datum) => {
    if (_converteerDatum(datum) == "") return false;
}

//controleer dat id een positieve integer is
const _valideerId = (id) => {
    if (Number.isInteger(parseInt(id)) && id >= 0) return true;
    else return false;
}

//alle bestuurders ophalen uit database
const getBestuurders = (req, res) => {
    const _connection = mysql.createConnection(config);
    _connection.query("SELECT * FROM bestuurders", (err, results, fields) => {
        if (err) res.status(200).send({});
        res.status(200).send(results);
    })
}

//specifieke bestuurder ophalen uit database via id
const getBestuurder = (req, res) => {
    //controleer id
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");

    //connectie
    const _connection = mysql.createConnection(config);
    _connection.query(`SELECT * FROM bestuurders WHERE besId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(200).send("500: er is iets misgelopen");
        if (results == "") res.status(200).send(`database vond geen resultaat met id ${req.params.id}`);
        res.status(200).send(results);
    })
};

//nieuwe bestuurder toevoegen aan database
const createBestuurder = (req, res) => {
    //valideer rijksregister en datum
    if (_valideerDatum(req.body.besGeboortedatum) === false) res.status(200).send(`400: geboortedatum ${req.body.besGeboortedatum} kon niet herkend worden`);
    if (!_valideerRijksregisterNr(req.body.besRijksregisterNr, req.body.besGeboortedatum)) res.status(200).send("400: controle rijksregisternummer gaf een fout");
   
    //insert query
    const _connection = mysql.createConnection(config);
    _connection.query(`INSERT INTO
                        bestuurders
                        (besNaam,
                        besVoornaam,
                        besStraatNr,
                        besPostcode,
                        besGemeente,
                        besLand,
                        besGeboortedatum,
                        besRijksregisterNr,
                        besRijbewijs,
                        besVoertuig,
                        besTankkaart,
                        besVerwijderd)
                    VALUES
                        ("${req.body.besNaam}",
                        "${req.body.besVoornaam}",
                        "${req.body.besStraatNr}",
                        "${req.body.besPostcode}",
                        "${req.body.besGemeente}",
                        "${req.body.besLand}",
                        "${_converteerDatum(req.body.besGeboortedatum)}",
                        "${req.body.besRijksregisterNr}",
                        ${req.body.besRijbewijs},
                        ${req.body.besVoertuig},
                        ${req.body.besTankkaart},
                        ${req.body.besVerwijderd});`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen bij de query:" + err);
                        res.status(201).send(
                   {besId: results.insertId, 
                   besNaam: req.body.besNaam,
                   besVoornaam: req.body.besVoornaam,
                   besStraatNr: req.body.besStraatNr,
                   besPostcode: req.body.besPostcode,
                   besGemeente: req.body.besGemeente, 
                   besLand: req.body.besLand,
                   besGeboortedatum: req.body.besGeboortedatum,
                   besRijksregisterNr: req.body.besRijksregisterNr,
                   besRijbewijs: req.body.besRijbewijs,
                   besVoertuig: req.body.besVoertuig,
                   besTankkaart: req.body.besTankkaart,
                   besVerwijderd: req.body.besVerwijderd});
                    })
};

//specifieke bestuurder updaten via id
const updateBestuurder = (req, res) => {
    //valideer id, rijksregisternummer en geboortedatum
    if (!_valideerId(req.params.id))
        res.status(200).send("400: id moet een positieve integer zijn");
    if (!_valideerRijksregisterNr(req.body.besRijksregisterNr, req.body.besGeboortedatum)) res.status(200).send("400: controle rijksregisternummer gaf een fout");

    const _connection = mysql.createConnection(config);
    _connection.query(`UPDATE
                        bestuurders
                    SET
                        besNaam = "${req.body.besNaam}",
                        besVoornaam = "${req.body.besVoornaam}",
                        besStraatNr = "${req.body.besStraatNr}",
                        besPostcode = "${req.body.besPostcode}",
                        besGemeente = "${req.body.besGemeente}", 
                        besLand = "${req.body.besLand}",
                        besGeboortedatum = "${_converteerDatum(req.body.besGeboortedatum)}",
                        besRijksregisterNr = "${req.body.besRijksregisterNr}",
                        besRijbewijs = ${req.body.besRijbewijs},
                        besVoertuig = ${req.body.besVoertuig},
                        besTankkaart = ${req.body.besTankkaart},
                        besVerwijderd = ${req.body.besVerwijderd}
                    WHERE
                        besId = ${req.params.id};`,
                    (err, results, fields) => {
                        if (err) res.status(200).send("500: er is iets misgelopen");
                        res.status(200).send(
                   {besId: req.params.id, 
                   besNaam: req.body.besNaam,
                   besVoornaam: req.body.besVoornaam,
                   besStraatNr: req.body.besStraatNr,
                   besPostcode: req.body.besPostcode,
                   besGemeente: req.body.besGemeente, 
                   besLand: req.body.besLand,
                   besGeboortedatum: req.body.besGeboortedatum,
                   besRijksregisterNr: req.body.besRijksregisterNr,
                   besRijbewijs: req.body.besRijbewijs,
                   besVoertuig: req.body.besVoertuig,
                   besTankkaart: req.body.besTankkaart,
                   besVerwijderd: req.body.besVerwijderd
                   });
                    })
};

module.exports = {getBestuurders, getBestuurder, createBestuurder, updateBestuurder}