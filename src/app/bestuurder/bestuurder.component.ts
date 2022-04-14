import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-bestuurder',
  templateUrl: './bestuurder.component.html',
  styleUrls: ['./bestuurder.component.css']
})
export class BestuurderComponent implements OnInit {

  constructor(  private bestuurderService: BestuurderService,
                private voertuigService: VoertuigService,
                private tankkaartService: TankkaartService,
                private rijbewijsService: RijbewijsService,
                private dialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router  ) {}
  
  dataSource = new MatTableDataSource<Bestuurder>([]);
  bestuurders : Bestuurder[] = [];
  voertuigen : Voertuig[] = [];
  tankkaarten : Tankkaart[] = [];
  rijbewijzen : Rijbewijs[] = [];
  
  displayedColumns: string[] = ['besVoornaam', 'besNaam', 'besStraatNr', 'besPostcode', 'besGemeente', 'besLand', 'besGeboortedatum', 'besRijksregisterNr', 
                                'rijbewijs', 'voertuig', 'tankkaart', 'action'];
  
  checkLogin(): void {
    let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    if (loggedUser.length == 0) {
        this.router.navigate(['']);
    }
  }
  openDialog(arg1: string, bestuurder: Bestuurder){alert('button "' + arg1 + '" clicked')};
  confirmDelete(bestuurder: Bestuurder): void {
      let identityString = "de bestuurder met naam ||" + bestuurder.besVoornaam + " " +  bestuurder.besNaam;
      let myDialogRef = this.dialog.open(ConfirmDialogComponent, {  width      : '100%',
                                                                    maxWidth   : '350px',
                                                                    data: identityString});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                let index = this.bestuurders.indexOf(bestuurder);
                bestuurder.besVerwijderd = 1;
                this.bestuurderService.updateBestuurder(bestuurder)
                    .subscribe(newBestuurder => {
                        if (typeof(newBestuurder) == 'undefined') {
                            console.log("Update mislukt voor bestuurder #"+bestuurder.id);
                        } else {
                            console.log("Update geslaagd voor bestuurder #"+bestuurder.id);
                            this.bestuurders[index] = newBestuurder;
                            this.dataSource.data = this.bestuurders.filter(bestuurder => bestuurder.besVerwijderd == 0);
                        }
                    });
            }                
        }
      );    
  }

  addBestuurder() : void {
      alert('Bestuurder toevoegen');
  }
  
  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => {
            this.bestuurders = bestuurders;
            this.dataSource.data = this.bestuurders.filter(bestuurder => bestuurder.besVerwijderd == 0);
        });
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
    this.checkLogin();
    this.getBestuurders();
    this.getVoertuigen();
    this.getTankkaarten();
    this.getRijbewijzen();
  }


}
