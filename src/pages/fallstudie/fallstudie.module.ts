import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FallstudiePage } from './fallstudie';
 
@NgModule({
  declarations: [
    FallstudiePage,
  ],
  imports: [
    IonicPageModule.forChild(FallstudiePage),
  ],
  exports: [
    FallstudiePage
  ]
})
export class FallstudiePageModule {}