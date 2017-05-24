import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenariodetailPage } from './szenariodetail';

@NgModule({
  declarations: [
    SzenariodetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenariodetailPage),
  ],
  exports: [
    SzenariodetailPage
  ]
})
export class SzenariodetailPageModule {}
