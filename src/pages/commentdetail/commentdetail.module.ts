import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentdetailPage } from './commentdetail';
import { DisqusModule } from 'ngx-disqus';
import { ElasticModule } from 'angular2-elastic';

@NgModule({
  declarations: [
    CommentdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentdetailPage),
    DisqusModule.forRoot('thinknario-1'),
    //DisqusModule.forRoot('thinknarioVersuch2')
    ElasticModule,
  ],
  exports: [
    CommentdetailPage
  ]
})
export class CommentdetailPageModule {}
