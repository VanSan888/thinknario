import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchluesselfaktorenPage } from './schluesselfaktoren';
 
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