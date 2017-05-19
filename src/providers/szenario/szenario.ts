import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class SzenarioProvider {
	
  constructor() {
	  
  }
  
 
    checkPath():  Promise<any> {
	 
	return new Promise((resolve, reject) => {
		firebase.database().ref('/userProfile')
		.child(firebase.auth().currentUser.uid).child("szenarioID")
		.on('value', data => {
			resolve(data.exists());
		});
	});  
	}  
/*  Funktioniert nicht richitg: gibt nur noch false raus.
	Evtl muss es nur 'szenarioID' heißen
	let check: boolean;
	let szenarioIDref = firebase.database().ref("/userProfile");
	szenarioIDref.on("value", function(dataSnapshot) {
	  check = dataSnapshot.child('/szenarioID').exists();
	});
	return check; 
   }*/
  
  
  getSzenarioData(): Promise<any> {
	
    return   new  Promise( (resolve, reject) => { 
     firebase.database().ref('/szenarioData').child(firebase.auth().currentUser.uid)
     .on('value', data => {
        resolve(data.val());
      });
    });
  } 

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

  
  updateProblemdefinition(problemdefinition: string) : firebase.Promise<any> {
	  
	return firebase.database().ref('/szenarioData').child(firebase.auth().currentUser.uid).update({
      problemdefinition: problemdefinition,
    });
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
}