/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

*/
  
export class Tankkaart {
    
    public tanId : number = 0;
    public tanKaartnummer : string = '';
    public tanGeldigheidsdatum : string = '';
    public tanPincode : number = 0;
    public tanBestuurder : number = 0;
    public tanFuels : string = '';
    public tanGeblokkeerd : number = 0;
    public tanVerwijderd : number = 0;
    
    constructor( ) {}
}
