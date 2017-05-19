import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable()
export class ProfileProvider {

  constructor() {
  }
  
  //Promise zur Erlangung der aktuellen Nutzerdaten
  getUserProfile(): Promise<any> {

    return   new  Promise( (resolve, reject) => { 
     firebase.database().ref('/userProfile')
	.child(firebase.auth().currentUser.uid)
     .on('value', data => {
        resolve(data.val());
      });
    });
  }

  //Funktion für Firebaseupdate für Vornamen
  updateFirstname(firstName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      firstName: firstName,
    });
  }
  
  //Funktion für Firebaseupdate für Nachnamen
  updateLastname(lastName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      lastName: lastName,
    });
  }  
  
//Funktion für Firebaseupdate für Usernamen  
  updateUsername(userName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      userName: userName,
    });
  }	
	
  //Funktion für Firebaseupdate für Geburtstag	
  updateDOB(birthDate: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      birthDate: birthDate,
    });
  }
  
  //Funktion für Firebaseupdate für Geschlecht
  updateGender(gender: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      gender: gender,
    });
  }
  
  //Funktion für Firebaseupdate für E-Mail mittels Passwort
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
  
  //Funktion für Firebaseupdate für neues Passwort mit altem Passwort
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
