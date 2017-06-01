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
	      //Beschreiben des Arrays
          rawList.push({
			//Es werden nur der .key, der username und die Problemdefintion für die
			//Darstellung auf bibliothekpage.html benötigt
			//Später sollen auch die Anzahl der Kommentare und die durschnittliche Bewertung
			//Auf das Array geschrieben werden und in bibliothekpage.html angezeigt werden.
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
  
  // Funktion, um alle bewerteten Szenarien auf ein Array zu schreiben
  getRatedList2(): Promise<any> {  
    return new Promise( (resolve, reject) => {
      firebase.database().ref("ratingData").child(firebase.auth().currentUser.uid)
	  .child("erstellteBewertungen").on('value', snapshot => {
		firebase.database().ref("szenarioData").child(firebase.auth().currentUser.uid) 
		//Deklarierung des Arrays
        let rawList = [];
        snapshot.forEach( snap => {
	      //Beschreiben des Arrays
          rawList.push({
			//Es werden nur der .key, der username und die Problemdefintion für die
			//Darstellung auf bibliothekpage.html benötigt
			//Später sollen auch die Anzahl der Kommentare und die durschnittliche Bewertung
			//Auf das Array geschrieben werden und in bibliothekpage.html angezeigt werden.
            id: snap.key,
			szenarioId: snap.val().szenarioId,
          });
		  
        return false
        });
		  resolve(rawList);
        
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
			//Später sollen auch die Anzahl der Kommentare und die durschnittliche Bewertung
			//Auf das Array geschrieben werden und in bibliothekpage.html angezeigt werden.
            id: snap.key,
			szenarioId: snap.val().szenarioId,
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
	      username: snapshot.val().userName,
		  problemdefinition: snapshot.val().problemdefinition,
          annahme1: snapshot.val().annahmen.annahme1,
          annahme2: snapshot.val().annahmen.annahme2,
          annahme3: snapshot.val().annahmen.annahme3,
          annahme4: snapshot.val().annahmen.annahme4,
          randbedingung1: snapshot.val().randbedingungen.randbedingung1,
          randbedingung2: snapshot.val().randbedingungen.randbedingung2,
          randbedingung3: snapshot.val().randbedingungen.randbedingung3,
          randbedingung4: snapshot.val().randbedingungen.randbedingung4,
          ereignis1: snapshot.val().ereignisse.ereignis1,
          ereignis2: snapshot.val().ereignisse.ereignis2,
          ereignis3: snapshot.val().ereignisse.ereignis3,
          ereignis4: snapshot.val().ereignisse.ereignis4,
          //deskriptoren: snapshot.deskriptoren.val().deskriptor1,
          szenariotext: snapshot.val().szenariotext
        });
      });
    });
  }
   
}
