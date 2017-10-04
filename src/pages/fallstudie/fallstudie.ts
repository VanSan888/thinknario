import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-fallstudie',
  templateUrl: 'fallstudie.html'
})
export class FallstudiePage {
	
  //Notwendig für Navigation
  meinSzenarioPage = 'MeinSzenarioPage'

  //Url-Variablen für die Youtube-Videos
  public safeURL1: SafeResourceUrl;

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public szenarioProvider: SzenarioProvider,
              private _sanitizer: DomSanitizer,) {

      //Festlegen der Youtube-URLs
      let videoURL1 = "https://www.youtube.com/embed/7Kr8xbh0E5Q";
      //mit Hilfe der bypassSecurityTrustResourceUrl() Funktion wird die Sicherheit der
      //Youtube-URLs sichergestellt und auf eine neue Variable geschrieben (3 mal sehr ähnlich)
      this.safeURL1 = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL1);
  }

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
        this.menuCtrl.enable(true, 'menuId'); 
      } else {
          //Menu soll an dieser Stelle nicht angezeigt werden
          this.menuCtrl.enable(false, 'menuId');         
      }
    });
  }

  goToMeinSzenario(){
    this.menuCtrl.enable(true, 'menuId');
    this.navCtrl.push('MeinSzenarioPage');
  }

}
