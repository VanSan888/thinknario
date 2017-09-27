import { Component } from '@angular/core';
import { NavController, IonicPage, Loading,  LoadingController } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Notwendig um den Ladezustand anzuzeigen
public loading: Loading;

//Notwendig für Navigation
bewertungenPage = 'BewertungenPage';
bibliothekPage = 'bibliothekpage';
benachrichtigungenPage = 'BenachrichtigungenPage';

//Variable für die UID
public uid: string;

//Variable, auf die alle erstellten Szenarien geschrieben werden
public szenarioList: Array<any>;


  constructor(public navCtrl: NavController,
              public szenarioProvider: SzenarioProvider,
              public bibliothekProvider: BibliothekProvider,
              public loadingCtrl: LoadingController,) {}

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
  
  //Hole erneut die Liste aller bisher erstellten Szenarios
  doRefresh(refresher) {
	  //Aufruf der getSzenarioList() Funktion in bibliothek.ts
    this.bibliothekProvider.getSzenarioList().then( szenarioListSnap => {
	  //Beschreiben der Varibalen mit den einzelnen Szenarien
      this.szenarioList = szenarioListSnap;
    });
    //Beende den refresher
    refresher.complete();

  }

  //Methode zur Navigation. Es wird nicht zu den Stacks der Views hinzugefügt,
  //Sondern eine neue rootPage festgelegt.
  goToMeinSzenario(){
    this.navCtrl.setRoot('MeinSzenarioPage');
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
	    //Der Navigationsparameter entspricht der UID des Szenarios, welches bewertet werden soll.		
      this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });	
    }
  }

}
