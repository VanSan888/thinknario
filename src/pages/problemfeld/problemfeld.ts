import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProblemdefinitionPage } from '../problemdefinition/problemdefinition';


@IonicPage()
@Component({
  selector: 'page-problemfeld',
  templateUrl: 'problemfeld.html'
})
export class ProblemfeldPage {
problemdefinitionPage = ProblemdefinitionPage;

  constructor(public navCtrl: NavController) {

  }

}
