import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-meinSzenario',
  templateUrl: 'meinSzenario.html'
})
export class MeinSzenarioPage {
problemfeldPage = ProblemfeldPage;
problemdefinitionPage = ProblemdefinitionPage;
deskriptorenanalysePage = DeskriptorenanalysePage;
schluesselfaktorenPage = SchluesselfaktorenPage;
annahmenPage = AnnahmenPage;
randbedingungenPage = RandbedingungenPage;
ereignissePage = EreignissePage;
szenarioerstellungPage = SzenarioerstellungPage;
  constructor(public navCtrl: NavController) {

  
  }
  

  
}
