import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class SzenarioProvider {

  constructor() {}

  /*
  Funktion, um beim Aufruf der einzelnen Seiten zu schauen, ob der Pfad schon beschrieben ist.
  Für Erklärung dazu siehe "problemfeld.ts"
  */
  //Die Funtion bekommt ein Argument, in dem der zu prüfende Pfad steht.
  //Promise um Asynchronität zu gewährleisten
  checkPath(dataPath):  Promise<boolean> {
	  return new Promise<boolean>((resolve, reject) => {
      //Es wird ein Observer auf das Auth object gesetzt
      firebase.auth().onAuthStateChanged((user) => {
        //Wenn ein user angemeldet ist, dann
        if(user){
	        //prüfe den Pfad mit den Varibalen aus den einzelnen Seiten
	        firebase.database().ref('/szenarioData')
	        .child(firebase.auth().currentUser.uid).child(dataPath)
	        //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
	        .on('value', data => {
		        //.exists() gibt "true" mittels resolve() an das Promise
		        //zurück, wenn Werte in dem angegebenen Pfad existieren
	          resolve(data.exists());
	        });
        }
      });
	  });  
  }
  
  //Funktion für DeskriptorenanalysePage. Es wird geschaut, ob bei dem aktiven Nutzer
  // Daten im Storgae hinterlegt sind.
  checkDeskriptorPath():  Promise<any> {
	return new Promise<any>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  let storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid).child('deskriptor1');
    storageRef.getDownloadURL().then(function(url) {
          resolve(url);
        }).catch(function(error) {
          resolve(error);
        });
  	});  
  }
  
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort
  //Funktion, um die Szenariodaten des aktiven Nutzers abzurufen
  getSzenarioData(): Promise<any> {
    return new  Promise((resolve, reject) => { 
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          firebase.database().ref('/szenarioData').child(firebase.auth().currentUser.uid)
          .on('value', data => {
            resolve(data.val());
          });
        }
      }); 
    });
  }

  //Funktion ähnlich zu ProfileProvider. Siehe Erklärung dort
  //Aufgabe: Es sollen die Daten zu userName und Problemdefinition zu dem User abgerufen werden,
  //der gerade betrachtet wird. Diese Daten werden dann in der pushErstellteBewertungen()
  //Funktion in den entsprechenden Pfad geschrieben
  //Diese Funktion könnte auch durch getSzenarioData ersetzt werden.
  //Dann müsste man aber auch dort ein Argument übergeben, was überall Änderungen erfordern würde.
  getSzenarioDataForViewedUser(szenarioId: any): Promise<any> {
    return new  Promise((resolve, reject) => { 
     firebase.database().ref('/szenarioData').child(szenarioId)
     .on('value', data => {
       resolve(data.val());
      });
    });
  } 

//Funktion, um die UID des aktiven Users abzurufen
getUserID(): Promise<any> {
    return new  Promise((resolve, reject) => { 
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          let UID = firebase.auth().currentUser.uid;     
          resolve(UID);
        }
      }); 
    });
  }
  
  //Alle unteren Funktionen ähneln den .update() Funtionen im ProfileProvider stark
  //Siehe Erklärung dort. Namensgebung hier ist dann selbsterklärend. 
  updateProblemfeld(problemfeld1: boolean,
                    problemfeld2: boolean,
					          problemfeld3: boolean,
					          problemfeld4: boolean): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("problemfeld").update({
    problemfeld1: problemfeld1,
	  problemfeld2: problemfeld2,
	  problemfeld3: problemfeld3,
	  problemfeld4: problemfeld4,
    });
  }

  //Funktion zur Aktualisierung der Problemdefinition in verschiedenen Pfaden
  updateProblemdefinition(problemdefinition: string) : firebase.Promise<any> {
  //Festlegung der zu aktualisierenden Daten
  let updateData = {problemdefinition: problemdefinition};
  //Festlegung der aktuellen UserID
  let uid = firebase.auth().currentUser.uid;
  
  //Festlegung der verschiedenen Pfade
  let locations = {};
    locations['/szenarioData/' + uid + '/' + 'problemdefinition/'] = updateData;
    //hier dann noch den variablen Pfad in "/erstellteBewertungen" einfügen	
	//Update der Daten in den verschiedenen Pfaden	  
	return firebase.database().ref().update(locations);
  }

  updateSchluesselfaktor(schluesselfaktor1: boolean,
                         schluesselfaktor2: boolean,
						             schluesselfaktor3: boolean,
						             schluesselfaktor4: boolean,
						             schluesselfaktor5: boolean,
						             schluesselfaktor6: boolean,): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
    schluesselfaktor1: schluesselfaktor1,
	  schluesselfaktor2: schluesselfaktor2,
	  schluesselfaktor3: schluesselfaktor3,
	  schluesselfaktor4: schluesselfaktor4,
	  schluesselfaktor5: schluesselfaktor5,
	  schluesselfaktor6: schluesselfaktor6,
    });
  }
  
  //Update der Start- und Endzeitpunkte des Szenarios. Für Erklärung siehe ProfileProvider
  updateStartEnd(startSzenario: string, endSzenario: string): firebase.Promise<any> {
    return firebase.database().ref('/szenarioData').child(firebase.auth().currentUser.uid)
    .child("deskriptorenanalyse").update({
      startSzenario: startSzenario,
      endSzenario: endSzenario,
    });
  }
  // Es wird die URL des entsprechenden Canvas (Festlegung über dataPath) aus firebase runtergeladen und an
  //DeskriptorenanalysePage als Promise weitergegeben.
  getDeskriptorURL(dataPath: string): Promise<any>{
    return new  Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          let storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/')
          .child(dataPath);
	        storageRef.getDownloadURL().then( url => {
            resolve(url);
          });
        }
      });
    });
  }
  
  //Funktion, um die blobs im Firebase Storage zu speichern.
  //Grundlegende Funktion wie jede update() Funktion.
  uploadDeskriptor(blob: any, dataPath: string): firebase.Promise<any> {
    //Festlegen des Speicherpfades. (Eigene UID)
    let storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid);	
    //Beschreiben des jeweiligen Pfades (Deskriptor eins bis sechs)
    //und speichern des blobs mittels .put() Funktion.
    return storageRef.child(dataPath).put(blob);
    
    /*var uploadTask = */

    /*
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    }); */

  }
  
  //Funtkion an sich ist gleich den obigen Update-Funktionen.
  //Hier wird allerdings auch der Pfad (path) mit
  //übergeben, der aktualisiert werden soll.  
  updateAnnahme(path:string, annahme: string, begruendung?: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("annahmen").child(path).update({
    annahme: annahme,
	  begruendung: begruendung,
    });
  }
  
  //Ähnlich zu updateAnnahme()
  updateRandbedingung(path:string, randbedingung: string, begruendung?: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("randbedingungen").child(path).update({
    randbedingung: randbedingung,
	  begruendung: begruendung,
    });
  }  
   //Ähnlich zu updateAnnahme()
  updateEreignis(path:string, ereignis: string, begruendung?: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("ereignisse").child(path).update({
    ereignis: ereignis,
	  begruendung: begruendung,
    });
  }   

  //Update der einzelnen Szenariotexte
  updateSzenariotext(ausgangslageText: string,
                     entwicklungText: string,
					           endzustandText: string) : firebase.Promise<any> {
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child('szenariotext').update({
    ausgangslage: ausgangslageText,
	  entwicklung: entwicklungText,
	  endzustand: endzustandText,
    });
  }
  
  //Update der Variablen, die speichert, ob hilfe bei der Szenarioerstellung in Anspruch genommen wurde
  updateHilfe(hilfeVar: boolean) : firebase.Promise<any> {  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child('szenariotext').update({
      hilfe: hilfeVar,
    });
  }
  
  //Speichern der Counter-Variablen für die Szenarioerstellung.
  //Hört der User mitten in der Szenarioerstellung auf, kann er durch diese Variablen
  //anschließend genau dort weiter machen, wo er aufgehört hat.
  updateCounter(ausgangslageCounter: number,
                entwicklungCounter: number,
				        endzustandCounter: number) : firebase.Promise<any> { 
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child('szenariotext').update({
    ausgangslagecounter: ausgangslageCounter,
	  entwicklungcounter: entwicklungCounter,
	  endzustandcounter: endzustandCounter,
    });
  }
  
}