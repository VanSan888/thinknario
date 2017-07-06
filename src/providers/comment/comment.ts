import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommentProvider {

  constructor() {}
  
  checkPath(szenarioId, dataPath):  Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
	  //Zu prüfender Pfad inklusive der Varibalen aus den einzelnen Seiten
	  firebase.database().ref('/commentData')
	  .child(szenarioId).child(firebase.auth().currentUser.uid).child(dataPath)
	  //.on() inklusive Arrow Funktion und Snapshot("data"), um die Daten auszulesen
	  .on('value', data => {
		//.exists() gibt "true" mittels resolve() an das Promise
		//zurück, wenn Werte in dem angegebenen Pfad existieren
	    resolve(data.exists());
	  });
	});  
  }

  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort
  getCommentData(szenarioId): Promise<any> {
    return new  Promise((resolve, reject) => { 
     firebase.database().ref('/commentData').child(szenarioId)
     .child(firebase.auth().currentUser.uid)
     .on('value', data => {
       resolve(data.val());
      });
    });
  }

  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateKombinierteKommentare(szenarioId:string , kombinierteKommentare: string): firebase.Promise<any> {	
    return firebase.database().ref('/commentData').child(szenarioId)
    .child(firebase.auth().currentUser.uid).child("kombiniertekommentare").update({
      kombiniertekommentare: kombinierteKommentare,
    });
  }

  //Sehr ähnlich zu ProfileProvider. Siehe Erklärung dort  
  updateEntwicklungKommentar(szenarioId:string, entwicklungskommentar: string): firebase.Promise<any> {	
    return firebase.database().ref('/commentData').child(szenarioId)
    .child(firebase.auth().currentUser.uid).update({
      entwicklungskommentar: entwicklungskommentar,
    });
  }


}
