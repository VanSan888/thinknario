import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SzenarioValidator } from '../../validators/szenarioValidator';


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
public problemfeld1: boolean = false;
public problemfeld2: boolean = false;
public problemfeld3: boolean = false;
public problemfeld4: boolean = false;

  constructor(public navCtrl: NavController,
              //Initialisierung des Szenario-Providers
              public szenarioProvider: SzenarioProvider,			  
			        //Initialisierung der Formbuilder und Validator Module
              private _FB 	   : FormBuilder,
              private _VAL     : SzenarioValidator)
  //Erstellung eines FormBuilder-Objectes			  
  {
    this.problemfeldform = _FB.group({
      //Nested FormGroup zugeordner zu einem key, der "service" heißt
	    //Zuständig für Checkboxen, initial default value false
      'service' 		  : _FB.group({
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
	/*
	Aufruf des SzanrioProviders und dessen checkPath() Funktion, Angabe des Pfades (problemfeld).
	Durch die .then(result) Funktion wird der tatsächliche Wert
	des Promise ausgelesen. Die Arrow-Funktion wird benötigt, um den .then()-Kontext nicht
	durcheinander zu bringen
	*/
    this.szenarioProvider.checkPath("problemfeld").then((result: boolean) => {
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
        //Es werden Dummi-Daten in "szenarioData/currentUser/problemfeld" geschrieben,
        //wenn der User diese Seite das erste Mal betritt.
		    this.szenarioProvider.updateProblemfeld(this.problemfeld1,
		                                            this.problemfeld2,
												                        this.problemfeld3,
												                        this.problemfeld4);
		  }
    });
  }

  /*
  Hier werden die Eingaben aus der problemfeld.html Datei an die jeweiligen
  .update() Funktionen im SzenarioProvider weitergegeben.
  */
  updateProblemfeld(problemfeld1, problemfeld2, problemfeld3, problemfeld4) {
	  this.szenarioProvider.updateProblemfeld(problemfeld1, problemfeld2, problemfeld3, problemfeld4);

  }	  
}


