import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-szenarioerstellung',
  templateUrl: 'szenarioerstellung.html'
})
export class SzenarioerstellungPage {
	
szenariobewertungPage = 'SzenariobewertungPage';

  constructor(public navCtrl: NavController) {

  }

}
