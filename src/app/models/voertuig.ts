/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
    "voeAantalDeuren": 5,
    "voeBestuurder": null,
    "voeVerwijderd": 0
    
 */

export class Voertuig {
    constructor(
        public id : number,
        public voeMerk : string,
        public voeModel : string,
        public voeChassisNummer : string,
        public voeNummerplaat : string,
        public voeBrandstoftype : number,
        public voeTypeWagen : number,
        public voeKleur : string,
        public voeAantalDeuren : number,
        public voeBestuurder : number,
        public voeVerwijderd : number
    ) {}
}
