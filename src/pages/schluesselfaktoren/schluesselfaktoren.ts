import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SzenarioValidator } from '../../validators/szenarioValidator';


@IonicPage()
@Component({
  selector: 'page-schluesselfaktoren',
  templateUrl: 'schluesselfaktoren.html'
})
export class SchluesselfaktorenPage {
//Notwendig zur Navigation	
deskriptorenanalysePage = 'DeskriptorenanalysePage';

//Properties für die Formvalidierung
public schluesselfaktorenform 					: FormGroup;

//Properties für die Datentransferierung von und zu firebase
public szenarioData: any;
public schluesselfaktor1: boolean = false;
public schluesselfaktor2: boolean = false;
public schluesselfaktor3: boolean = false;
public schluesselfaktor4: boolean = false;
public schluesselfaktor5: boolean = false;
public schluesselfaktor6: boolean = false;

  constructor(public navCtrl: NavController,
              //Initialisierung des SzenarioProviders
              public szenarioProvider: SzenarioProvider,
			  //Initialisierung der Formbuilder und Validator Module
              private _FB 	   : FormBuilder,
              private _VAL    : SzenarioValidator)
  {//Erstellung eines FormBuilder-Objectes
     this.schluesselfaktorenform 			= _FB.group({
		 //Nested FormGroup zugeordner zu einem key, der "service" heißt
		 //Zuständig für Checkboxen, initial default value false
         'service' 			: _FB.group({
		    schluesselfaktorenform1   : [ false ],
		    schluesselfaktorenform2   : [ false ],
		    schluesselfaktorenform3   : [ false ],
		    schluesselfaktorenform4   : [ false ],
			  schluesselfaktorenform5   : [ false ],
			  schluesselfaktorenform6   : [ false ],
			//Abrufen des SzenarioValidators und seiner Methode für "Problemfeld"
		 }, { validator: _VAL.validateCheckboxesSchluesselfaktoren})
      });
  }
  
  //Code ist sehr ähnlich zu Problemfeld. Siehe Erklärungen dort
  ionViewDidEnter() {
	let schluesselfaktorpath = "schluesselfaktoren";
    this.szenarioProvider.checkPath(schluesselfaktorpath).then((result: boolean) => {
     if(result === true) {
        this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.schluesselfaktor1 = this.szenarioData.schluesselfaktoren.schluesselfaktor1;
	      this.schluesselfaktor2 = this.szenarioData.schluesselfaktoren.schluesselfaktor2;
        this.schluesselfaktor3 = this.szenarioData.schluesselfaktoren.schluesselfaktor3;
        this.schluesselfaktor4 = this.szenarioData.schluesselfaktoren.schluesselfaktor4;
        this.schluesselfaktor5 = this.szenarioData.schluesselfaktoren.schluesselfaktor5;
		    this.schluesselfaktor6 = this.szenarioData.schluesselfaktoren.schluesselfaktor6;
	    });
	  } else {
		  this.szenarioProvider.updateSchluesselfaktor(this.schluesselfaktor1,
                                                   this.schluesselfaktor2,
						                                       this.schluesselfaktor3,
						                                       this.schluesselfaktor4,
						                                       this.schluesselfaktor5,
						                                       this.schluesselfaktor6);
	  }
    });
  }
  
  updateSchluesselfaktor(schluesselfaktor1,
                         schluesselfaktor2,
						             schluesselfaktor3,
						             schluesselfaktor4,
						             schluesselfaktor5,
						             schluesselfaktor6) {
    this.szenarioProvider.updateSchluesselfaktor(schluesselfaktor1,
                                                 schluesselfaktor2,
						                                     schluesselfaktor3,
						                                     schluesselfaktor4,
						                                     schluesselfaktor5,
						                                     schluesselfaktor6);
  }

}
