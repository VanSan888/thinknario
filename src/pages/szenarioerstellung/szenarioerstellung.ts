import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SzenariobewertungPage } from '../szenariobewertung/szenariobewertung';

@IonicPage()
@Component({
  selector: 'page-szenarioerstellung',
  templateUrl: 'szenarioerstellung.html'
})
export class SzenarioerstellungPage {
	
szenariobewertungPage = SzenariobewertungPage;

  constructor(public navCtrl: NavController) {

  }

}
