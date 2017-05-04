import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-problemfeld',
  templateUrl: 'problemfeld.html'
})
export class ProblemfeldPage {
problemdefinitionPage = 'ProblemdefinitionPage';

  constructor(public navCtrl: NavController) {

  }

}
