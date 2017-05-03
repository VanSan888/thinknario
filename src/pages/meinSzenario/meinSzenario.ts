import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProblemfeldPage} from '../problemfeld/problemfeld';
import { ProblemdefinitionPage } from '../problemdefinition/problemdefinition';
import { SchluesselfaktorenPage } from '../schluesselfaktoren/schluesselfaktoren';
import { DeskriptorenanalysePage } from '../deskriptorenanalyse/deskriptorenanalyse';
import { AnnahmenPage } from '../annahmen/annahmen';
import { RandbedingungenPage } from '../randbedingungen/randbedingungen';
import { EreignissePage } from '../ereignisse/ereignisse';
import { SzenarioerstellungPage } from '../szenarioerstellung/szenarioerstellung';




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
