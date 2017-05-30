import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';




@IonicPage()
@Component({
  selector: 'page-problemdefinition',
  templateUrl: 'problemdefinition.html'
})
export class ProblemdefinitionPage {

//Notwendig für Navigation
schluesselfaktorenPage = 'SchluesselfaktorenPage';

public szenarioData: any;
public problemdefinition : string = "";

  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }

  ionViewDidEnter() {

    let problemdefinitionpath = "problemdefinition";
    this.szenarioProvider.checkPath(problemdefinitionpath).then((result: boolean) => {
     if(result === true) {  
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.problemdefinition = this.szenarioData.problemdefinition;
	  });
	 }
	});
  }
 

  
  updateProblemdefinition(problemdefinition) {
	  this.szenarioProvider.updateProblemdefinition(problemdefinition);
  }
  
}
