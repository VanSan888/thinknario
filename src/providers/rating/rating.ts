import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable()
export class RatingProvider {

  constructor() {
  }
  
  
  /*
  Funktion, die prüft, ob der Pfad schon beschrieben ist.
  Für Erklärung dazu siehe "szenariobewertung.ts"
  */
  //Promise um Asynchronität zu gewährleisten
  checkPath():  Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  firebase.database().ref('/ratingData')
	  .child(firebase.auth().currentUser.uid).child('eigeneBewertung')
	  //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
	  .on('value', data => {
		//.exists() gibt "true" mittels resolve() an das Promise
		//zurück, wenn Werte in dem angegebenen Pfad existieren
	    resolve(data.exists());
	  });
	});  
  }
  
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort
  getRatingData(): Promise<any> {
    return new  Promise((resolve, reject) => { 
     firebase.database().ref('/ratingData').child(firebase.auth().currentUser.uid).child('eigeneBewertung')
     .on('value', data => {
       resolve(data.val());
      });
    });
  }
  
  updateEntwicklung(entwicklung: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      entwicklung: entwicklung,
    });
  }
  
  updateRealitaetsnaehe(realitaetsnaehe: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      realitaetsnaehe: realitaetsnaehe,
    });
  }
  
  updateRelevanz(relevanz: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      relevanz: relevanz,
    });
  }
  
  updateAusfuehrlichkeit(ausfuehrlichkeit: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      ausfuehrlichkeit: ausfuehrlichkeit,
    });
  }
  
  updateZusammenhaenge(zusammenhaenge: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      zusammenhaenge: zusammenhaenge,
    });
  }
  
  updateWiedersprueche(wiedersprueche: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      wiedersprueche: wiedersprueche,
    });
  }
  
  updateFaktenlage(faktenlage: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      faktenlage: faktenlage,
    });
  }

}
