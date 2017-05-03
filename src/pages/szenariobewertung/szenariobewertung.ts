import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SzenarioerstellungPage } from '../szenarioerstellung/szenarioerstellung';

@Component({
  selector: 'page-szenariobewertung',
  templateUrl: 'szenariobewertung.html'
})
export class SzenariobewertungPage {
	
szenarioerstellungPage = SzenarioerstellungPage;


  constructor(public navCtrl: NavController) {

  }

}
