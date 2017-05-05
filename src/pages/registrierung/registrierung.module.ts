import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrierungPage } from './registrierung';

@NgModule({
  declarations: [
    RegistrierungPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrierungPage),
  ],
  exports: [
    RegistrierungPage
  ]
})
export class RegistrierungPageModule {}
