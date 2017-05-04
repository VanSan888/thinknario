import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BewertungenPage } from './bewertungen';
 
@NgModule({
  declarations: [
    BewertungenPage,
  ],
  imports: [
    IonicPageModule.forChild(BewertungenPage),
  ],
  exports: [
    BewertungenPage
  ]
})
export class BewertungenPageModule {}