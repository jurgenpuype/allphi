import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bestuurder } from '../models/bestuurder';
import { Voertuig} from '../models/voertuig';
import { Tankkaart} from '../models/tankkaart';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public identityString: string,
               public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  annuleren(): void {
      this.dialogRef.close(false);
  }

  getDescription() : string {
      return this.identityString.split('||')[0];
  }

  getIdentification() : string {
      return this.identityString.split('||')[1];
  }

  verwijderen(): void {
      this.dialogRef.close(true);
  }

  sluiten(): void {
      this.dialogRef.close(false);
  }
  ngOnInit(): void {
  }

}
