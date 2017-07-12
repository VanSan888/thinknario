import { Component } from '@angular/core';
import { IonicPage, NavController, Loading,  LoadingController } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import { SzenarioProvider } from '../../providers/szenario/szenario';

@IonicPage({
	name:'bibliothekpage'
})
@Component({
  selector: 'page-bibliothek',
  templateUrl: 'bibliothekpage.html',
})
export class BibliothekPage {

  //Notwendig um den Ladezustand anzuzeigen
  public loading: Loading;
  
  //Variable, auf die alle erstellten Szenarien geschrieben werden
  public szenarioList: Array<any>;
  //Variable für die UID
  public uid: string;

  constructor(public navCtrl: NavController,
              public bibliothekProvider: BibliothekProvider,
              public szenarioProvider: SzenarioProvider,
              public loadingCtrl: LoadingController,) {
  }

  //Frühester Lifecyclehook, um den Loadingcontroller anzuzeigen
  ionViewWillEnter(){
    //Erstellung des SVG Elements
    this.loading = this.loadingCtrl.create({
    //Anzuzeigender Text
    content: 'Bitte warten...'
    });
    //Anzeige des Loaders
    this.loading.present();
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

    //Wenn alle Inhalte geladen sind, soll der Loader ausgeblendet werden.
    this.loading.dismiss();
  }
  
  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 
	  //Der User soll nicht zu seiner eigenen SzenarioDetail Seite gelange

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

