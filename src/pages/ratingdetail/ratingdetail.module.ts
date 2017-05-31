import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingDetailPage } from './ratingdetail';

@NgModule({
  declarations: [
    RatingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RatingDetailPage),
  ],
  exports: [
    RatingDetailPage
  ]
})
export class RatingDetailPageModule {}
