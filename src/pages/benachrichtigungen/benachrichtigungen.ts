import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { RatingProvider } from '../../providers/rating/rating';



@IonicPage()
@Component({
  selector: 'page-benachrichtigungen',
  templateUrl: 'benachrichtigungen.html'
})
export class BenachrichtigungenPage {

  //Notwendig. um den richtigen Disqus-thread anzeigen zu lassen
  public pageId: string;
  public url: string;

  //Variable, auf die die einzelnen Berwertungen geschrieben werden
  public ratingList: Array<any>;
  //Variablen zur Berechnung des Durchschnittswertes
  public v0: number = 0;
  public v1: number = 0;
  public v2: number = 0;
  public v3: number = 0;
  public v4: number = 0;
  public v5: number = 0;
  public v6: number = 0;
  public averageV0: number=0;
  public averageV1: number=0;
  public averageV2: number=0;
  public averageV3: number=0;
  public averageV4: number=0;
  public averageV5: number=0;
  public averageV6: number=0;
  public i: number=0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public szenarioProvider: SzenarioProvider,
              public ratingProvider: RatingProvider,) {
  }
   

  ionViewDidLoad(){
    //Festelgen der pageId für Disqus. Die pageId soll der UserID entsprechen.
    //Durch die getUserID() Funktion des Szenarioproviders wird deswegen der aktuele User abgerufen
    this.szenarioProvider.getUserID().then( UID => {
      this.pageId = UID;
    }).then( pageId => {
      //Danach wird die URL definiert. Behilfsweise wird www.test.de verwendet.
      //Wenn die WebSite online ist, muss hier die richtige URL eingesetzt werden.
      /*this.url = "http://www.test.de/" + this.pageId + "/";*/
    }).then( pageId => {

    //Aufruf der getRatingValues() Funktion in ratingProvider, um alle erhaltenen Bewertungen
    //für das eigene Szenario auszulesen
    this.ratingProvider.getRatingValues(this.pageId).then( ratingListSnap => {
      //Beschreiben der lokalen Arrays mit den einzelnen erhaltenen Bewertungen
      this.ratingList = ratingListSnap;
	  //Arrow-Funktion um Funktion zu gewährleisten
    }).then( ratingList => {
	      //Iteration durch die einzelnen erhaltenen Bewertungen
	      for (let rating of this.ratingList){
          //Auslesen der einzelnen Werte einer erhaltenen Bewertung und Aufsummierung
          this.v0 = rating.entwicklung      + this.v0;
		      this.v1 = rating.realitaetsnaehe  + this.v1;
		      this.v2 = rating.relevanz         + this.v2;
		      this.v3 = rating.ausfuehrlichkeit + this.v3;
		      this.v4 = rating.zusammenhaenge   + this.v4;
		      this.v5 = rating.wiedersprueche   + this.v5;
		      this.v6 = rating.faktenlage       + this.v6;
		
		      //Zähler für die spätere Mittelwertsbildung
		      this.i = this.i+1;
	      }
	      //Bilden der Mittelwerte der einzelnen Variablen und Rundung auf ganze Zahlen
        this.averageV0 = Math.floor(this.v0/this.i);
        this.averageV1 = Math.floor(this.v1/this.i);
        this.averageV2 = Math.floor(this.v2/this.i);
        this.averageV3 = Math.floor(this.v3/this.i);
        this.averageV4 = Math.floor(this.v4/this.i);
        this.averageV5 = Math.floor(this.v5/this.i);
        this.averageV6 = Math.floor(this.v6/this.i);  
      });
    });
  }





}
