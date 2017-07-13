import { IonicPage, NavController, Loading,  LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { RatingProvider } from '../../providers/rating/rating';


@IonicPage()
@Component({
  selector: 'page-meinSzenario',
  templateUrl: 'meinSzenario.html'
})
export class MeinSzenarioPage {

//Notwendig um den Ladezustand anzuzeigen
public loading: Loading;

//Notwendig für Navigation	
problemfeldPage         = 'ProblemfeldPage';
problemdefinitionPage   = 'ProblemdefinitionPage';
deskriptorenanalysePage = 'DeskriptorenanalysePage';
schluesselfaktorenPage  = 'SchluesselfaktorenPage';
annahmenPage            = 'AnnahmenPage';
randbedingungenPage     = 'RandbedingungenPage';
ereignissePage          = 'EreignissePage';
szenarioerstellungPage  = 'SzenarioerstellungPage';
szenariobewertungPage   = 'SzenariobewertungPage';

//Properties für die Datentransferierung von und zu firebase
//Notwendig für die variable Anzeige der fertiggestellten Prozesschritte
public szenarioData: any;
public toggleVar: boolean = true;
public showstartbutton: boolean = true;
public showproblemdefinition: boolean = false;
public showdeskriptorenanalyse: boolean = false;
public showschluesselfaktoren: boolean = false;
public showannahmen: boolean = false;
public showrandbedingungen: boolean = false;
public showereignisse: boolean = false;
public showszenarioerstellung: boolean = false;
public showszenariobewertung: boolean = false;
public showsbewertungfertig: boolean = false;

  constructor(public navCtrl: NavController,
              public szenarioProvider: SzenarioProvider,
              public ratingProvider: RatingProvider,
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
	  /*	Aufruf des SzanrioProviders und dessen checkPath() Funktion, Angabe des Pfades (problemfeld).
	  Durch die .then(result) Funktion wird der tatsächliche Wert
	  des Promise ausgelesen. Die Arrow-Funktion wird benötigt, um den .then()-Kontext nicht
	  durcheinander zu bringen.	*/
    this.szenarioProvider.checkPath("problemdefinition").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showstartbutton = false;
	    }
    });
    this.szenarioProvider.checkPath("problemdefinition").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showproblemdefinition = true;
	    }
    });
    this.szenarioProvider.checkPath("schluesselfaktoren").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showschluesselfaktoren = true;
	    }
    });
    this.szenarioProvider.checkPath("deskriptorenanalyse").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showdeskriptorenanalyse = true;
	    }
    });
    this.szenarioProvider.checkPath("annahmen").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showannahmen = true;
	    }
    });
    this.szenarioProvider.checkPath("randbedingungen").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showrandbedingungen = true;
	    }
    });
    this.szenarioProvider.checkPath("ereignisse").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showereignisse = true;
	    }
    });
    this.szenarioProvider.checkPath("szenariotext").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showszenarioerstellung = true;
	    }
    });
    this.ratingProvider.checkPath().then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showszenariobewertung = true;
	    }
    });
    this.szenarioProvider.checkPath("average").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {
        //Setze die Variable auf true, um die entsprechenden HTML-Elemente anzuzeigen
        this.showsbewertungfertig = true;
	    }
    });

    if(this.showstartbutton == true){
      this.toggleVar = false;
    }
    //Wenn alle Inhalte geladen sind, soll der Loader ausgeblendet werden.
    this.loading.dismiss();
  }
    
}
