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
