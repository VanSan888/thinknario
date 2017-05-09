import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-einstellungen',
  templateUrl: 'einstellungen.html'
})
export class EinstellungenPage {
	
resetPasswordPage = 'ResetPasswordPage'

  constructor(public navCtrl: NavController, public authData: AuthData) {

  }
  
  logoutUser(): void {
	
	this.authData.logoutUser()
    .then( () => {
        this.navCtrl.setRoot('LogInPage');
      });
  }	

}
