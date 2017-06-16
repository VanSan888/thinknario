import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-deskriptorenanalyse',
  templateUrl: 'deskriptorenanalyse.html'
})
export class DeskriptorenanalysePage {
//Notwendig für Naviigation	
annahmenPage = 'AnnahmenPage'
	
  constructor(public navCtrl: NavController) {

  }


}
