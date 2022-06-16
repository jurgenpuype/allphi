import { Component, OnInit } from '@angular/core';
import { Tankkaart} from '../models/tankkaart';
import { TankkaartService} from '../services/tankkaart.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TankkaartDetailComponent } from '../tankkaart-detail/tankkaart-detail.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tankkaart',
  templateUrl: './tankkaart.component.html',
  styleUrls: ['./tankkaart.component.css']
})

export class TankkaartComponent implements OnInit {

  constructor(  private tankkaartService: TankkaartService,
                private bestuurderService: BestuurderService,
                private dialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router  ) {}
  
  dataSource = new MatTableDataSource<Tankkaart>([]);
  tankkaarten : Tankkaart[] = [];
  bestuurders : Bestuurder[] = [];
  filTankkaart : Tankkaart = new Tankkaart;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newTankkaart(): Tankkaart {
      return new Tankkaart;
  }
  
  displayedColumns: string[] = ['tanKaartnummer', 'tanGeldigheidsdatum', 'tanBestuurder', 'tanPincode', 'tanGeblokkeerd', 'action'];

  checkLogin(): void {
    //let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    //if (loggedUser.length == 0) {
    //    this.router.navigate(['']);
    //}
  }

  editTankkaart(tankkaart: Tankkaart): void {
      let identityString = "de tankkaart met nummer ||" + tankkaart.tanKaartnummer;
      let myDialogRef = this.dialog.open(TankkaartDetailComponent, {  width      : '100%',
                                                                    maxWidth   : '1000px',
                                                                    data: tankkaart});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                let index = this.tankkaarten.indexOf(tankkaart);
                this.tankkaartService.updateTankkaart(tankkaart)
                    .subscribe(newTankkaart => {
                        if (typeof(newTankkaart) == 'undefined') {
                            console.log("Update mislukt voor voertuig #"+tankkaart.tanId);
                        } else {
                            console.log("Update geslaagd voor voertuig #"+tankkaart.tanId);
                            this.tankkaartService.getTankkaarten()
                                .subscribe(tankkaarten => {
                                    this.tankkaarten = tankkaarten;
                                    this.dataSource.data = this.tankkaarten.filter(tankkaart => tankkaart.tanVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }

  confirmDelete(tankkaart: Tankkaart): void {
      let identityString = "de tankkaart met nummer ||" + tankkaart.tanKaartnummer;
      let myDialogRef = this.dialog.open(ConfirmDialogComponent, {  width      : '100%',
                                                                    maxWidth   : '350px',
                                                                    data: identityString});
      myDialogRef.afterClosed().subscribe(
        data => {
            if (data) {
                tankkaart.tanVerwijderd = 1;
                this.tankkaartService.updateTankkaart(tankkaart)
                    .subscribe(newTankkaart => {
                        if (typeof(newTankkaart) == 'undefined') {
                            console.log("Update mislukt voor tankkaart #"+tankkaart.tanId);
                        } else {
                            console.log("Update geslaagd voor tankkaart #"+tankkaart.tanId);
                            this.tankkaartService.getTankkaarten()
                                .subscribe(tankkaarten => {
                                    this.tankkaarten = tankkaarten;
                                    this.dataSource.data = this.tankkaarten.filter(tankkaart => tankkaart.tanVerwijderd == 0);
                                });
                        }
                    });
            }                
        }
      );
  }

  getBestuurder(id: number): string {
      let bestuurderNaam = '';
      this.bestuurders.forEach(function(bestuurder){  
        if (bestuurder.besId == id) { bestuurderNaam = bestuurder.besVoornaam + ' ' + bestuurder.besNaam; }
      });  
      return bestuurderNaam;
  }
  
  getTankkaarten(): void {
    this.tankkaartService.getTankkaarten()
        .subscribe(tankkaarten => {
            this.tankkaarten = tankkaarten;
            this.dataSource.data = this.tankkaarten.filter(tankkaart => tankkaart.tanVerwijderd == 0);
        });
  }
  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => this.bestuurders = bestuurders);
  }

  ngOnInit(): void {
    this.checkLogin();
    this.getTankkaarten();
    this.getBestuurders();
  }

}
