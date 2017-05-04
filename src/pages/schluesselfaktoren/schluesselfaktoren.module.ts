import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchluesselfaktorenPage } from './schluesslfaktoren';
 
@NgModule({
  declarations: [
    SchluesselfaktorenPage,
  ],
  imports: [
    IonicPageModule.forChild(SchluesselfaktorenPage),
  ],
  exports: [
    SchluesselfaktorenPage
  ]
})
export class SchluesselfaktorenPageModule {}