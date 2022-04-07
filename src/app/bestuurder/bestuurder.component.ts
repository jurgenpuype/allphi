import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { GebruikerService} from '../services/gebruiker.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { Voertuig} from '../models/voertuig';
import { VoertuigService} from '../services/voertuig.service';
import { Tankkaart} from '../models/tankkaart';
import { TankkaartService} from '../services/tankkaart.service';
import { Rijbewijs} from '../models/rijbewijs';
import { RijbewijsType } from '../models/rijbewijsType';
import { RijbewijstypeRijbewijs } from '../models/rijbewijstypeRijbewijs';
import { RijbewijsService} from '../services/rijbewijs.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-bestuurder',
  templateUrl: './bestuurder.component.html',
  styleUrls: ['./bestuurder.component.css']
})
export class BestuurderComponent implements OnInit {

  constructor(  private gebruikerService: GebruikerService,
                private bestuurderService: BestuurderService,
                private voertuigService: VoertuigService,
                private tankkaartService: TankkaartService,
                private rijbewijsService: RijbewijsService,
                private route: ActivatedRoute,
                private router: Router  ) {}
  
  bestuurders : Bestuurder[] = [];
  voertuigen : Voertuig[] = [];
  tankkaarten : Tankkaart[] = [];
  rijbewijzen : Rijbewijs[] = [];
  
  loggedGebruiker : Gebruiker =  window.history.state;
  displayedColumns: string[] = ['besVoornaam', 'besNaam', 'besStraatNr', 'besPostcode', 'besGemeente', 'besLand', 'besGeboortedatum', 'besRijksregisterNr', 
                                'rijbewijs', 'voertuig', 'tankkaart', 'action'];
  
  openDialog(arg1: string, arg2: Bestuurder){alert('button "' + arg1 + '" clicked')};

  addBestuurder() : void {
      alert('Bestuurder toevoegen');
  }
  
  showGebruiker() : void {
      alert(JSON.stringify(this.loggedGebruiker));
  }
  
  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => this.bestuurders = bestuurders);
  }

  getVoertuigen(): void {
    this.voertuigService.getVoertuigen()
        .subscribe(voertuigen => this.voertuigen = voertuigen);
  }

  getTankkaarten(): void {
    this.tankkaartService.getTankkaarten()
        .subscribe(tankkaarten => this.tankkaarten = tankkaarten);
  }

  getRijbewijzen(): void {
    this.rijbewijsService.getRijbewijzen()
        .subscribe(rijbewijzen => this.rijbewijzen = rijbewijzen);
  }
  
  getVoertuig(bestuurderId: number) :string {
      let nrPlaat = "-";
      this.voertuigen.forEach(function(voertuig){  
        if (voertuig.voeBestuurder == bestuurderId) { nrPlaat = voertuig.voeNummerplaat; }
      });  
      return nrPlaat;
  }      

  getTankkaart(bestuurderId: number) :string {
      let nrTankkaart = "-";
      this.tankkaarten.forEach(function(tankkaart){  
        if (tankkaart.tanBestuurder == bestuurderId) { nrTankkaart = tankkaart.tanKaartnummer; }
      });  
      return nrTankkaart;
  }      

  getRijbewijs(bestuurderId: number): string {
      let rijbewijsCategories = "";
      this.rijbewijzen.forEach(function(rijbewijs){  
        if (rijbewijs.rijHouder == bestuurderId) { 
            console.log("Houder found: "+bestuurderId);
            rijbewijsCategories = rijbewijs.rijCategories; 
        }
      });  
     return rijbewijsCategories;
  }      

  ngOnInit(): void {
    this.getBestuurders();
    this.getVoertuigen();
    this.getTankkaarten();
    this.getRijbewijzen();
    this.loggedGebruiker  =  window.history.state;
  }


}
