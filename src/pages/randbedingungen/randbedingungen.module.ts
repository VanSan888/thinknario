import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandbedingungenPage } from './randbedingungen';
import { ElasticModule } from 'angular2-elastic';
 
@NgModule({
  declarations: [
    RandbedingungenPage,
  ],
  imports: [
    IonicPageModule.forChild(RandbedingungenPage),
    ElasticModule,
  ],
  exports: [
    RandbedingungenPage
  ]
})
export class RandbedingungenPageModule {}