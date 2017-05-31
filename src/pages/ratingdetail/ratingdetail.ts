import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { RatingProvider } from '../../providers/rating/rating';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';


@IonicPage({
    name: 'ratingdetail',
	segment: 'ratingdetail/:szenarioID'
})
@Component({
  selector: 'page-ratingdetail',
  templateUrl: 'ratingdetail.html'
})
export class RatingDetailPage {

//notwendig für Navigation	
homePage = 'HomePage';

public ratingData: any;
public currentSzenario: any;
public entwicklung: number;
public realitaetsnaehe: number;
public relevanz: number;
public ausfuehrlichkeit: number;
public zusammenhaenge: number;
public wiedersprueche: number;
public faktenlage: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ratingProvider: RatingProvider,
			  public bibliothekProvider: BibliothekProvider) {

  }
  
  //Lifecyyle event: Wenn Die Seite geladen wurde und die aktive Seite ist.
  ionViewDidEnter() {  
	/*
	Aufruf des RantingProviders und dessen checkPath() Funktion
	Durch die .then(result) Funktion wird der tatsächliche Wert
	des Promise ausgelesen. Die Arrow-Funktion wird benötigt, um den .then()-Kontext nicht
	durcheinander zu bringen
	*/
    this.ratingProvider.checkPathDetail(this.navParams.get('szenarioId')).then((result: boolean) => {
	 //Wenn in dem Pfad Daten hinterlegt sind, dann...
     if(result === true) {
		 
	   this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
       .then( szenarioSnap => {
         this.currentSzenario = szenarioSnap;
       });
		
		/*
		...lese die Daten aus. getRatingData() Funktion aus
		dem RatingProvider wird aufgerufen. Wieder wird mit .then() und Arrowfunktion gearbeitet.
		Es wird ein Snapshot der hinterlegten Szenariodaten erstellt.
		*/
        this.ratingProvider.getRatingDataDetail(this.navParams.get('szenarioId')).then( ratingSnap => {
		//Hier wird der Snapshot auf die Hilfsvariable geschrieben.
        this.ratingData = ratingSnap;
		//Hier werden die einzelnen Variablen mit en einzelnen Daten beschrieben.
        this.entwicklung      = this.ratingData.entwicklung;
        this.realitaetsnaehe  = this.ratingData.realitaetsnaehe;
        this.relevanz         = this.ratingData.relevanz;
        this.ausfuehrlichkeit = this.ratingData.ausfuehrlichkeit;
        this.zusammenhaenge   = this.ratingData.zusammenhaenge;
        this.wiedersprueche   = this.ratingData.wiedersprueche;
        this.faktenlage       = this.ratingData.faktenlage;

	    });
	  } else {
		  
		  this.ratingProvider.pushErstellteBewertungen(this.navParams.get('szenarioId'));
         
	  }
    });
  }
  
  updateEntwicklungDetail(entwicklung) {
    this.ratingProvider.updateEntwicklungDetail(entwicklung, this.navParams.get('szenarioId'));
  }
 
  updateRealitaetsnaeheDetail(realitaetsnaehe) {
    this.ratingProvider.updateRealitaetsnaeheDetail(realitaetsnaehe, this.navParams.get('szenarioId'));
  }
  
  updateRelevanzDetail(relevanz) {
    this.ratingProvider.updateRelevanzDetail(relevanz, this.navParams.get('szenarioId'));
  }
  
  updateAusfuehrlichkeitDetail(ausfuehrlichkeit) {
    this.ratingProvider.updateAusfuehrlichkeitDetail(ausfuehrlichkeit, this.navParams.get('szenarioId'));
  }
  
  updateZusammenhaengeDetail(zusammenhaenge) {
    this.ratingProvider.updateZusammenhaengeDetail(zusammenhaenge, this.navParams.get('szenarioId'));
  }
  
  updateWiederspruecheDetail(wiedersprueche) {
    this.ratingProvider.updateWiederspruecheDetail(wiedersprueche, this.navParams.get('szenarioId'));
  }
  
  updateFaktenlageDetail(faktenlage) {
    this.ratingProvider.updateFaktenlageDetail(faktenlage, this.navParams.get('szenarioId'));
  }
  
}
