import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';



@IonicPage()
@Component({
  selector: 'page-szenarioerstellung',
  templateUrl: 'szenarioerstellung.html'
})
export class SzenarioerstellungPage {
	
szenariobewertungPage = 'SzenariobewertungPage';

public szenarioData: any;
public annahme1 : string = "";
public annahme2 : string = "";
public annahme3 : string = "";
public annahme4 : string = "";
public randbedingung1 : string = "";
public randbedingung2 : string = "";
public randbedingung3 : string = "";
public randbedingung4 : string = "";
public ereignis1 : string = "";
public ereignis2 : string = "";
public ereignis3 : string = "";
public ereignis4 : string = "";
public szenarioText : string = "";

  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }

  ionViewDidEnter() {
	   
    let szenariotextpath = "szenariotext";
    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.annahme1 = this.szenarioData.annahmen.annahme1;
      this.annahme2 = this.szenarioData.annahmen.annahme2;
	  this.annahme3 = this.szenarioData.annahmen.annahme3;
      this.annahme4 = this.szenarioData.annahmen.annahme4;
	  this.randbedingung1 = this.szenarioData.randbedingungen.randbedingung1;
      this.randbedingung2 = this.szenarioData.randbedingungen.randbedingung2;
	  this.randbedingung3 = this.szenarioData.randbedingungen.randbedingung3;
      this.randbedingung4 = this.szenarioData.randbedingungen.randbedingung4;
	  this.ereignis1 = this.szenarioData.ereignisse.ereignis1;
      this.ereignis2 = this.szenarioData.ereignisse.ereignis2;
	  this.ereignis3 = this.szenarioData.ereignisse.ereignis3;
      this.ereignis4 = this.szenarioData.ereignisse.ereignis4;
     this.szenarioProvider.checkPath(szenariotextpath).then((result: boolean) => {
      if(result === true) {
	    this.szenarioText = this.szenarioData.szenariotext;
      }
	 });
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

  updateSzenariotext(szenarioText) {
	  this.szenarioProvider.updateSzenariotext(szenarioText);
  }
  
}
