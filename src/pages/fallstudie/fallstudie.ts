import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-fallstudie',
  templateUrl: 'fallstudie.html'
})
export class FallstudiePage {
	
  //Notwendig für Navigation
  meinSzenarioPage = 'MeinSzenarioPage'

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public szenarioProvider: SzenarioProvider,) {}

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
