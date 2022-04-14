import { Component, OnInit } from '@angular/core';
import { Tankkaart} from '../models/tankkaart';
import { TankkaartService} from '../services/tankkaart.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tankkaart',
  templateUrl: './tankkaart.component.html',
  styleUrls: ['./tankkaart.component.css']
})
export class TankkaartComponent implements OnInit {

  constructor(  private tankkaartService: TankkaartService,
                private bestuurderService: BestuurderService,
                private route: ActivatedRoute,
                private router: Router  ) {}
  
  tankkaarten : Tankkaart[] = [];
  bestuurders : Bestuurder[] = [];
  displayedColumns: string[] = ['tanKaartnummer', 'tanGeldigheidsdatum', 'tanBestuurder', 'tanPincode', 'tanGeblokkeerd', 'action'];

  checkLogin(): void {
    let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    if (loggedUser.length == 0) {
        this.router.navigate(['']);
    }
  }

  openDialog(arg1: string, arg2: Tankkaart){alert('button "' + arg1 + '" clicked')};

  addTankkaart() : void {
      alert('Tankkaart toevoegen');
  }
  getBestuurder(id: number): string {
      let bestuurderNaam = '';
      this.bestuurders.forEach(function(bestuurder){  
        if (bestuurder.id == id) { bestuurderNaam = bestuurder.besVoornaam + ' ' + bestuurder.besNaam; }
      });  
      return bestuurderNaam;
  }
  
  showTankkaarten() : string {
      return JSON.stringify(this.tankkaarten);
  }
  getTankkaarten(): void {
    this.tankkaartService.getTankkaarten()
        .subscribe(tankkaarten => this.tankkaarten = tankkaarten);
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
