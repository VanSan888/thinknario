import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeskriptorenanalysePage } from '../deskriptorenanalyse/deskriptorenanalyse';


@Component({
  selector: 'page-schluesselfaktoren',
  templateUrl: 'schluesselfaktoren.html'
})
export class SchluesselfaktorenPage {
	
deskriptorenanalysePage = DeskriptorenanalysePage;

  constructor(public navCtrl: NavController) {

  }

}
