import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-randbedingungen',
  templateUrl: 'randbedingungen.html'
})
export class RandbedingungenPage {
	
ereignissePage = 'EreignissePage';


  constructor(public navCtrl: NavController) {

  }

}
