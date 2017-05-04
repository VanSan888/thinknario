import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EinstellungenPage } from './einstellungen';
 
@NgModule({
  declarations: [
    EinstellungenPage,
  ],
  imports: [
    IonicPageModule.forChild(EinstellungenPage),
  ],
  exports: [
    EinstellungenPage
  ]
})
export class EinstellungenPageModule {}