/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
    "voeAantalDeuren": 5,
    "voeBestuurder": null,
    "voeVerwijderd": 0
    
 */

export class Voertuig {

    public id : number = 0;
    public voeMerk : string = '';
    public voeModel : string = '';
    public voeChassisNummer : string = '';
    public voeNummerplaat : string = '';
    public voeBrandstoftype : number = 0;
    public voeTypeWagen : number = 0;
    public voeKleur : string = '';
    public voeAantalDeuren : number = 0;
    public voeBestuurder : number = 0;
    public voeRijbewijs : number = 0;
    public voeVerwijderd : number = 0;

    constructor(
    ) {}
}
