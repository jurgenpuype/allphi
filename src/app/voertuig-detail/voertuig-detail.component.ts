import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bestuurder } from '../models/bestuurder';
import { Voertuig } from '../models/voertuig';
import { VoertuigType } from '../models/voertuigType';
import { RijbewijsType } from '../models/rijbewijsType';
import { VoertuigTypeService} from '../services/voertuig-type.service';
import { VoertuigService} from '../services/voertuig.service';
import { BestuurderService} from '../services/bestuurder.service';
import { RijbewijsService} from '../services/rijbewijs.service';
import { BrandstofVoertuig } from '../models/brandstofVoertuig';
import { BrandstofVoertuigService} from '../services/brandstof-voertuig.service';


@Component({
  selector: 'app-voertuig-detail',
  templateUrl: './voertuig-detail.component.html',
  styleUrls: ['./voertuig-detail.component.css']
})
export class VoertuigDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public voertuig: Voertuig,
               private voertuigTypeService: VoertuigTypeService,
               private voertuigService: VoertuigService,
               private brandstofVoertuigService: BrandstofVoertuigService,
               private bestuurderService: BestuurderService,
               private rijbewijsService: RijbewijsService,
               public dialogRef: MatDialogRef<VoertuigDetailComponent>) { };
  
  voertuigTypes : VoertuigType[] = [];
  brandstoffenVoertuig : BrandstofVoertuig[] = [];
  bestuurders : Bestuurder[] = [];
  voertuigen : Voertuig[] = [];
  rijbewijsTypes : RijbewijsType[] = [];
  isNrPlaatUnique : boolean = false;
  isChassisnummerUnique : boolean = false;

  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => {
            this.bestuurders = bestuurders;
        });
  }

  getRijbewijsTypes(): void {
    this.rijbewijsService.getRijbewijsTypes()
        .subscribe(rijbewijsTypes => this.rijbewijsTypes = rijbewijsTypes);
  }

  getVoertuigen(): void {
    this.voertuigService.getVoertuigen()
        .subscribe(voertuigen => {
            this.voertuigen = voertuigen;
        });
  }

  getVoertuigTypes(): void {
    this.voertuigTypeService.getVoertuigTypes()
        .subscribe(voertuigTypes => this.voertuigTypes = voertuigTypes);
  }
  getVoertuigType(voertuigTypeId: number): string {
      let voertuigTypeText = "";
      this.voertuigTypes.forEach(function(voertuigType){  
        if (voertuigType.id == voertuigTypeId) { 
            voertuigTypeText = voertuigType.voetOmschrijving; 
        }
      });  
     return voertuigTypeText;
  }      

  getBrandstoffenVoertuig(): void {
    this.brandstofVoertuigService.getBrandstoffenVoertuig()
        .subscribe(brandstoffenVoertuig => this.brandstoffenVoertuig = brandstoffenVoertuig);
  }

  getBrandstofVoertuig(brandstofVoertuigId: number): string {
      let brandstofVoertuigText = "";
      this.brandstoffenVoertuig.forEach(function(brandstofVoertuig){  
        if (brandstofVoertuig.id == brandstofVoertuigId) { 
            brandstofVoertuigText = brandstofVoertuig.bravNaam; 
        }
      });  
     return brandstofVoertuigText;
  }      

  checkNummerplaat(id: number, nrPlaat : string) : boolean {
      let _result: boolean = false;
      this.voertuigen.forEach(function(voertuig){  
        if ((voertuig.id != id) && (voertuig.voeNummerplaat === nrPlaat)) {
            _result = true;
        }
      });  
      this.isNrPlaatUnique = !_result;
      return _result;
  }

  checkChassisnummer(id: number, chassisnr  : string) : boolean {
      let _result: boolean = false;
      this.voertuigen.forEach(function(voertuig){  
        if ((voertuig.id != id) && (voertuig.voeChassisNummer === chassisnr.trim())) {
            _result = true;
        }
      });  
      this.isChassisnummerUnique = !_result;
      return _result;
  }

  isFormValid() : boolean {
      return (this.isChassisnummerUnique && this.isNrPlaatUnique);
  }

  sluiten(): void {
      this.dialogRef.close(false);
  }

  bewaren(voertuig: Voertuig): void {
      this.dialogRef.close(voertuig);
  }

  ngOnInit(): void {
    this.getBestuurders();
    this.getVoertuigTypes();
    this.getVoertuigen();
    this.getRijbewijsTypes();
    this.getBrandstoffenVoertuig();
  }
  

}
