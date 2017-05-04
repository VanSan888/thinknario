import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeinSzenarioPage } from './meinSzenario';
 
@NgModule({
  declarations: [
    MeinSzenarioPage,
  ],
  imports: [
    IonicPageModule.forChild(MeinSzenarioPage),
  ],
  exports: [
    MeinSzenarioPage
  ]
})
export class MeinSzenarioPageModule {}