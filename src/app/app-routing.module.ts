import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BestuurderComponent } from './bestuurder/bestuurder.component';
import { VoertuigComponent } from './voertuig/voertuig.component';
import { TankkaartComponent } from './tankkaart/tankkaart.component';

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'bestuurder', component: BestuurderComponent},
    { path: 'voertuig', component: VoertuigComponent},
    { path: 'tankkaart', component: TankkaartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }