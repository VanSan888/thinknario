import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenariodetailPage } from './szenariodetail';
import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [
    SzenariodetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenariodetailPage),
    DisqusModule.forRoot('thinknario-1'),
  ],
  exports: [
    SzenariodetailPage
  ]
})
export class SzenariodetailPageModule {}
