import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AnnahmenPage } from '../annahmen/annahmen';


@Component({
  selector: 'page-deskriptorenanalyse',
  templateUrl: 'deskriptorenanalyse.html'
})
export class DeskriptorenanalysePage {
	
annahmenPage = AnnahmenPage
	
  constructor(public navCtrl: NavController) {

  }

}
