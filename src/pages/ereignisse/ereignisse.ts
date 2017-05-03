import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SzenarioerstellungPage } from '../szenarioerstellung/szenarioerstellung';


@Component({
  selector: 'page-ereignisse',
  templateUrl: 'ereignisse.html'
})
export class EreignissePage {
	
szenarioerstellungPage = SzenarioerstellungPage;


  constructor(public navCtrl: NavController) {

  }

}
