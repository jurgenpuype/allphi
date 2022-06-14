import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  checked : number[] = [];
  isCheckedSet : boolean = false;
  
  bewaren(bestuurder : Bestuurder): void {
      let rijCategorieen = '';
      this.rijbewijsTypes.forEach( myRijbewijsType => {
                                        if (this.checked.includes(myRijbewijsType.id)) { 
                                            rijCategorieen += myRijbewijsType.rbtNaam + ' ';
                                        }
                                   });
      this.rijbewijs.rijCategories = rijCategorieen;
      let data = {
          "Bestuurder"      : bestuurder,
          "Rijbewijs"       : this.rijbewijs,
          "RijbewijsTypes"  : this.checked
      };
      this.dialogRef.close(data);
  }

  sluiten(): void {
      this.dialogRef.close(false);
  }
  
  manageCategories(id: number){
      this.isCheckedSet = true;
      let _index = this.checked.indexOf(id);
      if (_index === -1) {
        this.checked.push(id);
      } else {
        this.checked.splice(_index,1);
      }
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
        .subscribe(rijbewijzen => {
            this.rijbewijzen = rijbewijzen;
            this.rijbewijzen.forEach(myRijbewijs => {
                if (myRijbewijs.id === this.bestuurder.besRijbewijs) {this.rijbewijs = myRijbewijs};
            })
        })
  }

  getRijbewijsTypes(): void {
    this.rijbewijsService.getRijbewijsTypes()
        .subscribe(rijbewijsTypes => {
            this.rijbewijsTypes = rijbewijsTypes;
        });
  }

  isLast(myRijbewijsType: RijbewijsType): boolean {
       return (myRijbewijsType === this.rijbewijsTypes.slice(-1)[0]);
  }
  
  getRijbewijs(): string {
      let rijbewijsId = this.bestuurder.besRijbewijs;
      let rijbewijsCategories = "";
      this.rijbewijzen.forEach(function(rijbewijs){  
        if (rijbewijs.id == rijbewijsId) { 
            rijbewijsCategories = rijbewijs.rijCategories; 
        }
      });  
     return rijbewijsCategories;
  }      

  getRijbewijsType(rbType: string): number {
      let _id = 0;
      let that = this;
      this.rijbewijsTypes.forEach(function(rijbewijsType){  
        if (rijbewijsType.rbtNaam == rbType) { 
            _id = rijbewijsType.id; 
        }
      });  
     return _id;
  }      

  hasRijbewijsType(rbType: string): boolean {
    let rijbewijsCategories = this.rijbewijs.rijCategories.split(' ');
    let id = this.getRijbewijsType(rbType);
    let _index = this.checked.indexOf(id);
    if (rijbewijsCategories.includes(rbType)) {
        if ((_index === -1) && !this.isCheckedSet) { this.checked.push(id); }
        return true;
    } else {
        return false;
    };
  }
  
  ngOnInit(): void {
    this.getRijbewijsTypes();
    this.getRijbewijzen();
    this.getVoertuigen();
    this.getTankkaarten();
  }
}
