import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bestuurder } from '../models/bestuurder';
import { Voertuig} from '../models/voertuig';
import { VoertuigService} from '../services/voertuig.service';
import { Tankkaart} from '../models/tankkaart';
import { TankkaartService} from '../services/tankkaart.service';
import { Rijbewijs} from '../models/rijbewijs';
import { RijbewijsService} from '../services/rijbewijs.service';
import { RijbewijsType } from '../models/rijbewijsType';

@Component({
  selector: 'app-bestuurder-detail',
  templateUrl: './bestuurder-detail.component.html',
  styleUrls: ['./bestuurder-detail.component.css']
})

export class BestuurderDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public bestuurder: Bestuurder,
               private rijbewijsService: RijbewijsService,
               private voertuigService: VoertuigService,
               private tankkaartService: TankkaartService,
               public dialogRef: MatDialogRef<BestuurderDetailComponent>) { }

  voertuigen : Voertuig[] = [];
  tankkaarten : Tankkaart[] = [];
  rijbewijzen : Rijbewijs[] = [];
  rijbewijsTypes : RijbewijsType[] = [];
  rijbewijs : Rijbewijs = new Rijbewijs;
  
  bewaren(bestuurder : Bestuurder): void {
      let data = {
          "Bestuurder" : bestuurder,
          "Rijbewijs"  : this.rijbewijs
      };
      this.dialogRef.close(data);
  }

  sluiten(): void {
      this.dialogRef.close(false);
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

  getRijbewijsTypes(): void {
    this.rijbewijsService.getRijbewijsTypes()
        .subscribe(rijbewijsTypes => this.rijbewijsTypes = rijbewijsTypes);
  }

  isLast(myRijbewijsType: RijbewijsType): boolean {
       return (myRijbewijsType === this.rijbewijsTypes.slice(-1)[0]);
  }
  
  getRijbewijs(): string {
      let bestuurderId = this.bestuurder.id;
      let rijbewijsCategories = "";
      this.rijbewijzen.forEach(function(rijbewijs){  
        if (rijbewijs.rijHouder == bestuurderId) { 
            rijbewijsCategories = rijbewijs.rijCategories; 
        }
      });  
     return rijbewijsCategories;
  }      

  hasRijbewijsType(rbType: string): boolean {
    let rijbewijsCategories = this.getRijbewijs().split(' ');
    return rijbewijsCategories.includes(rbType);
  }
  
  ngOnInit(): void {
    this.getRijbewijsTypes();
    this.getRijbewijzen();
    this.getVoertuigen();
    this.getTankkaarten();
  }

}
