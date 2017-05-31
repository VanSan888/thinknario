import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';



@IonicPage({
	name: 'szenariodetail',
	segment: 'szenariodetail/:szenarioID'
})
@Component({
  selector: 'page-szenariodetail',
  templateUrl: 'szenariodetail.html',
})
export class SzenariodetailPage {

 public currentSzenario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public bibliothekProvider: BibliothekProvider) {}
  
  ionViewDidEnter(){
    this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
    .then( szenarioSnap => {
      this.currentSzenario = szenarioSnap;
    });
  }
  
  goToRatingDetail(szenarioId){
    this.navCtrl.push('ratingdetail', { 'szenarioId': szenarioId });
  }

}
