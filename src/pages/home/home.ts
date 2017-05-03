import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BewertungenPage } from '../bewertungen/bewertungen';
import { MeinSzenarioPage } from '../meinSzenario/meinSzenario';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
bewertungenPage = BewertungenPage;
meinSzenarioPage = MeinSzenarioPage;

  constructor(public navCtrl: NavController) {

  }

}
