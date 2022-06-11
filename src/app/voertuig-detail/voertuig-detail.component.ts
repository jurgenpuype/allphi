import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bestuurder } from '../models/bestuurder';
import { Voertuig } from '../models/voertuig';
import { VoertuigType } from '../models/voertuigType';
import { RijbewijsType } from '../models/rijbewijsType';
import { VoertuigTypeService} from '../services/voertuig-type.service';
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
               private brandstofVoertuigService: BrandstofVoertuigService,
               private bestuurderService: BestuurderService,
               private rijbewijsService: RijbewijsService,
               public dialogRef: MatDialogRef<VoertuigDetailComponent>) { };
  
  voertuigTypes : VoertuigType[] = [];
  brandstoffenVoertuig : BrandstofVoertuig[] = [];
  bestuurders : Bestuurder[] = [];
  rijbewijsTypes : RijbewijsType[] = [];

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

  sluiten(): void {
      this.dialogRef.close(false);
  }

  bewaren(voertuig: Voertuig): void {
      this.dialogRef.close(voertuig);
  }

  ngOnInit(): void {
    this.getBestuurders();
    this.getVoertuigTypes();
    this.getRijbewijsTypes();
    this.getBrandstoffenVoertuig();
  }
  

}
