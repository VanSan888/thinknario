import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenachrichtigungenPage } from './benachrichtigungen';
 
@NgModule({
  declarations: [
    BenachrichtigungenPage,
  ],
  imports: [
    IonicPageModule.forChild(BenachrichtigungenPage),
  ],
  exports: [
    BenachrichtigungenPage
  ]
})
export class BenachrichtigungenPageModule {}