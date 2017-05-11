import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-einstellungen',
  templateUrl: 'einstellungen.html'
})
export class EinstellungenPage {
	
  public userProfile: any;
  public birthDate: string;
  public firstName: string;
  public lastName: string;
  public gender: string = "o";


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  public profileProvider: ProfileProvider, public authData: AuthData) {

  }
  
  ionViewDidEnter() {
    this.profileProvider.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      this.birthDate = this.userProfile.birthDate
	  this.firstName = this.userProfile.firstName
	  this.lastName = this.userProfile.lastName
	  this.gender = this.userProfile.gender
	  });
  }
  
  logOut(): void {
	
	this.authData.logoutUser().then( () => {
        this.navCtrl.setRoot('LogInPage');
    });
  }
    
 
  updateFirstname(firstName){
		
	this.profileProvider.updateFirstname(firstName);
	 
  }
 
  updateLastname(lastName){
	
	this.profileProvider.updateLastname(lastName);
	 
  }
 
  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }
  
  updateGender(gender) {
	  this.profileProvider.updateGender(gender);
  }
  
  
updateEmail(){
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
        handler: data => {
          this.profileProvider.updateEmail(data.newEmail, data.password);
        }
      }
    ]
  });
  alert.present();
}

updatePassword(){
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
        handler: data => {
          this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
        }
      }
    ]
  });
  alert.present();
}

}
