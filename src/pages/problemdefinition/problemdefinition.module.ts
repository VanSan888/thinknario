import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemdefinitionPage } from './problemdefinition';
 
@NgModule({
  declarations: [
    ProblemdefinitionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemdefinitionPage),
  ],
  exports: [
    ProblemdefinitionPage
  ]
})
export class ProblemdefinitionPageModule {}