/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

*/
  
export class Bestuurder {
    constructor(
        public id : number,
        public besNaam : string,
        public besVoornaam : string,
        public besStraatNr : string,
        public besPostcode : string,
        public besGemeente : string,
        public besLand : string,
        public besGeboortedatum : string,
        public besRijksregisterNr : string,
        public besRijbewijs : number,
        public besVoertuig : number,
        public besTankkaart : number,
        public besVerwijderd : number
    ) {}
}
