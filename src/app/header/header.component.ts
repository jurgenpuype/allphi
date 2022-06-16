import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private dialog: MatDialog,
               private route: ActivatedRoute,
               private router: Router  ) { }
  
  gebruiker : Gebruiker =  new Gebruiker(0, "", "", "", "", 0, 0);
  checkLogin(): string {
      //let userJSON = (localStorage.getItem("loggedUser") || '');
      //if (userJSON.length > 0) {this.gebruiker = JSON.parse(userJSON);}
      //return (localStorage.getItem("loggedUser") || '') ;
      return "Ok"
  }

  showLoggedUser(): void {
      let myDialogRef = this.dialog.open(UserDetailComponent, { width      : '100%',
                                                                maxWidth   : '350px',
                                                                data: this.gebruiker});
  }

  ngOnInit(): void {
  }

}
