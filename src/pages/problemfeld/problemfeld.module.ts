import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemfeldPage } from './problemfeld';
import { ElasticModule } from 'angular2-elastic';
 
@NgModule({
  declarations: [
    ProblemfeldPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemfeldPage),
    ElasticModule,
  ],
  exports: [
    ProblemfeldPage
  ]
})
export class ProblemfeldPageModule {}