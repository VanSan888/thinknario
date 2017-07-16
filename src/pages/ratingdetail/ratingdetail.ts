import { Component } from '@angular/core';
//NavParams kontrollieren die Navigationsparameter
import { NavController, IonicPage, NavParams, AlertController } from 'ionic-angular';
import { RatingProvider } from '../../providers/rating/rating';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { CommentProvider } from '../../providers/comment/comment';


@IonicPage({
    name: 'ratingdetail',
	//Hier wird eine Instanz dieser Seite mittels der SzenarioID aufgerufen
	//SzenarioID wird in szenariodetail.ts an diese Seite übergeben
	segment: 'ratingdetail/:szenarioID'
})
@Component({
  selector: 'page-ratingdetail',
  templateUrl: 'ratingdetail.html'
})
export class RatingDetailPage {

//notwendig für Navigation	
homePage = 'HomePage';

//Properties für die Datentransferierung von und zu firebase
public ratingData: any;
//Variable wird benötigt, um in ratingdetail.html den aktuellen Username anzuzeigen
public currentSzenario: any;
//Variablen, die benötigt werden, um in "/erstellteBewertungen" einen Wert auszulesen
//und daraufhin verschiedene Buttons in ratingdetail.html anzuzeigen
public showButtons: any;
//Variable, auf die die einzelnen Berwertungen geschrieben werden
public ratingList: Array<any>;
//Variablen die mit den Ratingdaten beschrieben werden
public entwicklung: number;
public realitaetsnaehe: number;
public relevanz: number;
public ausfuehrlichkeit: number;
public zusammenhaenge: number;
public wiedersprueche: number;
public faktenlage: number;

//Variablen für die Liste des aktiven Users in "ratingData/erstellteBewertungen/szenarioId"
public ratingListForBewertungen: any;
public userName: string;
public problemdefinition: string;
public averageForBewertungen: number;

//Variable zur abhängigen Ausgabe von Subtiteln in den Alerts
public subTitleText: string;

//Variablen zur Berechnung des Durchschnittswertes
public v1: number;
public v2: number;
public v3: number;
public v4: number;
public v5: number;
public v6: number;
public sum: number= 0;
public average: number=0;
public i: number=0
 
  //NavParams sind notwendig, um die Weiterleitung von der Bibliothekpage zu gewährleisten
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ratingProvider: RatingProvider,
			        public bibliothekProvider: BibliothekProvider,
              public commentProvider: CommentProvider,
              public szenarioProvider: SzenarioProvider,
              public alertCtrl: AlertController) {

  }
  
  //Lifecyyle event: Wenn Die Seite geladen wurde und die aktive Seite ist.
  ionViewDidEnter() {
    
	//Aufruf der getSzenarioDetail() Funktion und Übergabe der aktuellen Navigationsparameter.
	//Funktion dient hier nur dazu, den aktuellen User abzufragen und in ratingdetail.html anzuzeigen
    this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
    .then( szenarioSnap => {
	    //Beschreiben der Variablen mit den Daten des Snapshots aus firebase
      this.currentSzenario = szenarioSnap;
    });
  

    //Schauen, ob der Bewerter den zu Bewertenden schon vorher einmal bewertet hat
    this.ratingProvider.checkPathDetail(this.navParams.get('szenarioId')).then((result: boolean) => {
	   //Wenn in dem Pfad Daten hinterlegt sind, er ihn also shcon mal bewertet hat, dann...
     if(result === true) {		 
		/*
		...lese die Daten aus. getRatingDataDetail() Funktion aus
		dem RatingProvider wird aufgerufen. Wieder wird mit .then() und Arrowfunktion gearbeitet.
		Es wird ein Snapshot der hinterlegten Ratingdaten erstellt.
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

    //Aufruf der showButton() Funktion zur Darstellung verschiedener Button je nach Datenlage.
    this.showButton();

	  } else {
		  //Wenn keine Daten in dem überprüften Pfad hinterlegt sind, dann wird zunächst
		  //bei dem User, der das vorliegende Szenario bewerten soll, ein Eintrag in 
		  // "/ratingData/currentUserID/erstellteBewertungen" erzeugt. Weitere Erklärungen dazu
		  //in rating.ts unter pushErstellteBewertungen.

      //Daten lesen
		  this.szenarioProvider.getSzenarioDataForViewedUser(this.navParams.get('szenarioId'))
			.then( snap => {
		  this.ratingListForBewertungen        = snap;
      this.userName                        = this.ratingListForBewertungen.userName.userName;
		  this.averageForBewertungen           = this.ratingListForBewertungen.average.average;
		  this.problemdefinition               = this.ratingListForBewertungen.problemdefinition.problemdefinition;
		  }).then( snap => {
		  //Eintrag erstellen
		  this.ratingProvider.updateErstellteBewertungen(this.navParams.get('szenarioId'),
		                                                 this.userName,
													                           this.averageForBewertungen,
													                           this.problemdefinition);
		  });
      //Aufruf der showButton() Funktion zur Darstellung verschiedener Button je nach Datenlage.
      this.showButton();
      
      //Außerdem müssen Dummidaten für die Kommentare erstellt werden. Die ist eine Möglichkeit
      //die Kommentarebei commentdetail.ts in einem gemeinsamem Feld zusammengefasst werden.
      // Ansonsten müsste in commentdetail.ts eine Abfrage für jeden Pfad erstellt werden.
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "entwicklung", "");
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "realitaetsnaehe", "");         
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "relevanz", "");
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "ausfuehrlichkeit", "");
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "zusammenhaenge", "");
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "wiedersprueche", "");
      this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), "faktenlage", "");

	    }
    });
  }
  
  //Update der ratingDaten
  updateEntwicklungDetail(entwicklung: number) {
    //Wenn die Bewertung sehr positiv oder sehr negativ ausfällt,
    //soll der User nach einer Begründung für seine Meinung gefragt werden
    if (entwicklung <= 5) {
      //Aufruf des Begründungs-Alert, wenn die Bewertung kleiner als 5 Punkte ist.
      //Übergabe der Schlagworte Entwicklung und negativ.
      this.begruendungAlert("entwicklung", "negativ");
    } else if (entwicklung >= 95) {
      //Aufruf des Begründungs-Alert, wenn die Bewertung größer als 955 Punkte ist.
      //Übergabe der Schlagworte Entwicklung und positiv.
      this.begruendungAlert("entwicklung", "positiv");
    }
	// Durch this.navParams.get('szenarioId') wird der Pfad an die Update() Funktion in 
	// rating.ts übergeben, sodass immer nur die Ratingdaten zum aktuell vorliegenden Szenario
	// aktualisiert werden
    this.ratingProvider.updateEntwicklungDetail(entwicklung, this.navParams.get('szenarioId'));
  }

   //Siehe Erklärung zu updateEntwicklungDetail()
  updateRealitaetsnaeheDetail(realitaetsnaehe: number) {
    if (realitaetsnaehe <= 5) {
      this.begruendungAlert("realitaetsnaehe", "fern");
    } else if (realitaetsnaehe >= 95) {
      this.begruendungAlert("realitaetsnaehe", "nah");
    }

    this.ratingProvider.updateRealitaetsnaeheDetail(realitaetsnaehe, this.navParams.get('szenarioId'));
  }
   //Siehe Erklärung zu updateEntwicklungDetail()  
  updateRelevanzDetail(relevanz: number) {
    if (relevanz <= 5) {
      this.begruendungAlert("relevanz", "ir");
    } else if (relevanz >= 95) {
      this.begruendungAlert("relevanz", "");
    }

    this.ratingProvider.updateRelevanzDetail(relevanz, this.navParams.get('szenarioId'));
  }
   //Siehe Erklärung zu updateEntwicklungDetail()  
  updateAusfuehrlichkeitDetail(ausfuehrlichkeit: number) {
    if (ausfuehrlichkeit <= 5) {
      this.begruendungAlert("ausfuehrlichkeit", "oberflächlich");
    } else if (ausfuehrlichkeit >= 95) {
      this.begruendungAlert("ausfuehrlichkeit", "ausführlich");
    }

    this.ratingProvider.updateAusfuehrlichkeitDetail(ausfuehrlichkeit, this.navParams.get('szenarioId'));
  }
   //Siehe Erklärung zu updateEntwicklungDetail()  
  updateZusammenhaengeDetail(zusammenhaenge: number) {
    if (zusammenhaenge <= 5) {
      this.begruendungAlert("zusammenhaenge", "zusammenhangslos");
    } else if (zusammenhaenge >= 95) {
      this.begruendungAlert("zusammenhaenge", "zusammenhängend");
    }

    this.ratingProvider.updateZusammenhaengeDetail(zusammenhaenge, this.navParams.get('szenarioId'));
  }
   //Siehe Erklärung zu updateEntwicklungDetail()  
  updateWiederspruecheDetail(wiedersprueche: number) {
    if (wiedersprueche <= 5) {
      this.begruendungAlert("wiedersprueche", "wiedersprüchlich");
    } else if (wiedersprueche >= 95) {
      this.begruendungAlert("wiedersprueche", "stimmig");
    }
  
    this.ratingProvider.updateWiederspruecheDetail(wiedersprueche, this.navParams.get('szenarioId'));
  }
    //Siehe Erklärung zu updateEntwicklungDetail() 
  updateFaktenlageDetail(faktenlage: number) {
    if (faktenlage <= 5) {
      this.begruendungAlert("faktenlage", "irritierend");
    } else if (faktenlage >= 95) {
      this.begruendungAlert("faktenlage", "ansprechend");
    }

    this.ratingProvider.updateFaktenlageDetail(faktenlage, this.navParams.get('szenarioId'));
  }
  
  //Funktion um verschiedene Buttons anzuzeigen
  showButton() {
    //Aufruf der checkPath() Funktion und übergabe der aktuellen Navigationsparameter und des Pfades
	  //Funktion dient dazu, abhängig vom Datenstand in "/commentData" festzulegen, welche
    //Buttons angezeigt werden sollen. (Siehe auch ratingdetail.html für Erklärung)
    this.commentProvider.checkPath(this.navParams.get('szenarioId'), "kombiniertekommentare")
    .then((result: boolean) => {
      if(result == true){
        this.showButtons = true;
      } else {
        this.showButtons = false;
      }
    });
  }
  
  //Funktion, die Alerts abhängig von dem jeweiligen Rating mit verschiedenen Texten ausgibt.
  //Erhählt als Argumente jeweils das Rating und die dazugehörige Ausprägung.
  begruendungAlert(rating: string, auspraegung:string ){
  //Festlegung der Subtitel
  if(rating == "entwicklung") {
    this.subTitleText = "Warum finden Sie die Entwicklung dieses Szenarios so " + auspraegung + "?";
  } else if (rating == "realitaetsnaehe") {
    this.subTitleText = "Warum finden Sie dieses Szenario so realitäts" + auspraegung + "?";
  } else if (rating == "relevanz") {
    this.subTitleText = "Warum finden Sie dieses Szenario so " + auspraegung + "relevant?";
  } else if (rating == "ausfuehrlichkeit") {
    this.subTitleText = "Warum denken Sie, dass dieses Szenario sehr " + auspraegung + " ist?";
  } else if (rating == "zusammenhaenge") {
    this.subTitleText = "Warum denken Sie, dass dieses Szenario sehr " + auspraegung + " ist?";
  } else if (rating == "wiedersprueche") {
    this.subTitleText = "Aus welchem Grund finden Sie dieses Szenario so " + auspraegung + "?";
  } else if (rating == "faktenlage") {
    this.subTitleText = "Welche Fakten fanden Sie besonders " + auspraegung + "?";
  }
    //Aufruf eines Alarms.	
    let alert = this.alertCtrl.create({
	    //Festlegung des Titels und des Untertitels. Abhängig vom input
      title: 'Extreme Bewertung',
	    subTitle: this.subTitleText,
      enableBackdropDismiss: false,
	  //Es soll Inputfeld vorhanden sein.
	  inputs: [
        {
          name: "begruendung",
          placeholder: 'Hier Antwort eingeben'
        }
      ],
	    //Es soll ein Abbrechen-Button im Alert entahlten sein.
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
		      //Handler für den Abbrechen-Button (Keine Funktion)
          handler: data => {
           // this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), rating, data)
          }
        },
        {
		      //Es soll ein Speichern-Button im Alert entahlten sein.
          text: 'Speichern',
		      //Handler für den Speichern-Button
          handler: data => {
            this.commentProvider.updateKommentar(this.navParams.get('szenarioId'), rating, data.begruendung)
          }
        }
      ]
    });
    //Anzeige des Alerts
    alert.present();
  }
  
  //Funktion zur Berechnung des Durchschinitts und zur weitergabe dieses Wertes an die
  //updateAverage() in ratingProvider
  updateAverage() {
    //Aufruf der getRatingValues() Funktion in ratingProvider
    this.ratingProvider.getRatingValues(this.navParams.get('szenarioId')).then( ratingListSnap => {
      //Beschreiben der lokalen Arrays mit den einzelnen erhaltenen Bewertungen
      this.ratingList = ratingListSnap;
	  //Arrow-Funktion um Funktion zu gewährleisten
    }).then( ratingList => {
	    //Iteration durch die einzelnen erhaltenen Bewertungen
	    for (let rating of this.ratingList){
		    //Auslesen der einzelnen Werte einer erhaltenen Bewertung
		    this.v1 = rating.realitaetsnaehe;
		    this.v2 = rating.relevanz;
		    this.v3 = rating.ausfuehrlichkeit;
		    this.v4 = rating.zusammenhaenge;
		    this.v5 = rating.wiedersprueche;
		    this.v6 = rating.faktenlage;
		
		    //Addition aller Werte
		    this.sum = (this.sum + this.v1 + this.v2 + this.v3 + this.v4 + this.v5 + this.v6);
		    //Zähler für die spätere Mittelwertsbildung
		    this.i = this.i+1;
	    }
	    //Bilden des Mittelwerts und Rundung auf ganze Zahlen
	    this.average = Math.floor((this.sum/(600*this.i))*100);
	    //Aufruf der updateAverage() Funktion im ratingProvider
	    this.ratingProvider.updateAverage(this.average, this.navParams.get('szenarioId'));
	  });
	
  }

  //Funktion für die Navigation zur Ratingdetailseite
  goToCommentDetail(szenarioId){
  //Übergabe des Navigationsparameters an diese Seite.
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.
    this.navCtrl.push('commentdetail', { 'szenarioId': szenarioId });
  }

  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(){ 
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet wurde.		
    this.navCtrl.pop();

  }

  goToRootPage(){
    this.navCtrl.popToRoot()
  }

}
