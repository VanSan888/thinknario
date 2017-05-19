import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Notwendig für Navigation
bewertungenPage = 'BewertungenPage';
meinSzenarioPage = 'MeinSzenarioPage';

  constructor(public navCtrl: NavController) {

  }

}
