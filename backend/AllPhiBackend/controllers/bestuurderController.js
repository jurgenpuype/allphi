import mysql from "mysql2";
import config from '../database/config.js';

//tijdelijke data
const bestuurders = [
    {
        "besId": 3,
        "besNaam": "Clarkson",
        "besVoornaam": "Jeremy",
        "besStraatNr": "Parkland Court, Addison Road",
        "besPostcode": "W14 8AN",
        "besGemeente": "West Kensington",
        "besLand": "United Kingdom",
        "besGeboortedatum": "11/04/1960",
        "besRijksregisterNr": "60.04.11-201.78",
        "besRijbewijs": "",
        "besVoertuig": 2,
        "besTankkaart": 1,
        "besVerwijderd": 0
    },
    {
        "besId": 4,
        "besNaam": "Clarkson",
        "besVoornaam": "Jeremy",
        "besStraatNr": "Parkland Court, Addison Road",
        "besPostcode": "W14 8AN",
        "besGemeente": "West Kensington",
        "besLand": "United Kingdom",
        "besGeboortedatum": "11/04/1960",
        "besRijksregisterNr": "60.04.11-201.78",
        "besRijbewijs": "",
        "besVoertuig": 2,
        "besTankkaart": 1,
        "besVerwijderd": 0
    }
]

//Rijkregisternummer validatie
const valideerRijksregisterNr = (RRNr) => {
}

//controleer dat id een positieve integer is
const checkValidId = (id) => {
    if (!Number.isInteger(id) || id < 0) {
        res.status(400).send("id moet een positieve integer zijn. ongeldige id: ", id);
    }
}

//alle bestuurders ophalen uit database. error? 400 + lege json array
export const getBestuurders = (req, res) => {
    const connection = mysql.createConnection(config);
    connection.query("SELECT * FROM bestuurder_test", (err, results, fields) => {
        if (err) res.status(400).send({});
        res.status(200).send(results);
    })
}

//specifieke bestuurder ophalen uit database via id
export const getBestuurder = (req, res) => {
    const connection = mysql.createConnection(config);
    connection.query(`SELECT * FROM bestuurder_test WHERE besId = ${req.params.id}`, (err, results, fields) => {
        if (err) res.status(404).send("bestuurder niet gevonden");
        //andere error = 400 "er is iets misgelopen"
        res.status(200).send(results);
    })
};

//nieuwe bestuurder toevoegen aan database
export const createBestuurder = (req, res) => {
    let bestuurder = {
        "besNaam": req.body.besNaam,
        "besVoornaam": req.body.besVoornaam,
        "besStraatNr": req.body.besStraatNr,
        "besPostcode": req.body.besPostcode,
        "besGemeente": req.body.besGemeente,
        "besLand": req.body.besLand,
        "besGeboortedatum": req.body.besGeboortedatum,
        "besRijbewijs": req.body.besRijbewijs,
        "besVoertuig": req.body.besVoertuig,
        "besTankkaart": req.body.besTankkaart,
        "besVerwijderd": req.body.besVerwijderd
    }
    //valideerRijksregisterNr(req.body.besRijksregisterNr);

    res.status(201).send(bestuurders);
};


//specifieke bestuurder updaten via id
export const updateBestuurder = (req, res) => {
    //connect
        //try UPDATE bestuurders SET (besNaam = req.params.besNaam, enzovoort) WHERE besId == req.params.id;
            //res.status(200).send(bestuurder);
        //catch
            //res.status(400).send("er is iets misgelopen");

    res.status(200).send("ok");
};