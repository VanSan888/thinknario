import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-ereignisse',
  templateUrl: 'ereignisse.html'
})
export class EreignissePage {
	
//Notwendig für Navigation
szenarioerstellungPage = 'SzenarioerstellungPage';

public szenarioData: any;
public ereignis1 : string = "";
public ereignis2 : string = "";
public ereignis3 : string = "";
public ereignis4 : string = "";

  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }
  
  ionViewDidEnter() {
	
    let ereignissepath = "ereignisse";
    this.szenarioProvider.checkPath(ereignissepath).then((result: boolean) => {
     if(result === true) {   	
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.ereignis1 = this.szenarioData.ereignisse.ereignis1;
        this.ereignis2 = this.szenarioData.ereignisse.ereignis2;
	    this.ereignis3 = this.szenarioData.ereignisse.ereignis3;
        this.ereignis4 = this.szenarioData.ereignisse.ereignis4;
	  });	
     }
    });
  }	

  updateEreignis1(ereignis1) {
	  this.szenarioProvider.updateEreignis1(ereignis1);
  }
  updateEreignis2(ereignis2) {
	  this.szenarioProvider.updateEreignis2(ereignis2);
  }
  updateEreignis3(ereignis3) {
	  this.szenarioProvider.updateEreignis3(ereignis3);
  }
  updateEreignis4(ereignis4) {
	  this.szenarioProvider.updateEreignis4(ereignis4);
  }  

}
