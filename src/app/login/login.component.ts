import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { GebruikerService} from '../gebruiker.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private gebruikerService: GebruikerService) {}
  
  model = new Gebruiker(0, "", "", "", "", 0, 0);
  gebruikers : Gebruiker[] = [];
  
  getGebruikers(): void {
    this.gebruikers = this.gebruikerService.getGebruikers();
  }
  ngOnInit(): void {
    this.getGebruikers();
  }
  logIn(){
    alert(this.model.gebLogin + " : " + this.model.gebPassword);
  }
  wis(){
    this.model.gebLogin = "";
    this.model.gebPassword = "";
  }
}
