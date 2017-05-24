import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Notwendig für Navigation
bewertungenPage = 'BewertungenPage';
meinSzenarioPage = 'MeinSzenarioPage';
bibliothekPage = 'bibliothekpage';
public szenarioList: Array<any>;

  constructor(public navCtrl: NavController, public bibliothekProvider: BibliothekProvider) {
  }

  ionViewDidEnter() {
    this.bibliothekProvider.getSzenarioList().then( szenarioListSnap => {
      this.szenarioList = szenarioListSnap;
    });
  }
  
  goToSzenarioDetail(szenarioId){
    this.navCtrl.push('szenariodetail', { 'szenarioId': szenarioId });
  }


}
