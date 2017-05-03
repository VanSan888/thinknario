import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RandbedingungenPage } from '../randbedingungen/randbedingungen';

@Component({
  selector: 'page-annahmen',
  templateUrl: 'annahmen.html'
})
export class AnnahmenPage {
	
randbedingungenPage = RandbedingungenPage;

  constructor(public navCtrl: NavController) {

  }

}
