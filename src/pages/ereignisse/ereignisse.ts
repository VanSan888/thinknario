import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ereignisse',
  templateUrl: 'ereignisse.html'
})
export class EreignissePage {
	
szenarioerstellungPage = SzenarioerstellungPage;


  constructor(public navCtrl: NavController) {

  }

}
