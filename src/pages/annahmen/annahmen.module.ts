import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnahmenPage } from './annahmen';

 
@NgModule({
  declarations: [
    AnnahmenPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnahmenPage),
  ],
  exports: [
    AnnahmenPage
  ]
})
export class AnnahmenPageModule {}