import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import firebase from 'firebase';

@IonicPage({
	name:'bibliothekpage'
})
@Component({
  selector: 'page-bibliothek',
  templateUrl: 'bibliothekpage.html',
})
export class BibliothekPage {
  
  //Variable, auf die alle erstellten Szenarien geschrieben werden
  public szenarioList: Array<any>;

  constructor(public navCtrl: NavController,
              public bibliothekProvider: BibliothekProvider) {
  }

  ionViewDidEnter() {
	//Aufruf der getSzenarioList() Funktion in bibliothek.ts
    this.bibliothekProvider.getSzenarioList().then( szenarioListSnap => {
	  //Beschreiben der Varibalen mit den einzelnen Szenarien
      this.szenarioList = szenarioListSnap;
    });
  }
  
  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 
	//Der User soll nicht zu seiner eigenen SzenarioDetail Seite gelangen
    //Abrufen der aktuellen uid
	let currentUserID = firebase.auth().currentUser.uid;
    //Vergleich, ob die aktuelle uid gleich der uid des Navigationsziels ist
	if (currentUserID === szenarioId) {
		//Wenn ja, dann Navigiere zur Szenarioerstellung der aktuellen Users
		this.navCtrl.push('SzenarioerstellungPage');

	} else {
    //Ansonsten soll zu dem gewünschten Szenario navigiert werden:
    //Übergabe des Navigationsparameters an diese Szenariodetailseite.
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.		
    this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });
	
    }
  }
  
}

