import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-fallstudie',
  templateUrl: 'fallstudie.html'
})
export class FallstudiePage {
	
  //Notwendig für Navigation
  meinSzenarioPage = 'MeinSzenarioPage'

  constructor(public navCtrl: NavController) {

  }

}
