import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-annahmen',
  templateUrl: 'annahmen.html'
})
export class AnnahmenPage {
	
//notwendig für Navigation	
randbedingungenPage = 'RandbedingungenPage';

public szenarioData: any;
public annahme1 : string = "";
public annahme2 : string = "";
public annahme3 : string = "";
public annahme4 : string = "";


  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }
  
  ionViewDidEnter() {
	    	
    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.annahme1 = this.szenarioData.annahmen.annahme1;
      this.annahme2 = this.szenarioData.annahmen.annahme2;
	  this.annahme3 = this.szenarioData.annahmen.annahme3;
      this.annahme4 = this.szenarioData.annahmen.annahme4;
	  });	
  }
 
  updateAnnahme1(annahme1) {
	  this.szenarioProvider.updateAnnahme1(annahme1);
  }
  updateAnnahme2(annahme2) {
	  this.szenarioProvider.updateAnnahme2(annahme2);
  }
  updateAnnahme3(annahme3) {
	  this.szenarioProvider.updateAnnahme3(annahme3);
  }
  updateAnnahme4(annahme4) {
	  this.szenarioProvider.updateAnnahme4(annahme4);
  }
  

}
