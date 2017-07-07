import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import { CommentProvider } from '../../providers/comment/comment';

@IonicPage({
  name: 'commentdetail',
	//Hier wird eine Instanz dieser Seite mittels der SzenarioID aufgerufen
	//SzenarioID wird in ratingdetail.ts an diese Seite übergeben
  segment: 'ratingdetail/:szenarioID'
})  
@Component({
  selector: 'page-commentdetail',
  templateUrl: 'commentdetail.html',
})
export class CommentdetailPage {

  //Notwendig für Navigation
  homePage = 'HomePage';

  //Variablen zur Festelegung des korrekten Disqus-Threads
  public pageId: string;
  public url: string;

  //Variablen zum Lesen der Kommentare aus firebase und zum Zusammenfassen als ein Kommentar
  public entwicklung: string;
  public ausfuehrlichkeit: string;
  public faktenlage: string;
  public realitaetsnaehe: string;
  public relevanz: string;
  public wiedersprueche: string;
  public zusammenhaenge: string;
  public kombinierteKommentare: string;

  //Variable wird benötigt, um in ratingdetail.html den aktuellen Username anzuzeigen
  public currentSzenario: any;
  //Variable zum lesen der Daten aus Firebase
  public commentData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public bibliothekProvider: BibliothekProvider,
              public commentProvider: CommentProvider,) {
  }

  ionViewDidLoad() {
    //Festelgen der pageId für Disqus. Die pageId soll der UserID des aufgerufenen Szenarios entsprechen.
    //Durch navParams.get() wird deswegen die ID des Users abgerufen, dessen Szenario aufgerufen wurde
    this.pageId = this.navParams.get('szenarioId');
    //Danach wird die URL definiert. Behilfsweise wird www.test.de verwendet.
    //Wenn die WebSite online ist, muss hier die richtige URL eingesetzt werden.
    this.url = "http://www.test.de/" + this.pageId + "/";
  }

  ionViewDidEnter(){
    //Aufruf der getSzenarioDetail() Funktion und übergabe der aktuellen Navigationsparameter.
  	//Funktion dient hier nur dazu, den aktuellen User abzufragen und in ratingdetail.html anzuzeigen
    this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
    .then( szenarioSnap => {
	  //Beschreiben der Variablen mit den Daten des Snapshots aus firebase
      this.currentSzenario = szenarioSnap;
    });

    this.commentProvider.checkPath(this.navParams.get('szenarioId'), "kombiniertekommentare")
    .then((result: boolean) => {
      if(result === true) {
        this.commentProvider.getCommentData(this.navParams.get('szenarioId')).then( commentSnap => {
        this.commentData      = commentSnap;
        this.entwicklung      = this.commentData.entwicklung.Begründung
        this.ausfuehrlichkeit = this.commentData.ausfuehrlichkeit.Begründung
        this.faktenlage       = this.commentData.faktenlage.Begründung
        this.realitaetsnaehe  = this.commentData.realitaetsnaehe.Begründung
        this.relevanz         = this.commentData.relevanz.Begründung
        this.wiedersprueche   = this.commentData.wiedersprueche.Begründung
        this.zusammenhaenge   = this.commentData.zusammenhaenge.Begründung

        this.kombinierteKommentare = this.entwicklung + "  \n" + this.ausfuehrlichkeit + "  \n" +
                                     this.faktenlage  + "  \n" + this.realitaetsnaehe  + "  \n" +
                                     this.relevanz    + "  \n" + this.wiedersprueche   + "  \n" +
                                     this.zusammenhaenge;

        });
      } else {
          this.commentProvider.updateKombinierteKommentare(this.navParams.get('szenarioId'), "");
      }
    });

  }

  updateKombinierteKommentare(kombinierteKommentare){
    this.commentProvider.updateKombinierteKommentare(this.navParams.get('szenarioId'), kombinierteKommentare);
  }

  //Funktion für die Navigation zur Szenariodetailseite
  goToSzenarioDetail(szenarioId){ 

	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet wurde.		
    this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });

  }

}
