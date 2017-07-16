import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class BibliothekProvider {

  constructor() {
  }
  // Funktion, um alle erstellten Szenarien auf ein Array zu schreiben
  getSzenarioList(): Promise<any> {  
    return new Promise( (resolve, reject) => {
      firebase.database().ref("szenarioData")
      .on('value', snapshot => {
		    //Deklarierung des Arrays
        let rawList = [];
        snapshot.forEach( snap => {
          //Hier wird mittels einer Firebase-Abfrage geschaut, ob schon ein Average für das Szenario
          //verfügbar ist. Sehr ähnlich zu szenarioProvider.checkPath, siehe Erklärung dort.
          //Wenn kein Average angegeben ist, der User also sein eigenes Szenario
          //noch nicht bewertet hat und es somit noch nicht vollständig ist,
          //Wird es auch nicht auf der HomePage (in der Bibliothek) angezeigt

          //Abzufragender Pfad:
          firebase.database().ref('/szenarioData')
	        .child(snap.key).child("average")
	        .on('value', data => {
            //Wenn ein Wert existiert, dann...
            if(data.exists()){
              //Beschreibe das Arrays
              rawList.push({
			          //Es werden nur der .key, der username, der Average und die Problemdefintion für die
			          //Darstellung auf bibliothekpage.html benötigt
                id: snap.key,
			          username: snap.val().userName.userName,
                problemdefinition: snap.val().problemdefinition.problemdefinition,
			          average: snap.val().average.average,
              });  
            }
          });
          //Damit der .forEach "snap" => void einen wert returned und damit assignable to type
          // datasnapshot => boolean wird
          return false
        });
		  resolve(rawList);
      });
    });
  }
  
  //Funktion um mit Hilfe der (szenarioId) den Pfad zu bestimmen, aus den die Daten gelesen werden sollen
  //(szenarioId) legt fest, welche Szenariodaten gelesen und zurückgegeben werden sollen.
  //szenarioId wird je nach dem festgelegt, welche ion-card auf bibliothekpage.html angeklickt wird
  getSzenarioDetail(szenarioId): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref("szenarioData/")
      .child(szenarioId).on('value', snapshot => {
        resolve({
		  //Beschreiben der Properties mit den Daten aus den jeweiligen Szenarien
          id: snapshot.key,
	        username: snapshot.val().userName.userName,
		      problemdefinition: snapshot.val().problemdefinition.problemdefinition,
          schluesselfaktor1: snapshot.val().schluesselfaktoren.schluesselfaktor1,
          schluesselfaktor2: snapshot.val().schluesselfaktoren.schluesselfaktor2,
          schluesselfaktor3: snapshot.val().schluesselfaktoren.schluesselfaktor3,
          schluesselfaktor4: snapshot.val().schluesselfaktoren.schluesselfaktor4,
          schluesselfaktor5: snapshot.val().schluesselfaktoren.schluesselfaktor5,
          schluesselfaktor6: snapshot.val().schluesselfaktoren.schluesselfaktor6,
          annahme1: snapshot.val().annahmen.annahme1.annahme,
          annahme2: snapshot.val().annahmen.annahme2.annahme,
          annahme3: snapshot.val().annahmen.annahme3.annahme,
          annahme4: snapshot.val().annahmen.annahme4.annahme,
		      annahmebegruendung1: snapshot.val().annahmen.annahme1.begruendung,
		      annahmebegruendung2: snapshot.val().annahmen.annahme2.begruendung,
		      annahmebegruendung3: snapshot.val().annahmen.annahme3.begruendung,
		      annahmebegruendung4: snapshot.val().annahmen.annahme4.begruendung,
          randbedingung1: snapshot.val().randbedingungen.randbedingung1.randbedingung,
          randbedingung2: snapshot.val().randbedingungen.randbedingung2.randbedingung,
          randbedingung3: snapshot.val().randbedingungen.randbedingung3.randbedingung,
          randbedingung4: snapshot.val().randbedingungen.randbedingung4.randbedingung,
		      randbedingungbegruendung1: snapshot.val().randbedingungen.randbedingung1.begruendung,
		      randbedingungbegruendung2: snapshot.val().randbedingungen.randbedingung2.begruendung,
		      randbedingungbegruendung3: snapshot.val().randbedingungen.randbedingung3.begruendung,
		      randbedingungbegruendung4: snapshot.val().randbedingungen.randbedingung4.begruendung,
          ereignis1: snapshot.val().ereignisse.ereignis1.ereignis,
          ereignis2: snapshot.val().ereignisse.ereignis2.ereignis,
          ereignis3: snapshot.val().ereignisse.ereignis3.ereignis,
          ereignis4: snapshot.val().ereignisse.ereignis4.ereignis,
		      ereignisbegruendung1: snapshot.val().ereignisse.ereignis1.begruendung,
		      ereignisbegruendung2: snapshot.val().ereignisse.ereignis2.begruendung,
		      ereignisbegruendung3: snapshot.val().ereignisse.ereignis3.begruendung,
		      ereignisbegruendung4: snapshot.val().ereignisse.ereignis4.begruendung,
          szenariotext: snapshot.val().szenariotext.ausgangslage,
		      ausgangslage: snapshot.val().szenariotext.ausgangslage,
		      entwicklung: snapshot.val().szenariotext.entwicklung,
		      endzustand: snapshot.val().szenariotext.endzustand,
		      hilfe: snapshot.val().szenariotext.hilfe,	
          average: snapshot.val().average.average,
        });
      });
    });
  }

  
  getRatedList(): Promise<any> {  
    return new Promise( (resolve, reject) => {
      firebase.database().ref("ratingData").child(firebase.auth().currentUser.uid)
	  .child("erstellteBewertungen").on('value', snapshot => {
		//Deklarierung des Arrays
        let rawList = [];
        snapshot.forEach( snap => {
	      //Beschreiben des Arrays
          rawList.push({
			      //Es werden nur der .key, der username und die Problemdefintion für die
			      //Darstellung auf bibliothekpage.html benötigt
			      //Später soll auch die Anzahl der Kommentare
			      //Auf das Array geschrieben werden und in bibliothekpage.html angezeigt werden.
            id: snap.key,
			      username: snap.val().userName,
			      problemdefinition: snap.val().problemdefinition,
			      average: snap.val().average.average,			
          });		  
        return false
        });
	      resolve(rawList);
        
      });
    });
  }
  
  
  //Hier wird ein Array mit den UIDs beschrieben, von denen man eine Bewertung erhalten hat
  //In den updateUsername() updateAverage() und updateProblemdefinition() Funktionen wird dieses
  //Array benutzt, um auch in "ratingData/currentUser/erstellteBewertungen" den usernamen, den Average
  //und die Problemdefintion zu aktualisieren
  //--> Noch NICHT Einsatzbereit
  getErhalteneBewertungenList(): Promise<any> {  
    return new Promise( (resolve, reject) => {
      firebase.database().ref("ratingData").child(firebase.auth().currentUser.uid)
	  .child("erhalteneBewertungen").on('value', snapshot => {
		    //Deklarierung des Arrays
        let rawList = [];
        snapshot.forEach( snap => {
	        //Beschreiben des Arrays
          rawList.push({
			      //Es werden nur der .key, benötigt
            id: snap.key			
          });		  
        return false
        });
	      resolve(rawList);
      });
    });
  }  
  
  
  /*
  Diese Funktion später nach dem Vorbild von getSzenariolist gestalten.
  Es soll dabei allerdings nach den meisten Kommentaren
  und/oder den besten Bewertungen durch .orderByChild() usw. gefiltert werden.
  
  getShortSzenarioList(): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref("szenarioData").orderByChild().endAt(2)
      .on('value', snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
			username: snap.val().userName,
            problemdefinition: snap.val().problemdefinition,
          });
		  
        return false
        });
        resolve(rawList);
      });
    });
  }  
  */
  

   
}
