import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SzenarioerstellungPage } from './szenarioerstellung';
import { DisqusModule } from 'ngx-disqus';
import { ElasticModule } from 'angular2-elastic';
 
@NgModule({
  declarations: [
    SzenarioerstellungPage,
  ],
  imports: [
    IonicPageModule.forChild(SzenarioerstellungPage),
    DisqusModule.forRoot('thinknarioVersuch2'),
    ElasticModule,
  ],
  exports: [
    SzenarioerstellungPage
  ]
})
export class SzenarioerstellungPageModule {}