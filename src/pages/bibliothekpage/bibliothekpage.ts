import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';


@IonicPage({
	name:'bibliothekpage'
})
@Component({
  selector: 'page-bibliothek',
  templateUrl: 'bibliothekpage.html',
})
export class BibliothekPage {
	
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
