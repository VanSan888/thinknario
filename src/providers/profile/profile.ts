import { Injectable } from '@angular/core';
import firebase from 'firebase';



@Injectable()
export class ProfileProvider {

  constructor() {
  }
  
  //Promise zur Erlangung der aktuellen Nutzerdaten.
  //Promise ist nötig um die Asynchronität zu gewährleisten
  getUserProfile(): Promise<any> {
    return   new  Promise( (resolve, reject) => {
      //Es wird ein Observer auf das Auth object gesetzt
      firebase.auth().onAuthStateChanged((user) => {
        //Wenn ein user angemeldet ist, dann
        if(user){
	        //Angabe des Pfades, der ausgelesen werden soll.
          firebase.database().ref('/userProfile')
	        .child(firebase.auth().currentUser.uid)
	        //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
          .on('value', data => {
		        //gibt die ausgelesenen Werte an das Promise zurück
            resolve(data.val());
          });
        }
      });  
    });
  }

  //Funktion für Firebaseupdate für Vornamen. Promise zur Gewährleistung
  //der Asynchronität
  updateFirstname(firstName: string): firebase.Promise<any> {
	//Festlegung des Pfades der geupdated werden soll
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
	  //Beschreiben der properties; firstName: "Anna"
      firstName: firstName,
    });
  }
  
  //Funktion für Firebaseupdate für Nachnamen
  //genauere Beschreibung kann aus updateFirstname entnommen werden
  updateLastname(lastName: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      lastName: lastName,
    });
  }  
  
  //Funktion für Firebaseupdate für Usernamen in verschiedenen Pfaden
  updateUsername(userName: string): firebase.Promise<any> {
  //Festlegung der zu aktualisierenden Daten
  let updateData = {userName: userName};
  //Festlegung der aktuellen UserID
  let uid = firebase.auth().currentUser.uid;
  
  //Festlegung der verschiedenen Pfade
  let locations = {};
    locations['/userProfile/' + uid + '/' + 'userName/'] = updateData;
    locations['/szenarioData/' + uid + '/' + 'userName/'] = updateData;
	  //Update der Daten in den verschiedenen Pfaden
    return firebase.database().ref().update(locations);
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

  //Funktion für Firebaseupdate für Wohnort
  //genauere Beschreibung kann aus updateFirstname entnommen werden
  updateWohnort(wohnOrt: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      wohnort: wohnOrt,
    });
  }

  //Funktion für Firebaseupdate für Ausbildung
  updateAusbildung(ausbildung: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      ausbildung: ausbildung,
    });
  }

  //Funktion für Firebaseupdate für Beruf
  updateBeruf(beruf: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      beruf: beruf,
    });
  }

  //Funktion für Firebaseupdate für persönliche Interessen
  updateInteressen(interessen: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).update({
      interessen: interessen,
    });
  }
  
  //Funktion für Firebaseupdate für E-Mail mittels Passwort
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
        .credential(firebase.auth().currentUser.email, password);

    return firebase.auth().currentUser.reauthenticateWithCredential(credential)
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

    return firebase.auth().currentUser.reauthenticateWithCredential(credential)
    .then( user => {
        firebase.auth().currentUser.updatePassword(newPass).then( user => {
            console.log("Password Changed");
        }, error => {
            console.log(error);
        });
    });
  }

}
