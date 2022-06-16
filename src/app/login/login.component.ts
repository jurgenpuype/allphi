import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { GebruikerService} from '../services/gebruiker.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(  private gebruikerService: GebruikerService,
                private route: ActivatedRoute,
                private router: Router  ) {}
  
  model = new Gebruiker(0, "", "", "", "", 0, 0);
  
  gebruikers : Gebruiker[] = [];
  gebruiker : Gebruiker =  new Gebruiker(0, "", "", "", "", 0, 0);
  
  getLoggedUser(): void {
    let loggedUser = (localStorage.getItem("loggedUser") || '') ;
    if (loggedUser.length > 0) {
        this.router.navigate(['bestuurder']);
    }
  }
  getGebruikers(): void {
    this.gebruikerService.getGebruikers()
        .subscribe(gebruikers => this.gebruikers = gebruikers);
  }

  getGebruiker(id: number): void {
    this.gebruikerService.getGebruiker(id)
        .subscribe(gebruiker => this.gebruiker = gebruiker);
  }

  async checkLogin(login: string, pwd: string): Promise<Gebruiker[]> {
    let loggedUser = await this.gebruikerService.checkLogin(login, pwd);
    return loggedUser;
  }

  ngOnInit(): void {
      this.router.navigate(['bestuurder']);
    //this.getLoggedUser();
    //this.getGebruikers();
  }

  logIn(){
//    this.checkLogin(this.model.gebLogin, this.model.gebPassword)
//        .then((data) => {   this.gebruikers = data;  
//                            if (this.gebruikers.length) {
//                                this.gebruiker = this.gebruikers[0];
//                                 localStorage.setItem("loggedUser", JSON.stringify(this.gebruiker));
//                                this.router.navigate(['bestuurder']);
//                            }
//                         });
  }
  
  wis(){
    this.model.gebLogin = "";
    this.model.gebPassword = "";
  }
}
