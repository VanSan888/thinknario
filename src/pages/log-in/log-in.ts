import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import des Validators für sinnvolle E-Mail-Adressen
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {


public loginForm: FormGroup;
public loading: Loading;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authData: AuthData,
              public formBuilder: FormBuilder) {

	//Form zur E-Mail- und Passwortvalidierung
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });
  }

  loginUser(): void {
  //Abfrage für die Validierungs-Form
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authData.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password)
    .then( authData => {
	    //Loader wird nicht mehr angezeigt
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot('HomePage');
      });
	  //Fehlermeldung bei Fehlgeschlagener Anmeldung
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'Abbrechen'
            }
          ]
        });
        alert.present();
      });
    });
    //Erstellung eines Loaders
    this.loading = this.loadingCtrl.create();
    //Anzeige des Loaders
    this.loading.present();
  }
}

//Notwendig für Navigation
goToSignup(): void { this.navCtrl.push('RegistrierungPage'); }

goToResetPassword(): void { this.navCtrl.push('ResetPasswordPage'); }

}
