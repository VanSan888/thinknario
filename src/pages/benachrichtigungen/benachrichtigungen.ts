import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';



@IonicPage()
@Component({
  selector: 'page-benachrichtigungen',
  templateUrl: 'benachrichtigungen.html'
})
export class BenachrichtigungenPage {
  
  //Notwendig. um den richtigen Disqus-thread anzeigen zu lassen
  public pageId: string;
  public url: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public szenarioProvider: SzenarioProvider) {
  }
   

  ionViewDidLoad(){
    //Festelgen der pageId für Disqus. Die pageId soll der UserID entsprechen.
    //Durch die getUserID() Funktion des Szenarioproviders wird deswegen der aktuele User abgerufen
    this.szenarioProvider.getUserID().then( UID => {
      this.pageId = UID;
    }).then(pageId => {
      //Danach wird die URL definiert. Behilfsweise wird www.test.de verwendet.
      //Wenn die WebSite online ist, muss hier die richtige URL eingesetzt werden.
      this.url = "http://www.test.de/" + this.pageId + "/";
    });
}

}
