import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeskriptorenanalysePage } from './deskriptorenanalyse';
 
@NgModule({
  declarations: [
    DeskriptorenanalysePage,
  ],
  imports: [
    IonicPageModule.forChild(DeskriptorenanalysePage),
  ],
  exports: [
    DeskriptorenanalysePage
  ]
})
export class DeskriptorenanalysePageModule {}