import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';


@IonicPage()
@Component({
  selector: 'page-interview',
  templateUrl: 'interview.html',
})
export class InterviewPage {
	
  fallstudiePage = 'FallstudiePage';
	
  
  public userProfile: any;
  public birthDate: string;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public gender: string = "o";


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public profileProvider: ProfileProvider,
              public authData: AuthData) {
  }
  
 
  updateFirstname(firstName){	
	  this.profileProvider.updateFirstname(firstName); 
  }
 
  updateLastname(lastName){	
	  this.profileProvider.updateLastname(lastName);	 
  }
  
  updateUsername(userName){	
	  this.profileProvider.updateUsername(userName);	 
  }  
 
  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }
  
  updateGender(gender) {
	  this.profileProvider.updateGender(gender);
  }
  
}
