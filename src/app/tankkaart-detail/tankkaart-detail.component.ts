import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandstofTankkaart } from '../models/brandstofTankkaart';
import { TankkaartBrandstofTankkaart } from '../models/tankkaartbrandstofTankkaart';
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
  tankkaartBrandstoffen : TankkaartBrandstofTankkaart[] = [];
  fakeArray = new Array(0);
  isFuelsSet : boolean = false;
  brandstoffen : number[] = [];

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

  manageBrandstof(id: number) : void {
      console.log(this.brandstoffen);
      let _index = this.brandstoffen.indexOf(id);
      if (_index === -1) {
            this.brandstoffen.push(id);
      } else {
            this.brandstoffen.splice(_index,1);
      }
      console.log(this.brandstoffen);
  }

  hasBrandstof(id: number): boolean {
      return (this.brandstoffen.indexOf(id) > -1);
  }

  getTankkaartBrandstoffen() : void {
      this.brandstofTankkaartService.getTankkaartBrandstoffen(this.tankkaart.tanId)
          .subscribe(tankkaartBrandstofTankkaarten => {
              this.tankkaartBrandstoffen = tankkaartBrandstofTankkaarten;
              this.tankkaartBrandstoffen.map(brandstof => {
                if (brandstof.tbtTankkaartId === this.tankkaart.tanId) {
                    this.brandstoffen.push(brandstof.tbtBrandstofTankkaardId);
                }
            })
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
    this.getTankkaartBrandstoffen();
  }

}
