/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

*/
  
export class Bestuurder {
    
    public id : number = 0;
    public besNaam : string = '';
    public besVoornaam : string = '';
    public besStraatNr : string = '';
    public besPostcode : string = '';
    public besGemeente : string = '';
    public besLand : string = '';  
    public besGeboortedatum : string = '';
    public besRijksregisterNr : string = '';
    public besRijbewijs : number = 0;
    public besVoertuig : number = 0;
    public besTankkaart : number = 0;
    public besVerwijderd : number = 0;
        
    constructor() {}
}
