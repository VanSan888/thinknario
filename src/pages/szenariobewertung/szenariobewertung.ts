import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { RatingProvider } from '../../providers/rating/rating';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-szenariobewertung',
  templateUrl: 'szenariobewertung.html'
})
export class SzenariobewertungPage {

//notwendig für Navigation	
homePage = 'HomePage';
szenarioerstellungPage = 'SzenarioerstellungPage';

//Variablen zum Lesen und Schreiben von Bewertungen
public ratingData: any;
public entwicklung: number;
public realitaetsnaehe: number;
public relevanz: number;
public ausfuehrlichkeit: number;
public zusammenhaenge: number;
public wiedersprueche: number;
public faktenlage: number;

//Variable für die UID
public uid: string;


  constructor(public navCtrl: NavController,
              public ratingProvider: RatingProvider,
              public szenarioProvider: SzenarioProvider) {

  }
  
  //Lifecyyle event: Wenn Die Seite geladen wurde und die aktive Seite ist.
  ionViewDidEnter() {
    
    //Aufruf der getUserID() Funktion, um die UID des aktuellen Users zu ermitteln
    this.szenarioProvider.getUserID().then( UID => {
      this.uid = UID;
    });

	/*
	Aufruf des RantingProviders und dessen checkPath() Funktion
	Durch die .then(result) Funktion wird der tatsächliche Wert
	des Promise ausgelesen. Die Arrow-Funktion wird benötigt, um den .then()-Kontext nicht
	durcheinander zu bringen
	*/
    this.ratingProvider.checkPath().then((result: boolean) => {
	 //Wenn in dem Pfad Daten hinterlegt sind, dann...
     if(result === true) {
		/*
		...lese die Daten aus. getSzenarioData() Funktion aus
		dem SzenarioProvider wird aufgerufen. Wieder wird mit .then() und Arrowfunktion gearbeitet.
		Es wird ein Snapshot der hinterlegten Szenariodaten erstellt.
		*/
        this.ratingProvider.getRatingData().then( ratingSnap => {
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
	  } 
    });
  }
  
  
  //Es folgen Funktionen zum Aufruf der Update() Funktionen in rating.ts
  //Ebenfalls übergabe der zu aktualisierenden Werte
  updateEntwicklung(entwicklung) {
    this.ratingProvider.updateEntwicklung(entwicklung);
  }
 
  updateRealitaetsnaehe(realitaetsnaehe) {
    this.ratingProvider.updateRealitaetsnaehe(realitaetsnaehe);
  }
  
  updateRelevanz(relevanz) {
    this.ratingProvider.updateRelevanz(relevanz);
  }
  
  updateAusfuehrlichkeit(ausfuehrlichkeit) {
    this.ratingProvider.updateAusfuehrlichkeit(ausfuehrlichkeit);
  }
  
  updateZusammenhaenge(zusammenhaenge) {
    this.ratingProvider.updateZusammenhaenge(zusammenhaenge);
  }
  
  updateWiedersprueche(wiedersprueche) {
    this.ratingProvider.updateWiedersprueche(wiedersprueche);
  }
  
  updateFaktenlage(faktenlage) {
    this.ratingProvider.updateFaktenlage(faktenlage);
  }
  
  //Es muss für die Hompage und die Bibliothek ein Wert übergeben werden, um dieses Szenario dort
  //anzeigen zu lassen
  updateAverage(){
    //Allerdings nur, wenn noch kein Average vorhanden ist.
    this.szenarioProvider.checkPath("average").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Tue nichts, denn das Szenario wird ja eh schon angezeigt
      } else {
        //Ansonsten wird ein String übergeben, der anderen Usern deutlich macht, dass es noch keine Bewertungen gibt.
        this.ratingProvider.updateAverage("(Noch keine Bewertung)", this.uid);
      }
    });
  }
}
