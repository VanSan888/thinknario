import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-schluesselfaktoren',
  templateUrl: 'schluesselfaktoren.html'
})
export class SchluesselfaktorenPage {

deskriptorenanalysePage = 'DeskriptorenanalysePage';

public szenarioData: any;
public schluesselfaktor1: boolean;
public schluesselfaktor2: boolean;
public schluesselfaktor3: boolean;
public schluesselfaktor4: boolean;
public schluesselfaktor5: boolean;
public schluesselfaktor6: boolean;

  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }
  
  ionViewDidEnter() {
	let schluesselfaktorpath = "schluesselfaktoren";
    this.szenarioProvider.checkPath(schluesselfaktorpath).then((result: boolean) => {
     if(result === true) {
        this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.schluesselfaktor1 = this.szenarioData.schluesselfaktoren.schluesselfaktor1;
	    this.schluesselfaktor2 = this.szenarioData.schluesselfaktoren.schluesselfaktor2;
        this.schluesselfaktor3 = this.szenarioData.schluesselfaktoren.schluesselfaktor3;
        this.schluesselfaktor4 = this.szenarioData.schluesselfaktoren.schluesselfaktor4;
        this.schluesselfaktor5 = this.szenarioData.schluesselfaktoren.schluesselfaktor5;
		this.schluesselfaktor6 = this.szenarioData.schluesselfaktoren.schluesselfaktor6;
	    });
	  } 
    });
  }
  
  updateSchluesselfaktor1(schluesselfaktor1) {
	  this.szenarioProvider.updateSchluesselfaktor1(schluesselfaktor1);
  }
  updateSchluesselfaktor2(schluesselfaktor2) {
	  this.szenarioProvider.updateSchluesselfaktor2(schluesselfaktor2);
  }
  updateSchluesselfaktor3(schluesselfaktor3) {
	  this.szenarioProvider.updateSchluesselfaktor3(schluesselfaktor3);
  }
  updateSchluesselfaktor4(schluesselfaktor4) {
	  this.szenarioProvider.updateSchluesselfaktor4(schluesselfaktor4);
  }
  updateSchluesselfaktor5(schluesselfaktor5) {
	  this.szenarioProvider.updateSchluesselfaktor5(schluesselfaktor5);
  }
  updateSchluesselfaktor6(schluesselfaktor6) {
	  this.szenarioProvider.updateSchluesselfaktor6(schluesselfaktor6);
  }
  

}
