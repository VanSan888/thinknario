import { Component } from '@angular/core';
import { NavController, IonicPage, Loading,  LoadingController} from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';

@IonicPage()
@Component({
  selector: 'page-bewertungen',
  templateUrl: 'bewertungen.html'
})
export class BewertungenPage {

//Notwendig um den Ladezustand anzuzeigen
public loading: Loading;

//Notwendig für die Navigation
bibliothekPage = 'bibliothekpage';

// Variable die zur Darstellung aller erstellten Bewertungen
public ratedList: Array<any>;

  constructor(public navCtrl: NavController,
              public bibliothekProvider: BibliothekProvider,
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
    this.bibliothekProvider.getRatedList().then( ratedListSnap => {
	  //Beschreiben der Varibalen mit den einzelnen Szenarien
      this.ratedList = ratedListSnap;
    });
    //Wenn alle Inhalte geladen sind, soll der Loader ausgeblendet werden.
    this.loading.dismiss();
  }
  
  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 
    //Übergabe des Navigationsparameters an diese Szenariodetailseite.
	  //Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.		
    this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });

  }

}
