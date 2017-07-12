import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController  } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';

//Für Erklärungen siehe annahmen.ts (sehr ähnlicher Code/gleiche Funktion).

@IonicPage()
@Component({
  selector: 'page-randbedingungen',
  templateUrl: 'randbedingungen.html'
})
export class RandbedingungenPage {
	
ereignissePage = 'EreignissePage';

public szenarioData: any;
public randbedingung1 : string = "";
public randbedingung2 : string = "";
public randbedingung3 : string = "";
public randbedingung4 : string = "";
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
	  
    this.szenarioProvider.checkPath("randbedingungen").then((result: boolean) => {
     if(result === true) {	  
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.randbedingung1 = this.szenarioData.randbedingungen.randbedingung1.randbedingung;
        this.randbedingung2 = this.szenarioData.randbedingungen.randbedingung2.randbedingung;
	    this.randbedingung3 = this.szenarioData.randbedingungen.randbedingung3.randbedingung;
        this.randbedingung4 = this.szenarioData.randbedingungen.randbedingung4.randbedingung;
		this.begruendung1 = this.szenarioData.randbedingungen.randbedingung1.begruendung;
        this.begruendung2 = this.szenarioData.randbedingungen.randbedingung2.begruendung;
	    this.begruendung3 = this.szenarioData.randbedingungen.randbedingung3.begruendung;
        this.begruendung4 = this.szenarioData.randbedingungen.randbedingung4.begruendung;
	  });	
     } else {
	     this.szenarioProvider.updateRandbedingung("randbedingung1", "", "");
	     this.szenarioProvider.updateRandbedingung("randbedingung2", "", "");
	     this.szenarioProvider.updateRandbedingung("randbedingung3", "", "");
	     this.szenarioProvider.updateRandbedingung("randbedingung4", "", "");
	 }
	});
  }

  updateRandbedingung(path, randbedingung, begruendung) {
	  
    if(path == "randbedingung1") {
	  this.subTitleText = 'Eine Begründung, warum Sie genau diese Randbedingung festgelegt haben, hilft Ihnen bei der Erstellung Ihres Szenarios. Warum haben Sie genau diese Randbedingung festgelegt?';
    } else {
      this.subTitleText = 'Warum haben Sie genau diese Randbedingung festgelegt?';
    }
  
    if (begruendung == "") {
	  
    let alert = this.alertCtrl.create({
      title: 'Begründung',
	  subTitle: this.subTitleText,
    enableBackdropDismiss: false,
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
            this.szenarioProvider.updateRandbedingung(path, randbedingung, data.begruendung);
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.szenarioProvider.updateRandbedingung(path, randbedingung, data.begruendung).then( data => {
              this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
                this.szenarioData = szenarioSnap;  
                this.begruendung1 = this.szenarioData.randbedingungen.randbedingung1.begruendung;
                this.begruendung2 = this.szenarioData.randbedingungen.randbedingung2.begruendung;
	            this.begruendung3 = this.szenarioData.randbedingungen.randbedingung3.begruendung;
                this.begruendung4 = this.szenarioData.randbedingungen.randbedingung4.begruendung;		
	          }); 			  
		    });
          }
        }
      ]
    });

    alert.present();
    } else {
      this.szenarioProvider.updateRandbedingung(path, randbedingung, begruendung);		       	  
      }  
  }
    

}
