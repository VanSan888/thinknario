import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SzenarioValidator } from '../../validators/szenarioValidator';
import { RatingProvider } from '../../providers/rating/rating';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-problemfeld',
  templateUrl: 'problemfeld.html'
})
export class ProblemfeldPage {
//Notwendig zur Navigation	
problemdefinitionPage = 'ProblemdefinitionPage';

//Properties für die Formvalidierung
public problemfeldform 	: FormGroup;


//Properties für die Datentransferierung von und zu firebase
public szenarioData: any;
public problemfeld1: boolean;
public problemfeld2: boolean;
public problemfeld3: boolean;
public problemfeld4: boolean;

  constructor(public navCtrl: NavController,
              //Initialisierung des SzenarioProviders
              public szenarioProvider: SzenarioProvider,
              public ratingProvider: RatingProvider,			  
			  //Initialisierung der Formbuilder und Validator Module
              private _FB 	   : FormBuilder,
              private _VAL    : SzenarioValidator)
  {//Erstellung eines FormBuilder-Objectes
     this.problemfeldform 			= _FB.group({
		 //Nested FormGroup zugeordner zu einem key, der "service" heißt
		 //Zuständig für Checkboxen, initial default value false
         'service' 			: _FB.group({
		    problemfeldform1   : [ false ],
		    problemfeldform2   : [ false ],
		    problemfeldform3   : [ false ],
		    problemfeldform4   : [ false ],
			//Abrufen des SzenarioValidators und seiner Methode für "Problemfeld"
		 }, { validator: _VAL.validateCheckboxesProblemfeld })
      });
  }
  

  /*
  Hier soll geprüft werden, ob der Pfad für das Problemfeld in firebase schon existiert.
  Wenn ja sollen die Daten geladen werden, die in diese Pfad hinterlegt sind.
  Wenn nein, soll nichts passieren, denn durch die .update() Funktion in SzenarioProvider
  wird dieser Pfad dann erstellt. Ohne diese Prüfung würde der user aber beim ersten Erstellen
  der Daten eine Fehlermeldung bekommen, das die Daten aus Firebase nicht gelesen werden konnten.
  */
  
  //Lifecyyle event: Wenn Die Seite geladen wurde und die aktive Seite ist.
  ionViewDidEnter() {
	//Deklaration der Variablen, die dazu dient, den zu prüfenden Pfad festzulegen
	let problemfeldpath = "problemfeld";
	/*
	Aufruf des SzanrioProviders und dessen checkPath() Funktion, sowie
	Übergabe der Pfadvariablen. Durch die .then(result) Funktion wird der tatsächliche Wert
	des Promise ausgelesen. Die Arrow-Funktion wird benötigt, um den .then()-Kontext nicht
	durcheinander zu bringen
	*/
    this.szenarioProvider.checkPath(problemfeldpath).then((result: boolean) => {
	 //Wenn in dem Pfad Daten hinterlegt sind, dann...
     if(result === true) {
		/*
		...lese die Daten aus. getSzenarioData() Funktion aus
		dem SzenarioProvider wird aufgerufen. Wieder wird mit .then() und Arrowfunktion gearbeitet.
		Es wird ein Snapshot der hinterlegten Szenariodaten erstellt.
		*/
        this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
		//Hier wird der Snapshot auf die Hilfsvariable geschrieben.
        this.szenarioData = szenarioSnap;
		//Hier werden die einzelnen Variablen mit en einzelnen Daten beschrieben.
        this.problemfeld1 = this.szenarioData.problemfeld.problemfeld1;
	    this.problemfeld2 = this.szenarioData.problemfeld.problemfeld2;
        this.problemfeld3 = this.szenarioData.problemfeld.problemfeld3;
        this.problemfeld4 = this.szenarioData.problemfeld.problemfeld4;
	    });
	  } else {
		//Hier muss der average und die Problemdefinition in die Datenbank geschrieben werden.
		//Grund dafür ist, dass sobald ein neues Szenario in "/szenarioData" geschrieben wird,
		//Es auch auf der Homepage und in der Bibliothek angezeigt werden würde.
		//Die getSzenarioList() Funktion in "bibliothek.ts" schlägt allerdings fehl, wenn
		//keine Daten in "/szenarioData/average" und "/szenarioData/problemdefinition" enthalten sind.
		//Leider kann man die dort auszulesenden properties nicht als optional deklarieren.
		//Genau an dieser Stelle hier wird bei if(){} das erste mal geprüft, ob Daten in 
		//"/szenarioData/aktuellerUser" enthalten sind. Also sollen hier direkt die beiden wichtigen
		//Datensätze zu average und problemdefinition als Dummi festgelegt werden, sodass die getSzenarioList()
		//Funktion nicht fehlschlägt:
		
        //Festlegung der aktuellen UserID
        let uid = firebase.auth().currentUser.uid;
		//Festlegung des Dummiaverages
        let dummiaverage: string = "(Noch keine Bewertung)";
		//Festlegung der Dummiproblemdefinition
        let dummiproblemdefinition: string = "(Hier ihre Problemdefinition)";
		
		this.ratingProvider.updateAverage(dummiaverage, uid);
		this.szenarioProvider.updateProblemdefinition(dummiproblemdefinition);
		
		}
    });
  }

  /*
  Hier werden die Eingaben aus der problemfeld.html Datei an die jeweiligen
  .update() Funktionen im SzenarioProvider weitergegeben.
  */
  updateProblemfeld1(problemfeld1) {
	  this.szenarioProvider.updateProblemfeld1(problemfeld1);
  }
  updateProblemfeld2(problemfeld2) {
	  this.szenarioProvider.updateProblemfeld2(problemfeld2);
  }
  updateProblemfeld3(problemfeld3) {
	  this.szenarioProvider.updateProblemfeld3(problemfeld3);
  }
  updateProblemfeld4(problemfeld4) {
	  this.szenarioProvider.updateProblemfeld4(problemfeld4);
  }
  
  
  
}
