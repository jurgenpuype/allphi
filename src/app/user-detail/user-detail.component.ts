import { Component, Inject, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
 
  constructor( @Inject(MAT_DIALOG_DATA) public gebruiker: Gebruiker,
               public dialogRef: MatDialogRef<UserDetailComponent>,
               private route: ActivatedRoute,
               private router: Router  ) { }

  Roles = ['Administrator', 'Office Assistant', 'Bestuurder'];
  
  showRole(id: number): String {
      return this.Roles[id - 1];
  }
  Afmelden(): void {
      localStorage.removeItem("loggedUser")
      this.router.navigate(['']);
      this.dialogRef.close();
  }
 
  ngOnInit(): void {
      this.dialogRef.updatePosition({ top: `60px`,
                                      right: `15px`});
  }

}
