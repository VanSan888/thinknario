import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController,
  MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import des Validators für sinnvolle E-Mail-Adressen
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth/auth';
import { SzenarioProvider } from '../../providers/szenario/szenario';

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
              public formBuilder: FormBuilder,
              public menuCtrl: MenuController,
              public szenarioProvider: SzenarioProvider) {

	//Form zur E-Mail- und Passwortvalidierung
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    //Menu soll an dieser Stelle nicht angezeigt werden
    this.menuCtrl.enable(false, 'menuId');

  }

  ionViewDidEnter(){
    
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
        this.szenarioProvider.checkPath("average").then((result: boolean) => {
	        //Wenn in dem Pfad Daten hinterlegt sind, dann...
          if(result === true) {
            //HomePage als rootPage
            this.navCtrl.setRoot('HomePage');
          } else {
              //Ansonsten Mein Szenario als rootpage
              this.navCtrl.setRoot('MeinSzenarioPage');
          }
        });    
        //Menu ab jetzt wieder einblenden
        this.menuCtrl.enable(true, 'menuId');         
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

//Navigationsfunktionen. es wird eine neue Seite auf das Stack gepackt
goToSignup(): void { this.navCtrl.push('RegistrierungPage'); }

goToResetPassword(): void { this.navCtrl.push('ResetPasswordPage'); }


}
