import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EreignissePage } from './ereignisse';
import { ElasticModule } from 'angular2-elastic';
 
@NgModule({
  declarations: [
    EreignissePage,
  ],
  imports: [
    IonicPageModule.forChild(EreignissePage),
    ElasticModule,
  ],
  exports: [
    EreignissePage
  ]
})
export class EreignissePageModule {}