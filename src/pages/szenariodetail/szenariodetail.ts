import { Component } from '@angular/core';
//NavParams kontrollieren die Navigationsparameter
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';



@IonicPage({
	name: 'szenariodetail',
	//Hier wird eine Instanz dieser Seite mittels der SzenarioID aufgerufen
	//SzenarioID wird in bibliothekpage.ts an diese Seite übergeben
	segment: 'szenariodetail/:szenarioID'
})
@Component({
  selector: 'page-szenariodetail',
  templateUrl: 'szenariodetail.html',
})
export class SzenariodetailPage {
  
  //Variable die mit den Daten des Szenarios beschrieben wird.
  public currentSzenario: any;
  public toggleVar: boolean= false;
  
  //NavParams sind notwendig, um die Weiterleitung von der Bibliothekpage zu gewährleisten
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public bibliothekProvider: BibliothekProvider) {}
  
  
  
  ionViewDidEnter(){
	//Aufruf der getSzenarioDetail() Funktion und übergabe der aktuellen Navigationsparameter.
	//Durch die Übergabe dieses Parameters kann in bibliothek.ts der passende Pfad für die
	//Abzurufenden Daten beschritten werden
    this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
    .then( szenarioSnap => {
	  //Beschreiben der Variablen mit den Daten des Snapshots aus firebase
      this.currentSzenario = szenarioSnap;
    });
  }
  
  //Funktion für die Navigation zur Ratingdetailseite
  goToRatingDetail(szenarioId){
    //Übergabe des Navigationsparameters an diese Seite.
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.
    this.navCtrl.push('ratingdetail', { 'szenarioId': szenarioId });
  }

  hideBegruendungen() {
    if (this.toggleVar == true){
	  this.toggleVar = false;
	} else if (this.toggleVar == false){
	    this.toggleVar = true;
	}
  }

}
