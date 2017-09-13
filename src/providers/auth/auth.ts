import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthData {

  constructor() {
    
  }

//Funktion für Firebase Login mit E-Mail und Passwort
loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

//Funktion für Firebase-Registrierung mit E-Mail und Passwort
signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
		    //E-Mail-Adresse wird in /userProfile gespeichert
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
  });
}

//Funktion, um eine Mail zum Passwortzurücksetzen zu senden
resetPassword(email: string): firebase.Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

//Funktion für Firebase-Logout
logoutUser(): firebase.Promise<void> {
  firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).off();

  return firebase.auth().signOut();
}
  
}
