import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandbedingungenPage } from './randbedingungen';
 
@NgModule({
  declarations: [
    RandbedingungenPage,
  ],
  imports: [
    IonicPageModule.forChild(RandbedingungenPage),
  ],
  exports: [
    RandbedingungenPage
  ]
})
export class RandbedingungenPageModule {}