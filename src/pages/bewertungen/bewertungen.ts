import { Component } from '@angular/core';
import { NavController, IonicPage} from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';

@IonicPage()
@Component({
  selector: 'page-bewertungen',
  templateUrl: 'bewertungen.html'
})
export class BewertungenPage {

//Notwendig für die Navigation
bibliothekPage = 'bibliothekpage';

// Variable die zur Darstellung aller erstellten Bewertungen
public ratedList: Array<any>;

  constructor(public navCtrl: NavController,
              public bibliothekProvider: BibliothekProvider) {
  }
  
  ionViewDidEnter() {
	//Aufruf der getSzenarioList() Funktion in bibliothek.ts
    this.bibliothekProvider.getRatedList().then( ratedListSnap => {
	  //Beschreiben der Varibalen mit den einzelnen Szenarien
      this.ratedList = ratedListSnap;
    });
  }
  
  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 
    //Übergabe des Navigationsparameters an diese Szenariodetailseite.
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.		
    this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });

  }

}
