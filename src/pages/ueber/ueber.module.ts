import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UeberPage } from './ueber';
 
@NgModule({
  declarations: [
    UeberPage,
  ],
  imports: [
    IonicPageModule.forChild(UeberPage),
  ],
  exports: [
    UeberPage
  ]
})
export class UeberPageModule {}