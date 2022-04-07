import { Component, OnInit } from '@angular/core';
import { Voertuig} from '../models/voertuig';
import { VoertuigService} from '../services/voertuig.service';
import { Bestuurder } from '../models/bestuurder';
import { BestuurderService} from '../services/bestuurder.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-voertuig',
  templateUrl: './voertuig.component.html',
  styleUrls: ['./voertuig.component.css']
})
export class VoertuigComponent implements OnInit {

  constructor(  private voertuigService: VoertuigService,
                private bestuurderService: BestuurderService,
                private route: ActivatedRoute,
                private router: Router  ) {}

  voertuigen : Voertuig[] = [];
  bestuurders : Bestuurder[] = [];

  showVoertuigen(): string {
    return JSON.stringify(this.voertuigen);
  }

  addVoertuig() : void {
      alert('Voertuig toevoegen');
  }

  displayedColumns: string[] = ['voeMerk', 'voeModel', 'voeChassisNummer', 'voeNummerplaat', 'voeBrandstoftype', 'voeTypeWagen', 'voeKleur', 
                                'voeAantalDeuren', 'voeBestuurder', 'action'];

  openDialog(arg1: string, arg2: Voertuig){alert('button "' + arg1 + '" clicked')};

  getVoertuigen(): void {
    this.voertuigService.getVoertuigen()
        .subscribe(voertuigen => this.voertuigen = voertuigen);
  }

  getBestuurders(): void {
    this.bestuurderService.getBestuurders()
        .subscribe(bestuurders => this.bestuurders = bestuurders);
  }

  getBestuurder(id: number): string {
      let bestuurderNaam = '';
      this.bestuurders.forEach(function(bestuurder){  
        if (bestuurder.id == id) { bestuurderNaam = bestuurder.besVoornaam + ' ' + bestuurder.besNaam; }
      });  
      return bestuurderNaam;
  }

  ngOnInit(): void {
      this.getVoertuigen();
      this.getBestuurders();
  }

}
