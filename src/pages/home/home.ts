import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import { SzenarioProvider } from '../../providers/szenario/szenario';





@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Notwendig für Navigation
bewertungenPage = 'BewertungenPage';
meinSzenarioPage = 'MeinSzenarioPage';
bibliothekPage = 'bibliothekpage';

public uid: string;

//Variable, auf die alle erstellten Szenarien geschrieben werden
public szenarioList: Array<any>;


  constructor(public navCtrl: NavController,
              public szenarioProvider: SzenarioProvider,
              public bibliothekProvider: BibliothekProvider) {
  }

  ionViewDidEnter() {
	//Aufruf der getSzenarioList() Funktion in bibliothek.ts
    this.bibliothekProvider.getSzenarioList().then( szenarioListSnap => {
	  //Beschreiben der Varibalen mit den einzelnen Szenarien
      this.szenarioList = szenarioListSnap;
    });

    //Aufruf der getUserID() Funktion, um die UID des aktuellen Users zu ermitteln
    this.szenarioProvider.getUserID().then( UID => {
      this.uid = UID;
    });
	
  }
  
  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 
	  //Der User soll nicht zu seiner eigenen SzenarioDetailseite gelangen,
    //sondern dann wieder zu seiner eigenen Szenarioerstellung
    //Vergleich, ob die aktuelle uid gleich der uid des Navigationsziels ist
	  if (this.uid === szenarioId) {
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
