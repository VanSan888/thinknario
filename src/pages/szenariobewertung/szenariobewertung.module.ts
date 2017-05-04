import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenariobewertungPage } from './szenariobewertung';
 
@NgModule({
  declarations: [
    SzenariobewertungPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenariobewertungPage),
  ],
  exports: [
    SzenariobewertungPage
  ]
})
export class SzenariobewertungPageModule {}