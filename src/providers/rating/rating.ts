import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable()
export class RatingProvider {

  constructor() {
  }
  
  //Zuerst erfolgen in diesem provider die Funktionen für die Selbstbewertung.
  //Danach werden die Funktionen für die ratingdetail.ts Seiten aufgeführt.
  //Die beiden Funktionsgruppen ähneln sich stark
  //Am Ende wird eine Funktion erstellt, die für die Berechnung 
  //des Durchschnittswerts der Bewertungen für ein Szenario benötigt wird
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
  

  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateEntwicklung(entwicklung: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      entwicklung: entwicklung,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateRealitaetsnaehe(realitaetsnaehe: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      realitaetsnaehe: realitaetsnaehe,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateRelevanz(relevanz: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      relevanz: relevanz,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateAusfuehrlichkeit(ausfuehrlichkeit: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      ausfuehrlichkeit: ausfuehrlichkeit,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateZusammenhaenge(zusammenhaenge: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      zusammenhaenge: zusammenhaenge,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateWiedersprueche(wiedersprueche: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      wiedersprueche: wiedersprueche,
    });
  }
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateFaktenlage(faktenlage: number): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData')
    .child(firebase.auth().currentUser.uid).child("eigeneBewertung").update({
      faktenlage: faktenlage,
    });
  }
  
  //Ab hier folgen die Funtkionen für die ratingdetail.ts Seiten
  checkPathDetail(szenarioId):  Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  firebase.database().ref('/ratingData')
	  .child(szenarioId).child('erhalteneBewertungen').child(firebase.auth().currentUser.uid)
	  //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
	  .on('value', data => {
		//.exists() gibt "true" mittels resolve() an das Promise
		//zurück, wenn Werte in dem angegebenen Pfad existieren
	    resolve(data.exists());
	  });
	});  
  }

  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort
  getRatingDataDetail(szenarioId): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref("ratingData/")
      .child(szenarioId).child('erhalteneBewertungen').child(firebase.auth().currentUser.uid)
	  .on('value', data => {
       resolve(data.val());
      });
    });
  }
  
  //Funktion bekommt als Argument das zu updatende Ratingkriterium (hier "entwicklung" und
  //den Pfad der beschrieben werden soll. In diesem Fall soll innerhalb der ratingData
  //das Szenario mit Bewertungsdaten beschrieben werden, welches der aktive Nutzer zur Zeit bewertet.
  //Die Daten werden im Unterordner "erhaltene Bewertungen" gespeichert.
  updateEntwicklungDetail(entwicklung: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      entwicklung: entwicklung,
    });
  }
  //Siehe Erklärung zu updateEntwicklungDetail
  updateRealitaetsnaeheDetail(realitaetsnaehe: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      realitaetsnaehe: realitaetsnaehe,
    });
  }
   //Siehe Erklärung zu updateEntwicklungDetail 
  updateRelevanzDetail(relevanz: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      relevanz: relevanz,
    });
  }
  //Siehe Erklärung zu updateEntwicklungDetail  
  updateAusfuehrlichkeitDetail(ausfuehrlichkeit: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      ausfuehrlichkeit: ausfuehrlichkeit,
    });
  }
  //Siehe Erklärung zu updateEntwicklungDetail 
  updateZusammenhaengeDetail(zusammenhaenge: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      zusammenhaenge: zusammenhaenge,
    });
  }
  //Siehe Erklärung zu updateEntwicklungDetail  
  updateWiederspruecheDetail(wiedersprueche: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      wiedersprueche: wiedersprueche,
    });
  }
  //Siehe Erklärung zu updateEntwicklungDetail  
  updateFaktenlageDetail(faktenlage: number, szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).child("erhalteneBewertungen")
    .child(firebase.auth().currentUser.uid).update({
      faktenlage: faktenlage,
    });
  }
  //Um dem aktiven User, der Bewertungen erstellt, später anzeigen zu können, zu welchen Szenarien er
  //schon Bewertungen erstellt hat, wird an dieser Stelle eine Liste erstellt.
  //Die Daten werden in "/ratingData/currentUser/erstellteBewertungen" abgelegt.
  //Diese Daten werden auf der bewertungen.ts Seite abgerufen.
  pushErstellteBewertungen(szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(firebase.auth().currentUser.uid)
	.child("erstellteBewertungen")
    .push({
      szenarioId: szenarioId,
    });
  }
  
  //Funktion, um die Werte aller Bewertungen für ein Szenario auszulesen
  getRatingValues(szenarioId): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref("ratingData").child(szenarioId)
	  .child("erhalteneBewertungen").on('value', snapshot => {
		//Deklarierung des Arrays
        let rawList = [];
        snapshot.forEach( snap => {
	      //Beschreiben des Arrays
          rawList.push({
			//entwicklung wird nicht benötigt, da dieser Wert nicht die Qualität eines Szenarios misst
            realitaetsnaehe: snap.val().realitaetsnaehe,
			relevanz: snap.val().relevanz,
			ausfuehrlichkeit: snap.val().ausfuehrlichkeit,
			zusammenhaenge: snap.val().zusammenhaenge,
			wiedersprueche: snap.val().wiedersprueche,
			faktenlage: snap.val().faktenlage,
          });
		  
        return false
        });
		  resolve(rawList);
      });
    });
  }
  
  //Funktion, um den neuen Durchschnittswert zu aktualisieren
  //Siehe Erklärung zu updateEntwicklungDetail  
  updateAverage(average: number,  szenarioId: any): firebase.Promise<any> {	
    return firebase.database().ref('/ratingData').child(szenarioId).update({
      average: average,
    });
  } 
  

}
