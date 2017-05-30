import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

//Import der Authentifizierungs- und Profile-Services
import { AuthData } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-einstellungen',
  templateUrl: 'einstellungen.html'
})
export class EinstellungenPage {
  //Notwendig für Navigation
  interviewPage='InterviewPage'
	
  public userProfile: any;
  public birthDate: string;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public gender: string = "o";


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  public profileProvider: ProfileProvider, public authData: AuthData) {

  }
  
  //Lädt, wenn die Seite betreten und zur aktiven Seite wird
  ionViewDidEnter() {
	//Erstellung eines Abbildes des User-Profils mit .than und arrows-function
	//und beschreiben der notwendigen Variablen für two-way-binding
    this.profileProvider.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      this.birthDate = this.userProfile.birthDate
	  this.firstName = this.userProfile.firstName
	  this.lastName = this.userProfile.lastName
	  this.userName = this.userProfile.userName
	  this.gender = this.userProfile.gender
	  });
  }
  
  
  //Aufruf der Logout-Funktion von Firebase in authData und navigation zur LogInPage
  logOut(): void {
	this.authData.logoutUser().then( () => {
    this.navCtrl.setRoot('LogInPage');
    });
  }
    
  //Übergabe des Vornamenparameters an den profileProvider-Service für update
  updateFirstname(firstName){
		
	this.profileProvider.updateFirstname(firstName);
	 
  }
 
  //Übergabe des Nachnamenparameters an den profileProvider-Service für update
  updateLastname(lastName){
	
	this.profileProvider.updateLastname(lastName);
	 
  }
  
  //Übergabe des Usernamenparameters an den profileProvider-Service für update
  updateUsername(userName){
	
	this.profileProvider.updateUsername(userName);
	this.profileProvider.updateUsernameSzenario(userName);

	 
  }  
 
  //Übergabe des Usernamenparameters an den profileProvider-Service für update
  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }
  
  //Übergabe des Geschlechtsparameters an den profileProvider-Service für update
  updateGender(gender) {
	  this.profileProvider.updateGender(gender);
  }
  
//Funktion zum ändern der E-Mail-Adresse
updateEmail(){
  //Alert-Fenster zur Eingabe der notwendigen Daten
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Ihre neue E-Mail Adresse',
      },
      {
        name: 'password',
        placeholder: 'Ihr Passwort',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Abbrechen',
      },
      {
        text: 'Speichern',
		//Übergabe der E-Mail-Parameter und Passwortparameter
        //an den profileProvider-Service für update
        handler: data => {
          this.profileProvider.updateEmail(data.newEmail, data.password);
        }
      }
    ]
  });
  alert.present();
}

//Funktion zum ändern der E-Mail-Adresse
updatePassword(){
  //Alert-Fenster zur Eingabe der notwendigen Daten
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newPassword',
        placeholder: 'Ihre neues Passwort',
        type: 'password'
      },
      {
        name: 'oldPassword',
        placeholder: 'Ihr altes Passwort',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Abbrechen',
      },
      {
        text: 'Speichern',
		//Übergabe der neuen und alten Passwortparameter
        //an den profileProvider-Service für update
        handler: data => {
          this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
        }
      }
    ]
  });
  alert.present();
}

}
