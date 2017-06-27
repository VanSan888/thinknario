import { Component } from '@angular/core';
import { NavController,IonicPage, AlertController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-annahmen',
  templateUrl: 'annahmen.html'
})
export class AnnahmenPage {
	
//notwendig für Navigation	
randbedingungenPage = 'RandbedingungenPage';

//Notwendig für den Abruf und das Speichern der Eingaben.
public szenarioData: any;
public annahme1 : any = "";
public annahme2 : any = "";
public annahme3 : any = "";
public annahme4 : any = "";
public begruendung1 : any = "";
public begruendung2 : any = "";
public begruendung3 : any = "";
public begruendung4 : any = "";

//Variable, für die Ausgabe des Variablen Anzeigetextes im Alert.
public subTitleText: string;

//Variable, die zum Ein- und Ausblenden der Begründungen verwendet wird.
public toggleVar: boolean= true;


  constructor( public navCtrl: NavController,
               public szenarioProvider: SzenarioProvider,
			   public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
	
	//Siehe Erklärung bei ProblemfeldPage
    this.szenarioProvider.checkPath("annahmen").then((result: boolean) => {
     if(result === true) {	
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.annahme1 = this.szenarioData.annahmen.annahme1.annahme;
        this.annahme2 = this.szenarioData.annahmen.annahme2.annahme;
	    this.annahme3 = this.szenarioData.annahmen.annahme3.annahme;
        this.annahme4 = this.szenarioData.annahmen.annahme4.annahme;
        this.begruendung1 = this.szenarioData.annahmen.annahme1.begruendung;
        this.begruendung2 = this.szenarioData.annahmen.annahme2.begruendung;
	    this.begruendung3 = this.szenarioData.annahmen.annahme3.begruendung;
        this.begruendung4 = this.szenarioData.annahmen.annahme4.begruendung;		
	  });
     // Wenn keine Daten in dem abgefragten Pfad hinterlegt sind, dann beschreibe den Pfad mit Dummidaten	 
     } else {
	     this.szenarioProvider.updateAnnahme("annahme1", "", "");
	     this.szenarioProvider.updateAnnahme("annahme2", "", "");
	     this.szenarioProvider.updateAnnahme("annahme3", "", "");
	     this.szenarioProvider.updateAnnahme("annahme4", "", "");
	 }
	});
  }

  /*
  Hier werden die Eingaben aus der problemfeld.html Datei an die jeweiligen
  .update() Funktionen im SzenarioProvider weitergegeben.
  */
  updateAnnahme(path, annahme, begruendung) {
	  //Wenn der zu beschreibende Pfad der ersten Annahme entspricht, soll eine ausführlichere Beschreibung
	  //für den User erfolgen, als bei den folgenden Annahmen.
    if(path == "annahme1") {
	  this.subTitleText = 'Eine Begründung, warum Sie genau diese Annahme getroffen haben, hilft Ihnen bei der Erstellung Ihres Szenarios. Warum haben Sie genau diese Annahmen getroffen?';
    } else {
      this.subTitleText = 'Warum haben Sie genau diese Annahme getroffen?';
    }
    
	//Wenn das Eingabefeld der Begründung leer ist, soll ein Alert erscheinen, der dem User
	//den Zweck von Begründungen erklärt.
    if (begruendung == "") {
	
    //Aufruf eines Alarms.	
    let alert = this.alertCtrl.create({
	  //Festlegung des Titels und des Untertitels.
      title: 'Begründung',
	  subTitle: this.subTitleText,
	  //Es soll Inputfeld vorhanden sein.
	  inputs: [
        {
          name: "begruendung",
          placeholder: 'Hier Begründung eingeben'
        }
      ],
	  //Es soll ein Abbrechen-Button im Alert entahlten sein.
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
		  //Handler für den Abbrechen-Button
          handler: data => {
			//Wenn der Abbrechen Knopf gedrückt wird, muss trotzdem die Eingabe für die Annahme gespeichert werden.
			//Dazu werden der Pfad, die Annahme und deren Begründung an die updateAnnahme() Funktion des
			//Szenarioproviders übergeben.
            this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung);
          }
        },
        {
		  //Es soll ein Speichern-Button im Alert entahlten sein.
          text: 'Speichern',
		  //Handler für den Speichern-Button
          handler: data => {
			//Wenn der Speichern-Button gedrückt wird, werden der Pfad, die Annahme und deren
			//Begründung an die updateAnnahme() Funktion des Szenarioproviders übergeben.
            this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung).then( data => {
			  //Danach werden die neuen Daten der Eingabe aus der Datenbank gelesen und auf die lokalen
			  //Variablen geschrieben. Dieser Schritt ist notwendig, um nach der Eingabe im Alert in Echtzeit
			  //die neue Begründung zu sehen.
              this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
                this.szenarioData = szenarioSnap;  
                this.begruendung1 = this.szenarioData.annahmen.annahme1.begruendung;
                this.begruendung2 = this.szenarioData.annahmen.annahme2.begruendung;
	            this.begruendung3 = this.szenarioData.annahmen.annahme3.begruendung;
                this.begruendung4 = this.szenarioData.annahmen.annahme4.begruendung;		
	          }); 			  
		    });
          }
        }
      ]
    });
    //Anzeige des Alerts
    alert.present();
	//Wenn das Eingabefeld der Begründung nicht leer ist, wird kein Alert aufgerufen.
	//In diesem Fall werden der Pfad, die Annahme und deren Begründung an die updateAnnahme() Funktion des
    //Szenarioproviders übergeben.
    } else {
      this.szenarioProvider.updateAnnahme(path, annahme, begruendung);		       	  
      }  
  } 

}
