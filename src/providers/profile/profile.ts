import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable()
export class ProfileProvider {

  constructor() {

  }


 
  getUserProfile(): Promise<any> {
    return   new  Promise( (resolve, reject) => { 
     firebase.database().ref('/userProfile')
	.child(firebase.auth().currentUser.uid)
     .on('value', data => {
        resolve(data.val());
      });
    });
  }

  updateFirstname(firstName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      firstName: firstName,
    });
  }
  
  updateLastname(lastName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      lastName: lastName,
    });
  }  
    
  updateDOB(birthDate: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      birthDate: birthDate,
    });
  }
  
  updateGender(gender: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      gender: gender,
    });
  }
  
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
        .credential(firebase.auth().currentUser.email, password);

    return firebase.auth().currentUser.reauthenticate(credential)
    .then( user => {
      firebase.auth().currentUser.updateEmail(newEmail).then( user => {
        firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid).update({ email: newEmail });
      });
    });
  }
  
  updatePassword(newPass: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
        .credential(firebase.auth().currentUser.email, oldPassword);

    return firebase.auth().currentUser.reauthenticate(credential)
    .then( user => {
        firebase.auth().currentUser.updatePassword(newPass).then( user => {
            console.log("Password Changed");
        }, error => {
            console.log(error);
        });
    });
  }
  
}
