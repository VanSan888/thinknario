import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenarioerstellungPage } from './szenarioerstellung';
 
@NgModule({
  declarations: [
    SzenarioerstellungPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenarioerstellungPage),
  ],
  exports: [
    SzenarioerstellungPage
  ]
})
export class SzenarioerstellungPageModule {}