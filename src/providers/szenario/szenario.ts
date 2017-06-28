import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class SzenarioProvider {
	
  constructor() {
	  
  }

 
  /*
  Funktion, um beim Aufruf der einzelnen Seiten zu schauen, ob der Pfad schon beschrieben ist.
  Für Erklärung dazu siehe "problemfeld.ts"
  */
  //Die Funtion bekommt ein Argument, in dem der zu prüfende Pfa steht.
  //Promise um Asynchronität zu gewährleisten
  checkPath(dataPath):  Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  firebase.database().ref('/szenarioData')
	  .child(firebase.auth().currentUser.uid).child(dataPath)
	  //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
	  .on('value', data => {
		//.exists() gibt "true" mittels resolve() an das Promise
		//zurück, wenn Werte in dem angegebenen Pfad existieren
	    resolve(data.exists());
	  });
	});  
  }

  checkDeskriptorPath():  Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  let storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid).child('deskriptor1');
    storageRef.getDownloadURL();
    resolve(true);
    reject(false);

	});  
  }
  
  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort
  getSzenarioData(): Promise<any> {
	
    return new  Promise((resolve, reject) => { 
     firebase.database().ref('/szenarioData').child(firebase.auth().currentUser.uid)
     .on('value', data => {
       resolve(data.val());
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
    locations['/ratingData/' + uid + '/' + 'problemdefinition/'] = updateData;	
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
  


  
  //Funtkion an sich ist gleich den obigen. Hier wird allerdings auch der Pfad (path) mit
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
  
  updateHilfe(hilfeVar: boolean) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child('szenariotext').update({
      hilfe: hilfeVar,
    });
  }
  
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