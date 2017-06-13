import { Component } from '@angular/core';
import { NavController,IonicPage, AlertController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';

//Für Erklärungen siehe annahmen.ts (sehr ähnlicher Code/gleiche Funktion).

@IonicPage()
@Component({
  selector: 'page-ereignisse',
  templateUrl: 'ereignisse.html'
})
export class EreignissePage {
	
//Notwendig für Navigation
szenarioerstellungPage = 'SzenarioerstellungPage';

public szenarioData: any;
public ereignis1 : string = "";
public ereignis2 : string = "";
public ereignis3 : string = "";
public ereignis4 : string = "";
public begruendung1 : any = "";
public begruendung2 : any = "";
public begruendung3 : any = "";
public begruendung4 : any = "";
public subTitleText: string;
public toggleVar: boolean= true;

  constructor( public navCtrl: NavController,
               public szenarioProvider: SzenarioProvider,
			   public alertCtrl: AlertController) {

  }
  
  ionViewDidEnter() {
	
    this.szenarioProvider.checkPath("ereignisse").then((result: boolean) => {
     if(result === true) {   	
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.ereignis1 = this.szenarioData.ereignisse.ereignis1.ereignis;
        this.ereignis2 = this.szenarioData.ereignisse.ereignis2.ereignis;
	    this.ereignis3 = this.szenarioData.ereignisse.ereignis3.ereignis;
        this.ereignis4 = this.szenarioData.ereignisse.ereignis4.ereignis;
        this.begruendung1 = this.szenarioData.ereignisse.ereignis1.begruendung;
        this.begruendung2 = this.szenarioData.ereignisse.ereignis2.begruendung;
	    this.begruendung3 = this.szenarioData.ereignisse.ereignis3.begruendung;
        this.begruendung4 = this.szenarioData.ereignisse.ereignis4.begruendung;
	  });	
     } else {
	     this.szenarioProvider.updateEreignis("ereignis1", "", "");
	     this.szenarioProvider.updateEreignis("ereignis2", "", "");
	     this.szenarioProvider.updateEreignis("ereignis3", "", "");
	     this.szenarioProvider.updateEreignis("ereignis4", "", "");
	  }
    });
  }	

  updateEreignis(path, ereignis, begruendung) {
	  
    if(path == "ereignis1") {
	  this.subTitleText = 'Eine Begründung, warum Ihenen genau dieses Ereignis in den Kopf gekommen ist, hilft Ihnen bei der Erstellung Ihres Szenarios. Warum ist ihnen dieses Ereignis in den Kopf gekommen?';
    } else {
      this.subTitleText = 'Warum ist ihnen dieses Ereignis in den Kopf gekommen?';
    }
  
    if (begruendung == "") {
	  
    let alert = this.alertCtrl.create({
      title: 'Begründung',
	  subTitle: this.subTitleText,
	  inputs: [
        {
          name: "begruendung",
          placeholder: 'Hier Begründung eingeben'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            this.szenarioProvider.updateEreignis(path, ereignis, data.begruendung);
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.szenarioProvider.updateEreignis(path, ereignis, data.begruendung).then( data => {
              this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
                this.szenarioData = szenarioSnap;  
                this.begruendung1 = this.szenarioData.ereignisse.ereignis1.begruendung;
                this.begruendung2 = this.szenarioData.ereignisse.ereignis2.begruendung;
	            this.begruendung3 = this.szenarioData.ereignisse.ereignis3.begruendung;
                this.begruendung4 = this.szenarioData.ereignisse.ereignis4.begruendung;		
	          }); 			  
		    });
          }
        }
      ]
    });

    alert.present();
    } else {
      this.szenarioProvider.updateEreignis(path, ereignis, begruendung);		       	  
      }  
  }
  
  hideBegruendungen() {
    if (this.toggleVar == true){
	  this.toggleVar = false;
	} else if (this.toggleVar == false){
	    this.toggleVar = true;
	}
  } 

}
