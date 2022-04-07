/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

*/
  
export class Tankkaart {
    constructor(
        public id : number,
        public tanKaartnummer : string,
        public tanGeldigheidsdatum : string,
        public tanPincode : number,
        public tanBestuurder : number,
        public tanGeblokkeerd : number,
        public tanVerwijderd : number
    ) {}
}
