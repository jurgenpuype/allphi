import { Component, OnInit } from '@angular/core';
import { Voertuig} from '../models/voertuig';
import { VoertuigService} from '../services/voertuig.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { VoertuigType } from '../models/voertuigType';
import { BrandstofVoertuig } from '../models/brandstofVoertuig';
import { VoertuigTypeService} from '../services/voertuig-type.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VoertuigDetailComponent } from '../voertuig-detail/voertuig-detail.component';
import { BrandstofVoertuigService} from '../services/brandstof-voertuig.service';


@Component({
  selector: 'app-voertuig',
  templateUrl: './voertuig.component.html',
  styleUrls: ['./voertuig.component.css']
})
export class VoertuigComponent implements OnInit {

  constructor(  private voertuigService: VoertuigService,
                private bestuurderService: BestuurderService,
                private voertuigTypeService: VoertuigTypeService,
                private brandstofVoertuigService: BrandstofVoertuigService,
                private dialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router  ) {}

  dataSource = new MatTableDataSource<Voertuig>([]);
  voertuigen : Voertuig[] = [];
  voertuigTypes : VoertuigType[] = [];
  bestuurders : Bestuurder[] = [];
  brandstoffen : BrandstofVoertuig[] = [];
  filVoertuig : Voertuig = new Voertuig;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkLogin(): void {
    //let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    //if (loggedUser.length == 0) {
    //    this.router.navigate(['']);
    //}
  }

  newVoertuig() : Voertuig {
      return new Voertuig;
  }
  
  createVoertuig(voertuig: Voertuig): void {
      let myDialogRef = this.dialog.open(VoertuigDetailComponent, {  width      : '100%',
                                                                    maxWidth   : '1000px',
                                                                    data: voertuig});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                this.voertuigService.createVoertuig(voertuig)
                    .subscribe(newVoertuig => {
                        if (typeof(newVoertuig) == 'undefined') {
                            console.log("Aanmaken nieuw voertuig mislukt!");
                        } else {
                            console.log("Voertuig #"+newVoertuig.id+" werd successvol aangemaakt!");
                            this.voertuigService.getVoertuigen()
                                .subscribe(voertuigen => {
                                    this.voertuigen = voertuigen;
                                    this.dataSource.data = this.voertuigen.filter(voertuig => voertuig.voeVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }

  editVoertuig(voertuig: Voertuig): void {
      let myDialogRef = this.dialog.open(VoertuigDetailComponent, {  width      : '100%',
                                                                    maxWidth   : '1000px',
                                                                    data: voertuig});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                this.voertuigService.updateVoertuig(voertuig)
                    .subscribe(newVoertuig => {
                        if (typeof(newVoertuig) == 'undefined') {
                            console.log("Update mislukt voor voertuig #"+voertuig.id);
                        } else {
                            console.log("Update geslaagd voor voertuig #"+voertuig.id);
                            this.voertuigService.getVoertuigen()
                                .subscribe(voertuigen => {
                                    this.voertuigen = voertuigen;
                                    this.dataSource.data = this.voertuigen.filter(voertuig => voertuig.voeVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }

  displayedColumns: string[] = ['voeMerk', 'voeModel', 'voeChassisNummer', 'voeNummerplaat', 'voeBrandstoftype', 'voeTypeWagen', 'voeKleur', 
                                'voeAantalDeuren', 'voeBestuurder', 'action'];

  getVoertuigen(): void {
    this.voertuigService.getVoertuigen()
        .subscribe(voertuigen => {
            this.voertuigen = voertuigen;
            this.dataSource.data = this.voertuigen.filter(voertuig => voertuig.voeVerwijderd == 0);
        });
  }

  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => this.bestuurders = bestuurders);
  }

  getBrandstoffenVoertuig(): void {
    this.brandstofVoertuigService.getBrandstoffenVoertuig()
        .subscribe(brandstoffen => this.brandstoffen = brandstoffen);
  }
  
  getBrandstof(id: number): string {
      let brandstofNaam = '';
      this.brandstoffen.forEach(function(brandstof){  
        if (brandstof.id == id) { brandstofNaam = brandstof.bravNaam; }
      });  
      return brandstofNaam;
  }

  getBestuurder(id: number): string {
      let bestuurderNaam = '';
      this.bestuurders.forEach(function(bestuurder){  
        if (bestuurder.besId == id) { bestuurderNaam = bestuurder.besVoornaam + ' ' + bestuurder.besNaam; }
      });  
      return bestuurderNaam;
  }
  
  getVoertuigTypes(): void {
    this.voertuigTypeService.getVoertuigTypes()
        .subscribe(voertuigTypes => this.voertuigTypes = voertuigTypes);
  }

  getVoertuigType(voertuigTypeId: number): string {
      let voertuigTypeText = "";
      this.voertuigTypes.forEach(function(voertuigType){  
        if (voertuigType.id == voertuigTypeId) { 
            voertuigTypeText = voertuigType.voetNaam; 
        }
      });  
     return voertuigTypeText;
  }      

  confirmDelete(voertuig: Voertuig): void {
      let identityString = "het voertuig met nummerplaat ||" + voertuig.voeNummerplaat;
      let myDialogRef = this.dialog.open(ConfirmDialogComponent, {  width      : '100%',
                                                                    maxWidth   : '350px',
                                                                    data: identityString});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                voertuig.voeVerwijderd = 1;
                this.voertuigService.updateVoertuig(voertuig)
                    .subscribe(newVoertuig => {
                        if (typeof(newVoertuig) == 'undefined') {
                            console.log("Update mislukt voor voertuig #"+voertuig.id);
                        } else {
                            console.log("Update geslaagd voor voertuig #"+voertuig.id);
                            this.voertuigService.getVoertuigen()
                                .subscribe(voertuigen => {
                                    this.voertuigen = voertuigen;
                                    this.dataSource.data = this.voertuigen.filter(voertuig => voertuig.voeVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }


  ngOnInit(): void {
      this.checkLogin();
      this.getVoertuigen();
      this.getBestuurders();
      this.getVoertuigTypes();
      this.getBrandstoffenVoertuig();
  }
}
