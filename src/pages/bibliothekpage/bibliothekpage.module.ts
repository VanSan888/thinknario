import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibliothekPage } from './bibliothekpage';

@NgModule({
  declarations: [
    BibliothekPage,
  ],
  imports: [
    IonicPageModule.forChild(BibliothekPage),
  ],
  exports: [
    BibliothekPage
  ]
})
export class BibliothekPageModule {}
