import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KommunikationPage } from './kommunikation';
 
@NgModule({
  declarations: [
    KommunikationPage,
  ],
  imports: [
    IonicPageModule.forChild(KommunikationPage),
  ],
  exports: [
    KommunikationPage
  ]
})
export class KommunikationPageModule {}