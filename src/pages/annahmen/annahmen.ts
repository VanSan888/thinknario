import { Component } from '@angular/core';
import { NavController,IonicPage, AlertController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';


@IonicPage()
@Component({
  selector: 'page-annahmen',
  templateUrl: 'annahmen.html'
})
export class AnnahmenPage {
	
//notwendig für Navigation	
randbedingungenPage = 'RandbedingungenPage';

public szenarioData: any;
public annahme1 : any = "";
public annahme2 : any = "";
public annahme3 : any = "";
public annahme4 : any = "";
public begruendung1 : any = "";
public begruendung2 : any = "";
public begruendung3 : any = "";
public begruendung4 : any = "";
public subTitleText: string;


  constructor( public navCtrl: NavController,
               public szenarioProvider: SzenarioProvider,
			   public alertCtrl: AlertController) {

  }
  
  ionViewDidEnter() {
	
    this.szenarioProvider.checkPath("annahmen").then((result: boolean) => {
     if(result === true) {	
      this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
        this.szenarioData = szenarioSnap;
        this.annahme1 = this.szenarioData.annahmen.annahme1.annahme;
        this.annahme2 = this.szenarioData.annahmen.annahme2.annahme;
	    this.annahme3 = this.szenarioData.annahmen.annahme3.annahme;
        this.annahme4 = this.szenarioData.annahmen.annahme4.annahme;
        this.begruendung1 = this.szenarioData.annahmen.annahme1.begruendung;
        this.begruendung2 = this.szenarioData.annahmen.annahme2.begruendung;
	    this.begruendung3 = this.szenarioData.annahmen.annahme3.begruendung;
        this.begruendung4 = this.szenarioData.annahmen.annahme4.begruendung;		
	  });	
     } else {
	     this.szenarioProvider.updateAnnahme("annahme1", "", "");
	     this.szenarioProvider.updateAnnahme("annahme2", "", "");
	     this.szenarioProvider.updateAnnahme("annahme3", "", "");
	     this.szenarioProvider.updateAnnahme("annahme4", "", "");
	 }
	});
  }

 
  updateAnnahme(annahme, path) {
	  
  if(path == "annahme1") {
	this.subTitleText = 'Eine Begründung, warum Sie genau diese Annahme getroffen haben, hilft Ihnen bei der Erstellung Ihres Szenarios. Warum haben Sie genau diese Annahmen getroffen?';
  } else {
    this.subTitleText = 'Warum haben Sie genau diese Annahme getroffen?';
  }
	  
  let alert = this.alertCtrl.create({
    title: 'Begründung',
	subTitle: this.subTitleText,
	inputs: [
      {
        name: 'begruendung',
        placeholder: 'Hier Begründung eingeben'
      }
    ],
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel',
        handler: data => {
          this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung);
        }
      },
      {
        text: 'Speichern',
        handler: data => {
          this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung);
        }
      }
    ]
  });
  alert.present();	  
	  	
  }


}
