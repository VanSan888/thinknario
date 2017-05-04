import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemfeldPage } from './problemfeld';
 
@NgModule({
  declarations: [
    ProblemfeldPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemfeldPage),
  ],
  exports: [
    ProblemfeldPage
  ]
})
export class ProblemfeldPageModule {}