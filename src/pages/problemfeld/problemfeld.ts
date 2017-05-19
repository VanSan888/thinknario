import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-problemfeld',
  templateUrl: 'problemfeld.html'
})
export class ProblemfeldPage {
	
problemdefinitionPage = 'ProblemdefinitionPage';

public szenarioData: any;
public problemfeld1: boolean;
public problemfeld2: boolean;
public problemfeld3: boolean;
public problemfeld4: boolean;

  constructor(public navCtrl: NavController, public szenarioProvider: SzenarioProvider) {

  }


  ionViewDidEnter() {
	

/*	firebase.database().ref("/szenarioData").child(firebase.auth().currentUser.uid)
	.on("value", function(dataSnapshot) { */
	
	if(this.szenarioProvider.checkPath()) {
	 
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.problemfeld1 = this.szenarioData.problemfeld1;
	  this.problemfeld2 = this.szenarioData.problemfeld2;
      this.problemfeld3 = this.szenarioData.problemfeld3;
      this.problemfeld4 = this.szenarioData.problemfeld4;
	  });
    }
  }
  

  
  updateProblemfeld1(problemfeld1) {
	  this.szenarioProvider.updateProblemfeld1(problemfeld1);
  }
  updateProblemfeld2(problemfeld2) {
	  this.szenarioProvider.updateProblemfeld2(problemfeld2);
  }
  updateProblemfeld3(problemfeld3) {
	  this.szenarioProvider.updateProblemfeld3(problemfeld3);
  }
  updateProblemfeld4(problemfeld4) {
	  this.szenarioProvider.updateProblemfeld4(problemfeld4);
  }
  
}
