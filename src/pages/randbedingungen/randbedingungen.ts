import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EreignissePage } from '../ereignisse/ereignisse';


@Component({
  selector: 'page-randbedingungen',
  templateUrl: 'randbedingungen.html'
})
export class RandbedingungenPage {
	
ereignissePage = EreignissePage;


  constructor(public navCtrl: NavController) {

  }

}
