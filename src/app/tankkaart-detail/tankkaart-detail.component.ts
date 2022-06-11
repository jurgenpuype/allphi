import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandstofTankkaart } from '../models/brandstofTankkaart';
import { BrandstofTankkaartService} from '../services/brandstof-tankkaart.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { Tankkaart} from '../models/tankkaart';

@Component({
  selector: 'app-tankkaart-detail',
  templateUrl: './tankkaart-detail.component.html',
  styleUrls: ['./tankkaart-detail.component.css']
})
export class TankkaartDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public tankkaart: Tankkaart,
               private bestuurderService: BestuurderService,
               private brandstofTankkaartService: BrandstofTankkaartService,
               public dialogRef: MatDialogRef<TankkaartDetailComponent>) { }

  bestuurders: Bestuurder[] = [];
  brandstoffenTankkaart : BrandstofTankkaart[] = [];
  fakeArray = new Array(0);

  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => {
            this.bestuurders = bestuurders;
        });
  }

  getBrandstoffenTankkaart(): void {
    this.brandstofTankkaartService.getBrandstoffenTankkaart()
        .subscribe(brandstoffenTankkaart => {
            this.brandstoffenTankkaart = brandstoffenTankkaart;
            this.fakeArray = new Array(4 - this.brandstoffenTankkaart.length % 4);
        });
  }

  sluiten(): void {
      this.dialogRef.close(false);
  }

  bewaren(tankkaart: Tankkaart): void {
      this.dialogRef.close(tankkaart);
  }

  ngOnInit(): void {
    this.getBestuurders();
    this.getBrandstoffenTankkaart();
  }

}
