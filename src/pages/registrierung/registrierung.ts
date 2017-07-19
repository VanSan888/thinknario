import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-registrierung',
  templateUrl: 'registrierung.html',
})
export class RegistrierungPage {

//Variable für Formvalidierung	
public signupForm: FormGroup;
//Variable für die Anzeige, dass die Seite lädt
loading: Loading;

  constructor(public navCtrl: NavController,
              public authData: AuthData,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController) {
    
	//FormValidation
    this.signupForm = formBuilder.group({
	  //E-Mail wird standardmäßig auf '' gesetzt, wird benötigt (required)
	  //und wird vom E-Mail-Validator kontrolliert (siehe validators/email")
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
	  //Passwort wird standardmäßig auf '' gesetzt, muss mindestens 6 Zeichen lang sein
	  //und wird benötigt (required)
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

//Funktion, um einen neuen User-Accout zu erstellen  
signupUser(){
  //Wenn die signupForm ungültig ist, dann...
  if (!this.signupForm.valid){
	//...gebe den Wert der signupForm an die Konsole
    console.log(this.signupForm.value);
  } else {
	//Aufruf der signupUser() Funktion in providers/auth/auth und
	//übergabe der eingegebenen E-Mail und des Passwortes
    this.authData.signupUser(this.signupForm.value.email, 
        this.signupForm.value.password)
    //Then Funktion garantiert die Anzeige des Ladesymbols
    .then(() => {
	  //Wenn erfolgreich geladen, navigiere zur InterviewPage
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot('InterviewPage');
      });
    }, (error) => {
	  //Wenn ein Fehler auftritt, dann gebe eine Fehlermeldung in einem Alarmfenster aus, die
	  //mit OK oder Abbrechen quittiert werden kann
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
	//Erstellung und Anzeige des Ladesymbols
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
	
}