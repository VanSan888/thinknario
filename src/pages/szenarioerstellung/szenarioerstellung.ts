import { Component } from '@angular/core';
import { NavController,IonicPage, AlertController, ToastController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';



@IonicPage()
@Component({
  selector: 'page-szenarioerstellung',
  templateUrl: 'szenarioerstellung.html'
})
export class SzenarioerstellungPage {
	
szenariobewertungPage = 'SzenariobewertungPage';

public szenarioData: any;
public annahme1 : string = "";
public annahme2 : string = "";
public annahme3 : string = "";
public annahme4 : string = "";
public annahmebegruendung1 : any = "";
public annahmebegruendung2 : any = "";
public annahmebegruendung3 : any = "";
public annahmebegruendung4 : any = "";
public randbedingung1 : string = "";
public randbedingung2 : string = "";
public randbedingung3 : string = "";
public randbedingung4 : string = "";
public randbedingungbegruendung1 : any = "";
public randbedingungbegruendung2 : any = "";
public randbedingungbegruendung3 : any = "";
public randbedingungbegruendung4 : any = "";
public ereignis1 : string = "";
public ereignis2 : string = "";
public ereignis3 : string = "";
public ereignis4 : string = "";
public ereignisbegruendung1 : any = "";
public ereignisbegruendung2 : any = "";
public ereignisbegruendung3 : any = "";
public ereignisbegruendung4 : any = "";

public subTitleText: string;
public toggleVar: boolean = false;

public hilfeVar: boolean = false;
public szenarioText: string = "";
public ausgangslageText: string = "";
public entwicklungText: string = "";
public endzustandText: string = "";

public ausgangslageDialogText: string;
public ausgangslageCounter: number = 0;

public entwicklungDialogText: string;
public entwicklungCounter: number = 0;

public endzustandDialogText: string;
public endzustandCounter: number = 0;



  constructor(public navCtrl: NavController,
              public szenarioProvider: SzenarioProvider,
			  public alertCtrl: AlertController,
			  public toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
	   
    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.annahme1 = this.szenarioData.annahmen.annahme1.annahme;
      this.annahme2 = this.szenarioData.annahmen.annahme2.annahme;
	  this.annahme3 = this.szenarioData.annahmen.annahme3.annahme;
      this.annahme4 = this.szenarioData.annahmen.annahme4.annahme;
      this.annahmebegruendung1 = this.szenarioData.annahmen.annahme1.begruendung;
      this.annahmebegruendung2 = this.szenarioData.annahmen.annahme2.begruendung;
      this.annahmebegruendung3 = this.szenarioData.annahmen.annahme3.begruendung;
      this.annahmebegruendung4 = this.szenarioData.annahmen.annahme4.begruendung;	  
	  this.randbedingung1 = this.szenarioData.randbedingungen.randbedingung1.randbedingung;
      this.randbedingung2 = this.szenarioData.randbedingungen.randbedingung2.randbedingung;
	  this.randbedingung3 = this.szenarioData.randbedingungen.randbedingung3.randbedingung;
      this.randbedingung4 = this.szenarioData.randbedingungen.randbedingung4.randbedingung;
      this.randbedingungbegruendung1 = this.szenarioData.randbedingungen.randbedingung1.begruendung;
	  this.randbedingungbegruendung2 = this.szenarioData.randbedingungen.randbedingung2.begruendung;
      this.randbedingungbegruendung3 = this.szenarioData.randbedingungen.randbedingung3.begruendung;
      this.randbedingungbegruendung4 = this.szenarioData.randbedingungen.randbedingung4.begruendung;
      this.ereignis1 = this.szenarioData.ereignisse.ereignis1.ereignis;
      this.ereignis2 = this.szenarioData.ereignisse.ereignis2.ereignis;
	  this.ereignis3 = this.szenarioData.ereignisse.ereignis3.ereignis;
      this.ereignis4 = this.szenarioData.ereignisse.ereignis4.ereignis;
	  this.ereignisbegruendung1 = this.szenarioData.ereignisse.ereignis1.begruendung;
	  this.ereignisbegruendung2 = this.szenarioData.ereignisse.ereignis2.begruendung;
	  this.ereignisbegruendung3 = this.szenarioData.ereignisse.ereignis3.begruendung;
	  this.ereignisbegruendung4 = this.szenarioData.ereignisse.ereignis4.begruendung;

      this.szenarioProvider.checkPath("szenariotext").then((result: boolean) => {
        if(result === true) {
	      this.szenarioText = this.szenarioData.szenariotext.ausgangslage;
		  this.ausgangslageText = this.szenarioData.szenariotext.ausgangslage;
		  this.entwicklungText = this.szenarioData.szenariotext.entwicklung;
		  this.endzustandText = this.szenarioData.szenariotext.endzustand;
		  this.hilfeVar = this.szenarioData.szenariotext.hilfe;
		  this.ausgangslageCounter = this.szenarioData.szenariotext.ausgangslagecounter;
		  this.entwicklungCounter = this.szenarioData.szenariotext.entwicklungcounter;
		  this.endzustandCounter = this.szenarioData.szenariotext.endzustandcounter;
		  
		  this.ausgangslageDialog(this.ausgangslageCounter);
		  this.entwicklungDialog(this.entwicklungCounter);
		  this.endzustandDialog(this.endzustandCounter);
		  
        } else {
		   this.szenarioProvider.updateSzenariotext("", "", "");
		   this.szenarioProvider.updateHilfe(this.hilfeVar);
		   this.szenarioProvider.updateCounter(0,0,0)
           this.toast1Present(); 
		  }
	  });
	});
  }
  
  toast1Present() {
    let toast = this.toastCtrl.create({
      message: 'Auf dieser Seite finden Sie all Ihre Informationen aus den vorangegangenen Schritten wieder.',
      position: 'middle',
	  showCloseButton: true,
	  closeButtonText: 'Weiter',
	});

    toast.onDidDismiss(() => {
      this.toast2Present();
    });

    toast.present();	  
  }
  
  toast2Present() {
    let toast = this.toastCtrl.create({
      message: 'Hier oben können Sie durch Klicken Ihre die Annahmen, Randbedingungen usw. einsehen.\n Sie können hier ebenfalls jederzeit alle Ihre Ideen verändern.',
      position: 'top',
	  showCloseButton: true,
	  closeButtonText: 'Weiter',
	});

    toast.onDidDismiss(() => {
      this.hilfeAlert();
    });

    toast.present();	  
  }
  
  hilfeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Szenarioerstellung',
      message: 'In dem großen Eingabefeld können Sie nun Ihr Szenario erstllen. Nutzen Sie dafür die von Ihnen gesammelten Informationen, indem Sie Zusammenhänge und Entwicklungen erarbeiten. \n Denken Sie daran, dass Sie Ihren Gedanken und Vorstellungen freien Lauf lassen können. \n \n Wollen Sie alleine vorgehen oder wollen Sie dafür einen Denkanstoß verwenden?',
      buttons: [
        {
          text: 'Denkanstoß verwenden',
          handler: data => {
            this.hilfeVar = true;
			this.szenarioProvider.updateHilfe(this.hilfeVar);
			this.startHilfe();
          }
        },        
		{
          text: 'Alleine vorgehen',
          role: 'cancel',
          handler: () => {
            this.toast3Present();
          }
        }

      ]
    });
    alert.present();
  }
  
  toast3Present() {
    let toast = this.toastCtrl.create({
      message: 'Falls Sie doch noch einen Denkanstoß verwenden wollen, klicken Sie einfach auf das Fragezeichensymbol neben "Ihr Szenario"',
      position: 'middle',
	  showCloseButton: true,
	  closeButtonText: 'Weiter',
	});

    toast.onDidDismiss(() => {
      //this.hilfeAlert();
    });

    toast.present();	  
  } 
 
  updateAnnahme(path, annahme, begruendung) {
	  
    if(path == "annahme1") {
	  this.subTitleText = 'Eine Begründung, warum Sie genau diese Annahme getroffen haben, hilft Ihnen bei der Erstellung Ihres Szenarios. Warum haben Sie genau diese Annahmen getroffen?';
    } else {
      this.subTitleText = 'Warum haben Sie genau diese Annahme getroffen?';
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
            this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung);
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            this.szenarioProvider.updateAnnahme(path, annahme, data.begruendung).then( data => {
              this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
                this.szenarioData = szenarioSnap;  
                this.annahmebegruendung1 = this.szenarioData.annahmen.annahme1.begruendung;
                this.annahmebegruendung2 = this.szenarioData.annahmen.annahme2.begruendung;
	            this.annahmebegruendung3 = this.szenarioData.annahmen.annahme3.begruendung;
                this.annahmebegruendung4 = this.szenarioData.annahmen.annahme4.begruendung;		
	          }); 			  
		    });
          }
        }
      ]
    });

    alert.present();
    } else {
      this.szenarioProvider.updateAnnahme(path, annahme, begruendung);		       	  
      }  
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
                this.randbedingungbegruendung1 = this.szenarioData.randbedingungen.randbedingung1.begruendung;
                this.randbedingungbegruendung2 = this.szenarioData.randbedingungen.randbedingung2.begruendung;
	            this.randbedingungbegruendung3 = this.szenarioData.randbedingungen.randbedingung3.begruendung;
                this.randbedingungbegruendung4 = this.szenarioData.randbedingungen.randbedingung4.begruendung;		
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
                this.ereignisbegruendung1 = this.szenarioData.ereignisse.ereignis1.begruendung;
                this.ereignisbegruendung2 = this.szenarioData.ereignisse.ereignis2.begruendung;
	            this.ereignisbegruendung3 = this.szenarioData.ereignisse.ereignis3.begruendung;
                this.ereignisbegruendung4 = this.szenarioData.ereignisse.ereignis4.begruendung;		
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

  updateSzenariotext(ausgangslageText: string,
                     entwicklungText: string,
					 endzustandText: string) {
	  this.szenarioProvider.updateSzenariotext(ausgangslageText, entwicklungText, endzustandText);
  }
  
  startHilfe() {

	  let toast = this.toastCtrl.create({
        message: 'Ihr Szenario wird in drei Schritten beschrieben: zuerst die Ausgangslage, dann die Entwicklung und zum Schluss der Endzustand. \n Zuerst sollten Sie die Ausgangslage beschreiben. \n Dabei geht es darum, den Anfangszustand ihres Szenarios zu beschreiben. \n Das Dialogfeld wird Ihnen bei dieser Aufgabe helfen.',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });

      toast.onDidDismiss(() => {
        this.ausgangslageText= "Startzeitpunkt:";
		this.ausgangslageCounter = 1;
		this.ausgangslageDialog(this.ausgangslageCounter);
      });

    toast.present();  

  }
  
  ausgangslageDialog (counter) {
	if (counter == 1) {
	  this.ausgangslageDialogText = "Fangen Sie bei der Angabe des Startzeitpunktes Ihres Dialoges an. Wann beginnt Ihr Szenario?"
	} else if (counter == 2) {
        this.ausgangslageDialogText = 'Nun sollen Sie die wichtigsten Aspekte der Situation, in der sich [das Produkt oder die Dienstleistung] befindet beschreiben. \n Beziehen Sie die Annahmen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'
	} else if (counter == 3) {
        this.ausgangslageDialogText = 'Welchen Einfluss haben die Randbedingungen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'	
	} else {
        this.ausgangslageDialogText = 'Welchen Einfluss haben die Randbedingungen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'			
		this.entwicklungHilfe();
	}
  }
  
  entwicklungHilfe() {
    if (this.entwicklungText == "") {
	  let toast = this.toastCtrl.create({
        message: 'Sie haben Ihr Ausgangslage fertiggestellt! Sie können jedoch trotzdem jederzeit Verfeinerungen vornehmen.\nSie können bei Bedarf ebenfalls das Dialogfeld wieder einblenden. \Nun entwickeln Sie Ihr Szenario von der Ausgangslage aus weiter. \n Das Dialogfeld wird Ihnen auch hier helfen',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });

      toast.onDidDismiss(() => {
        
		  this.entwicklungCounter = 1;
		  this.entwicklungDialog(this.entwicklungCounter);
      });

    toast.present();  
	}

  }

  entwicklungDialog (counter) {
	if (counter == 1) {
	  this.entwicklungDialogText = "Frage 1"
	} else if (counter == 2) {
        this.entwicklungDialogText = 'Frage 2'
	} else if (counter == 3) {
        this.entwicklungDialogText = 'Frage 3'	
	} else {
        this.entwicklungDialogText = 'Frage 3'
		this.endzustandHilfe();
	}
  }

  endzustandHilfe() {
    if(this.endzustandText == "") {
	  let toast = this.toastCtrl.create({
        message: 'Text nach Entwicklung und für Endzustand \n Das Dialogfeld wird Ihnen auch hier helfen',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });

      toast.onDidDismiss(() => {

          this.endzustandText= "Endzeitpunkt:";
		  this.endzustandCounter = 1;
		  this.endzustandDialog(this.endzustandCounter);
		
      });

    toast.present();  
    }
  }
  
  endzustandDialog (counter) {
	if (counter == 1) {
	  this.endzustandDialogText = "Frage 1"
	} else if (counter == 2) {
        this.endzustandDialogText = 'Frage 2'
	} else if (counter == 3) {
        this.endzustandDialogText = 'Frage 3'	
	} else {
        this.endzustandDialogText = 'Frage 3'
		//this.endzustandHilfe();
	}
  }  
  
  countForward(identifier) {
	if(identifier == "ausgangslage" && this.ausgangslageCounter < 4) {
      this.ausgangslageCounter = this.ausgangslageCounter + 1;
	  this.ausgangslageDialog(this.ausgangslageCounter);
	  this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	} else if (identifier == "entwicklung" && this.entwicklungCounter < 4) {
		this.entwicklungCounter = this.entwicklungCounter + 1;
		this.entwicklungDialog(this.entwicklungCounter);
		this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	} else if (identifier == "endzustand"  && this.endzustandCounter < 4) {
		this.endzustandCounter = this.endzustandCounter + 1;
		this.endzustandDialog(this.endzustandCounter);
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);		
	}
		
  }
  
  countBackward(identifier) {
    if (identifier == "ausgangslage") {
      this.ausgangslageCounter = this.ausgangslageCounter - 1;
	  this.ausgangslageDialog(this.ausgangslageCounter);
	  this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	} else if (identifier == "entwicklung") {
		this.entwicklungCounter = this.entwicklungCounter - 1;
		this.entwicklungDialog(this.entwicklungCounter);
		this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
    } else if (identifier == "endzustand") {
		this.endzustandCounter = this.endzustandCounter - 1;
		this.endzustandDialog(this.endzustandCounter);
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);		
	}
  }
  
  ionViewDidLeave() {
    if(this.ausgangslageCounter == 4) {
     this.ausgangslageCounter = this.ausgangslageCounter -1;
     this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
     } else if (this.entwicklungCounter == 4) {
	    this.entwicklungCounter = this.entwicklungCounter -1;
	    this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
     }
  }
  
}


