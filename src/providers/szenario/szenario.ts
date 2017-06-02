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
  updateProblemfeld1(problemfeld1: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("problemfeld").update({
      problemfeld1: problemfeld1,
    });
  }
  updateProblemfeld2(problemfeld2: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("problemfeld").update({
      problemfeld2: problemfeld2,
    });
  }
  updateProblemfeld3(problemfeld3: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("problemfeld").update({
      problemfeld3: problemfeld3,
    });
  }
  updateProblemfeld4(problemfeld4: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("problemfeld").update({
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

  updateSchluesselfaktor1(schluesselfaktor1: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor1: schluesselfaktor1,
    });
  }
  updateSchluesselfaktor2(schluesselfaktor2: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor2: schluesselfaktor2,
    });
  }
  updateSchluesselfaktor3(schluesselfaktor3: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor3: schluesselfaktor3,
    });
  }
  updateSchluesselfaktor4(schluesselfaktor4: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor4: schluesselfaktor4,
    });
  }
  updateSchluesselfaktor5(schluesselfaktor5: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor5: schluesselfaktor5,
    });
  }
  updateSchluesselfaktor6(schluesselfaktor6: any): firebase.Promise<any> {	
    return firebase.database().ref('/szenarioData')
    .child(firebase.auth().currentUser.uid).child("schluesselfaktoren").update({
      schluesselfaktor6: schluesselfaktor6,
    });
  }
  
  updateAnnahme1(annahme1: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("annahmen").update({
      annahme1: annahme1,
    });
  }
    updateAnnahme2(annahme2: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("annahmen").update({
      annahme2: annahme2,
    });
  }
  updateAnnahme3(annahme3: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("annahmen").update({
      annahme3: annahme3,
    });
  }
  updateAnnahme4(annahme4: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("annahmen").update({
      annahme4: annahme4,
    });
  }
  
  updateRandbedingung1(randbedingung1: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("randbedingungen").update({
      randbedingung1: randbedingung1,
    });
  }
  updateRandbedingung2(randbedingung2: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("randbedingungen").update({
      randbedingung2: randbedingung2,
    });
  }
  updateRandbedingung3(randbedingung3: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("randbedingungen").update({
      randbedingung3: randbedingung3,
    });
  }
  updateRandbedingung4(randbedingung4: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("randbedingungen").update({
      randbedingung4: randbedingung4,
    });
  }
  
  updateEreignis1(ereignis1: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("ereignisse").update({
      ereignis1: ereignis1,
    });
  }
  updateEreignis2(ereignis2: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("ereignisse").update({
      ereignis2: ereignis2,
    });
  }
  updateEreignis3(ereignis3: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("ereignisse").update({
      ereignis3: ereignis3,
    });
  }
  updateEreignis4(ereignis4: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).child("ereignisse").update({
      ereignis4: ereignis4,
    });
  }
  
  updateSzenariotext(szenarioText: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData')
	.child(firebase.auth().currentUser.uid).update({
      szenariotext: szenarioText,
    });
  } 
  
}