import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';


import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { BestuurderComponent } from './bestuurder/bestuurder.component';
import { VoertuigComponent } from './voertuig/voertuig.component';
import { TankkaartComponent } from './tankkaart/tankkaart.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BestuurderDetailComponent } from './bestuurder-detail/bestuurder-detail.component';
import { VoertuigDetailComponent } from './voertuig-detail/voertuig-detail.component';
import { TankkaartDetailComponent } from './tankkaart-detail/tankkaart-detail.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BestuurderComponent,
    VoertuigComponent,
    TankkaartComponent,
    HeaderComponent,
    UserDetailComponent,
    ConfirmDialogComponent,
    BestuurderDetailComponent,
    VoertuigDetailComponent,
    TankkaartDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
