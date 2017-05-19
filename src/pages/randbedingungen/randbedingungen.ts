import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-randbedingungen',
  templateUrl: 'randbedingungen.html'
})
export class RandbedingungenPage {
	
ereignissePage = 'EreignissePage';

public szenarioData: any;
public randbedingung1 : string = "";
public randbedingung2 : string = "";
public randbedingung3 : string = "";
public randbedingung4 : string = "";


  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }
  
ionViewDidEnter() {
	    	
    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.randbedingung1 = this.szenarioData.randbedingungen.randbedingung1;
      this.randbedingung2 = this.szenarioData.randbedingungen.randbedingung2;
	  this.randbedingung3 = this.szenarioData.randbedingungen.randbedingung3;
      this.randbedingung4 = this.szenarioData.randbedingungen.randbedingung4;
	  });	
  }

  updateRandbedingung1(randbedingung1) {
	  this.szenarioProvider.updateRandbedingung1(randbedingung1);
  }
  updateRandbedingung2(randbedingung2) {
	  this.szenarioProvider.updateRandbedingung2(randbedingung2);
  }
  updateRandbedingung3(randbedingung3) {
	  this.szenarioProvider.updateRandbedingung3(randbedingung3);
  }
  updateRandbedingung4(randbedingung4) {
	  this.szenarioProvider.updateRandbedingung4(randbedingung4);
  }  

}
