import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Bestuurder } from '../models/bestuurder';
import { Rijksregisternummer } from '../models/rijksregisternummer';
import { Voertuig} from '../models/voertuig';
import { VoertuigService} from '../services/voertuig.service';
import { BestuurderService} from '../services/bestuurder.service';
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
               private bestuurderService: BestuurderService,
               private tankkaartService: TankkaartService,
               public dialogRef: MatDialogRef<BestuurderDetailComponent>) { }        

  voertuigen : Voertuig[] = [];
  _bestuurder : Bestuurder = this.bestuurder;
  tankkaarten : Tankkaart[] = [];
  bestuurders : Bestuurder[] = [];
  rijbewijzen : Rijbewijs[] = [];
  rijbewijsTypes : RijbewijsType[] = [];
  rijbewijs : Rijbewijs = new Rijbewijs;
  checked : number[] = [];
  isCheckedSet : boolean = false;
  isRrNumValid : boolean = false;
  isRrNumUnique : boolean = false;
  doesRrNumMatch : boolean = false;

  bewaren(bestuurder : Bestuurder): void {
      let rijCategorieen = '';
      this.rijbewijsTypes.forEach( myRijbewijsType => {
                                        if (this.checked.includes(myRijbewijsType.rbtId)) { 
                                            rijCategorieen += myRijbewijsType.rbtNaam + ' ';
                                        }
                                   });
      this.rijbewijs.rijCategories = rijCategorieen.trim();
      console.log(this.rijbewijs.rijCategories);
      let data = {
          "Bestuurder"      : bestuurder,
          "Rijbewijs"       : this.rijbewijs,
          "RijbewijsTypes"  : this.checked
      };
      this.dialogRef.close(data);
  }

  sluiten(): void {
      this.bestuurder = this._bestuurder;
      this.dialogRef.close(false);
  }
  
  checkRijksregister(myRrNum: string):boolean {
      let rrNum : Rijksregisternummer = new Rijksregisternummer(myRrNum);
      this.isRrNumValid = rrNum.isCorrect();
      return rrNum.isCorrect();
  }
  
  checkRijksregisterNonUnique(myId: number, myRrNum: string):boolean {
      let _result: boolean = false;
      let rrNum : Rijksregisternummer = new Rijksregisternummer(myRrNum);
      this.bestuurders.forEach(function(bestuurder){  
        if ((bestuurder.besId != myId) && (bestuurder.besRijksregisterNr === rrNum.print('str'))) {
            _result = true;
        }
      });  
      this.isRrNumUnique = !_result;
      return _result;
  }

  checkRijksregisterGbtd(myGeboorteDatum: string, myRrNum: string):boolean {
      if (myGeboorteDatum.length === 0) {
          return false;
      } else {
        let rrNum : Rijksregisternummer = new Rijksregisternummer(myRrNum);
        let _arrDate : string[] = myGeboorteDatum.split('/');
        let geboorteDatum : string = '';
        if (_arrDate[0].length == 1) {geboorteDatum += '0'; }
        geboorteDatum += _arrDate[0] + '/';
        if (_arrDate[1].length == 1) {geboorteDatum += '0'; }
        geboorteDatum += _arrDate[1] + '/';
        geboorteDatum += _arrDate[2];
        this.doesRrNumMatch = (geboorteDatum === rrNum.geboortedatum());
        return geboorteDatum === rrNum.geboortedatum();
      }
  }
  
  isFormValid() : boolean {
      return (this.isRrNumUnique && this.isRrNumValid  && this.doesRrNumMatch);
  }

  manageCategories(id: number){
      this.isCheckedSet = true;
      let _index = this.checked.indexOf(id);
      console.log(this.checked);
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

  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => {
            this.bestuurders = bestuurders;
        });
  }

  getRijbewijzen(): void {
    this.rijbewijsService.getRijbewijzen()
        .subscribe(rijbewijzen => {
            this.rijbewijzen = rijbewijzen;
            this.rijbewijzen.forEach(myRijbewijs => {
                if (myRijbewijs.rijId === this.bestuurder.besRijbewijs) {this.rijbewijs = myRijbewijs};
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
        if (rijbewijs.rijId == rijbewijsId) { 
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
            _id = rijbewijsType.rbtId; 
        }
      });  
     return _id;
  }      

  hasRijbewijsType(rbType: string): boolean {
    let rijbewijsCategories = this.rijbewijs.rijCategories.split(' ');
    console.log(rijbewijsCategories);
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
    this.getBestuurders();
    this.getRijbewijsTypes();
    this.getRijbewijzen();
    this.getVoertuigen();
    this.getTankkaarten();
  }
}
