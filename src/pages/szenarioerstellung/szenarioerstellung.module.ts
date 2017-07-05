import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenarioerstellungPage } from './szenarioerstellung';
import { DisqusModule } from 'ngx-disqus';
 
@NgModule({
  declarations: [
    SzenarioerstellungPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenarioerstellungPage),
    DisqusModule.forRoot('thinknarioVersuch2'),
  ],
  exports: [
    SzenarioerstellungPage
  ]
})
export class SzenarioerstellungPageModule {}