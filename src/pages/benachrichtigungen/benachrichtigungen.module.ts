import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenachrichtigungenPage } from './benachrichtigungen';
import { DisqusModule } from 'ngx-disqus';

 
@NgModule({
  declarations: [
    BenachrichtigungenPage,
  ],
  imports: [
    IonicPageModule.forChild(BenachrichtigungenPage),
    DisqusModule.forRoot('thinknario-1'),
  ],
  exports: [
    BenachrichtigungenPage
  ]
})
export class BenachrichtigungenPageModule {}