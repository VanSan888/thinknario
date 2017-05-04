import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EreignissePage } from './ereignisse';
 
@NgModule({
  declarations: [
    EreignissePage,
  ],
  imports: [
    IonicPageModule.forChild(EreignissePage),
  ],
  exports: [
    EreignissePage
  ]
})
export class EreignissePageModule {}