import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentdetailPage } from './commentdetail';
import { DisqusModule } from 'ngx-disqus';

@NgModule({
  declarations: [
    CommentdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentdetailPage),
    DisqusModule.forRoot('thinknarioVersuch2'),
  ],
  exports: [
    CommentdetailPage
  ]
})
export class CommentdetailPageModule {}
