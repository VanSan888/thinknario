import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SchluesselfaktorenPage } from '../schluesselfaktoren/schluesselfaktoren';


@Component({
  selector: 'page-problemdefinition',
  templateUrl: 'problemdefinition.html'
})
export class ProblemdefinitionPage {

schluesselfaktorenPage = SchluesselfaktorenPage;

  constructor(public navCtrl: NavController) {

  }

}
