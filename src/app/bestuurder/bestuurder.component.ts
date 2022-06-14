import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { Bestuurder } from '../models/bestuurder';
import { Rijksregisternummer } from '../models/rijksregisternummer';
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
import { BestuurderDetailComponent } from '../bestuurder-detail/bestuurder-detail.component';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";


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
  filBestuurder : Bestuurder = new Bestuurder;
  
  displayedColumns: string[] = ['besVoornaam', 'besNaam', 'besStraatNr', 'besPostcode', 'besGemeente', 'besLand', 'besGeboortedatum', 'besRijksregisterNr', 
                                'rijbewijs', 'voertuig', 'tankkaart', 'action'];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  checkLogin(): void {
    let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    if (loggedUser.length == 0) {
        this.router.navigate(['']);
    }
  }

  editBestuurder(bestuurder: Bestuurder): void {
      let myDialogRef = this.dialog.open(BestuurderDetailComponent, {  width      : '100%',
                                                                    maxWidth   : '1000px',
                                                                    data: bestuurder});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                let bestuurder = data.Bestuurder;
                let rijbewijs = data.Rijbewijs;
                alert(rijbewijs.rijCategories);
                let rijbewijsTypes = data.RijbewijsTypes;
                let index = this.bestuurders.indexOf(bestuurder);
                this.bestuurderService.updateBestuurder(bestuurder)
                    .subscribe(newBestuurder => {
                        if (typeof(newBestuurder) == 'undefined') {
                            console.log("Update mislukt voor bestuurder #"+bestuurder.id);
                        } else {
                            console.log("Update geslaagd voor bestuurder #"+bestuurder.id);
                            //update rijbewijs
                            this.rijbewijsService.updateRijbewijs(rijbewijs)
                                .subscribe(newRijbewijs => {
                                    this.rijbewijsService.getRijbewijzen()
                                        .subscribe(rijbewijzen => this.rijbewijzen = rijbewijzen);
                                });
                            //update rijbewijscategorieeen
                            this.rijbewijsService.getRijbewijsCategorieen(rijbewijs.id)
                                .subscribe(rijbewijsCategorieen => {
                                    this.rijbewijsService.deleteRijbewijstypesRijbewijs(rijbewijsCategorieen);
                                    this.rijbewijsService.saveRijbewijstypesRijbewijs(rijbewijs.id, rijbewijsTypes);
                            });
                            this.bestuurderService.getBestuurders()
                                .subscribe(bestuurders => {
                                    this.bestuurders = bestuurders;
                                    this.dataSource.data = this.bestuurders.filter(bestuurder => bestuurder.besVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }
  
  createBestuurder(bestuurder: Bestuurder): void {
      let myDialogRef = this.dialog.open(BestuurderDetailComponent, {  width      : '100%',
                                                                    maxWidth   : '1000px',
                                                                    data: bestuurder});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                let that = this;
                let bestuurder = data.Bestuurder;
                let rijbewijs = data.Rijbewijs;
                let rijbewijsTypes = data.RijbewijsTypes;
                this.rijbewijsService.createRijbewijs(rijbewijs)
                    .subscribe(newRijbewijs => {
                        console.log('createRijbewijs uitgevoerd!');
                        bestuurder.besRijbewijs = newRijbewijs.id;
                        this.rijbewijsService.saveRijbewijstypesRijbewijs(newRijbewijs.id, rijbewijsTypes);
                        this.bestuurderService.createBestuurder(bestuurder)
                            .subscribe(newBestuurder => {
                                if (typeof(newBestuurder) == 'undefined') {
                                    console.log("Opslaan van nieuwe bestuurder is mislukt!");
                                } else {
                                    console.log("Gegevens voor bestuurder #"+newBestuurder.id+" werden succesvol opgeslagen!");
                                    rijbewijs.rijHouder = newBestuurder.id;
                                    this.bestuurderService.getBestuurders()
                                        .subscribe(bestuurders => {
                                            this.bestuurders = bestuurders;
                                            this.dataSource.data = this.bestuurders.filter(bestuurder => bestuurder.besVerwijderd == 0);
                                        });
                                }
                            });
                    });
            }                
        }
      );
  }
  
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
                            this.bestuurderService.getBestuurders()
                                .subscribe(bestuurders => {
                                    this.bestuurders = bestuurders;
                                    this.dataSource.data = this.bestuurders.filter(bestuurder => bestuurder.besVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );    
  }

  newBestuurder() : Bestuurder {
      return new Bestuurder;
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
  
  getVoertuig(voertuigId: number) :string {
      let nrPlaat = "-";
      this.voertuigen.forEach(function(voertuig){  
        if (voertuig.id == voertuigId) { nrPlaat = voertuig.voeNummerplaat; }
      });  
      return nrPlaat;
  }      

  getTankkaart(tankkaartId: number) :string {
      let nrTankkaart = "-";
      this.tankkaarten.forEach(function(tankkaart){  
        if (tankkaart.id == tankkaartId) { nrTankkaart = tankkaart.tanKaartnummer; }
      });  
      return nrTankkaart;
  }      

  getRijbewijs(rijbewijsId: number): string {
      let rijbewijsCategories = "";
      this.rijbewijzen.forEach(function(rijbewijs){  
        if (rijbewijs.id == rijbewijsId) { 
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
