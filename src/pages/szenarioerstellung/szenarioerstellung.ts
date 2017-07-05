import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-szenarioerstellung',
  templateUrl: 'szenarioerstellung.html',
  styles: ['canvas { border: 1px solid #000; }'],
})
export class SzenarioerstellungPage {

//Variable notwenig zur Navigation	
szenariobewertungPage = 'SzenariobewertungPage';


public pageId: string;
public url: string;




//Variablen notwendig für den Abruf und das Speichern der Eingaben.
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

public szenarioText: string = "";
public ausgangslageText: string = "";
public entwicklungText: string = "";
public endzustandText: string = "";

public startSzenario: string;
public endSzenario: string;

//Notwendig, für das Speichern und Abrufen, ob der User den Denkantoß verwendet oder nicht
//Zu Beginn ist hilfeVar=false. Das heißt, dass keine Hilfestellung benutzt wird.
public hilfeVar: boolean = false;

//Variable für variablen Untertitel in Alert
public subTitleText: string;
//Variable um über ion-toggle die Begründungen ein- und auszublenden
public toggleVar: boolean = false;

//Variablen notwendig für die variable Ausgabe der Dialogtexte
public ausgangslageDialogText: string;
public ausgangslageCounter: number = 0;


public entwicklungDialogText: string;
public entwicklungCounter: number = 0;

public endzustandDialogText: string;
public endzustandCounter: number = 0;


//Variablen notwendig für das Ein- und Ausblenden der Dialogfelder
public toggleAusgangslage: boolean = true;
public toggleEntwicklung: boolean = true;
public toggleEndzustand: boolean = true;

//a reference to the canvas element from our template
@ViewChild('canvas1') public canvas1: ElementRef;
@ViewChild('canvas2') public canvas2: ElementRef;
@ViewChild('canvas3') public canvas3: ElementRef;
@ViewChild('canvas4') public canvas4: ElementRef;
@ViewChild('canvas5') public canvas5: ElementRef;
@ViewChild('canvas6') public canvas6: ElementRef;

// setting a width and height for the canvas
@Input() public width = 400;
@Input() public height = 300;

public toggleVarSchluesselfaktoren: boolean = false;

private cx1: CanvasRenderingContext2D;
private cx2: CanvasRenderingContext2D;
private cx3: CanvasRenderingContext2D;
private cx4: CanvasRenderingContext2D;
private cx5: CanvasRenderingContext2D;
private cx6: CanvasRenderingContext2D;

public schluesselfaktor1: boolean = false;
public schluesselfaktor2: boolean = false;
public schluesselfaktor3: boolean = false;
public schluesselfaktor4: boolean = false;
public schluesselfaktor5: boolean = false;
public schluesselfaktor6: boolean = false;

  constructor(public navCtrl: NavController,
              public szenarioProvider: SzenarioProvider,
			        public alertCtrl: AlertController,
			        public toastCtrl: ToastController) {}

ionViewDidLoad() {
    // get the context
    const canvasEl1: HTMLCanvasElement = this.canvas1.nativeElement;
    const canvasEl2: HTMLCanvasElement = this.canvas2.nativeElement;
    const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;
    const canvasEl4: HTMLCanvasElement = this.canvas4.nativeElement;
    const canvasEl5: HTMLCanvasElement = this.canvas5.nativeElement;
    const canvasEl6: HTMLCanvasElement = this.canvas6.nativeElement;
    this.cx1 = canvasEl1.getContext('2d');
    this.cx2 = canvasEl2.getContext('2d');
    this.cx3 = canvasEl3.getContext('2d');
    this.cx4 = canvasEl4.getContext('2d');
    this.cx5 = canvasEl5.getContext('2d');
    this.cx6 = canvasEl6.getContext('2d');	
	
	if ( this.cx1 == null || this.cx2 == null || this.cx3 == null || this.cx4 == null || 
       this.cx5 == null || this.cx6 == null) {
      let alert = this.alertCtrl.create({
        title: 'Keine Unterstützung',
        subTitle: 'Ihr System unterstützt diese Funktion nicht. Bitte updaten Sie ihr System',
        buttons: ['Abbrechen']
      });
      alert.present();	
	}
	
    // set the width and height
    canvasEl1.width  = this.width;
    canvasEl1.height = this.height;
    canvasEl2.width  = this.width;
    canvasEl2.height = this.height;
    canvasEl3.width  = this.width;
    canvasEl3.height = this.height;
    canvasEl4.width  = this.width;
    canvasEl4.height = this.height;
    canvasEl5.width  = this.width;
    canvasEl5.height = this.height;
    canvasEl6.width  = this.width;
    canvasEl6.height = this.height;
	  //this.canvasWhiteboard.canvas.width = this.width;
    //this.canvasWhiteboard.canvas.height = this.height;


    // set some default properties about the line
    this.cx1.lineWidth = 3;
    this.cx1.lineCap = 'round';
    this.cx1.strokeStyle = '#000';
    this.cx2.lineWidth = 3;
    this.cx2.lineCap = 'round';
    this.cx2.strokeStyle = '#000';
    this.cx3.lineWidth = 3;
    this.cx3.lineCap = 'round';
    this.cx3.strokeStyle = '#000';
    this.cx4.lineWidth = 3;
    this.cx4.lineCap = 'round';
    this.cx4.strokeStyle = '#000';
    this.cx5.lineWidth = 3;
    this.cx5.lineCap = 'round';
    this.cx5.strokeStyle = '#000';
    this.cx6.lineWidth = 3;
    this.cx6.lineCap = 'round';
    this.cx6.strokeStyle = '#000';
	
    
    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl1, this.cx1);
	  this.captureEvents(canvasEl2, this.cx2);
    this.captureEvents(canvasEl3, this.cx3);
    this.captureEvents(canvasEl4, this.cx4);
    this.captureEvents(canvasEl5, this.cx5);
    this.captureEvents(canvasEl6, this.cx6);

    //Festelgen der pageId für Disqus. Die pageId soll der UserID entsprechen.
    //Durch die getUserID() Funktion des Szenarioproviders wird deswegen der aktuele User abgerufen
    this.szenarioProvider.getUserID().then( UID => {
      this.pageId = UID;
    }).then(pageId => {
        //Danach wird die URL definiert. Behilfsweise wird www.test.de verwendet.
        //Wenn die WebSite online ist, muss hier die richtige URL eingesetzt werden.
        this.url = "http://www.test.de/" + this.pageId + "/";
      });
  }


  ionViewDidEnter() {

	//Beschreiben der lokalen Variablen mit den Daten aus Firebase.
	//Siehe auch Erklärung bei ProblemfeldPage.
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
      this.schluesselfaktor1 = this.szenarioData.schluesselfaktoren.schluesselfaktor1;
	    this.schluesselfaktor2 = this.szenarioData.schluesselfaktoren.schluesselfaktor2;
      this.schluesselfaktor3 = this.szenarioData.schluesselfaktoren.schluesselfaktor3;
      this.schluesselfaktor4 = this.szenarioData.schluesselfaktoren.schluesselfaktor4;
      this.schluesselfaktor5 = this.szenarioData.schluesselfaktoren.schluesselfaktor5;
		  this.schluesselfaktor6 = this.szenarioData.schluesselfaktoren.schluesselfaktor6;
      this.startSzenario = this.szenarioData.deskriptorenanalyse.startSzenario;
      this.endSzenario = this.szenarioData.deskriptorenanalyse.endSzenario;
	  //Schauen, ob Daten im Pfad "szenariotext" hinterlegt sind.
      this.szenarioProvider.checkPath("szenariotext").then((result: boolean) => {
		//Wenn ja, dann auslesen dieser Daten
        if(result === true) {
		  //szenarioText (ohne Hilfestellung) wird genau wie ausgangslageText aus
		  //szenariotext.ausgangslage beschrieben. So kann später gewährleistet werden,
		  //dass auch bei einem Wechsel von ohne zu mit Hilfestellung die bisherigen Eingaben des Users in
		  //szenarioText nicht verloren gehen. (siehe Auch startHilfe()).
	    this.szenarioText = this.szenarioData.szenariotext.ausgangslage;
		  this.ausgangslageText = this.szenarioData.szenariotext.ausgangslage;
		  this.entwicklungText = this.szenarioData.szenariotext.entwicklung;
		  this.endzustandText = this.szenarioData.szenariotext.endzustand;
		  this.hilfeVar = this.szenarioData.szenariotext.hilfe;
		  this.ausgangslageCounter = this.szenarioData.szenariotext.ausgangslagecounter;
		  this.entwicklungCounter = this.szenarioData.szenariotext.entwicklungcounter;
		  this.endzustandCounter = this.szenarioData.szenariotext.endzustandcounter;
		  
		  //Hier werden die aktuellen DiologCounter an die jeweiligen Funktionen weitergeben.
		  //Die DiologCounter legen fest, welcher text in den Dialogfeldern angezeigt wird.
		  this.ausgangslageDialog(this.ausgangslageCounter);
		  this.entwicklungDialog(this.entwicklungCounter);
		  this.endzustandDialog(this.endzustandCounter);
		  
        } else {
		   //Wenn keine Daten in den Datenbank vorhanden sind, dann beschreib Sie mit Dummidaten für
		   //die Szenariotexte ("") und setze die DiologCounter auf 0.
		   this.szenarioProvider.updateSzenariotext("", "", "");
		   this.szenarioProvider.updateCounter(0,0,0);
		   //HilfeVar dient zur Unterscheidung zwischen Usern, die eine Hilfestellung wollen und denen
		   //die keine wollen.
		   this.szenarioProvider.updateHilfe(this.hilfeVar);
		   //Dann rufe Toast1 auf.
           this.toast1Present(); 
		  }
	  });
	});

  let storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor1');
	  storageRef.getDownloadURL().then( url => {
      let canvas1 = this.canvas1.nativeElement;
	    let ctx = canvas1.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });
    storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor2');
	  storageRef.getDownloadURL().then( url => {
      let canvas2 = this.canvas2.nativeElement;
	    let ctx = canvas2.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });
    storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor3');
	  storageRef.getDownloadURL().then( url => {
      let canvas3 = this.canvas3.nativeElement;
	    let ctx = canvas3.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });
    storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor4');
	  storageRef.getDownloadURL().then( url => {
      let canvas4 = this.canvas4.nativeElement;
	    let ctx = canvas4.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });
    storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor5');
	  storageRef.getDownloadURL().then( url => {
      let canvas5 = this.canvas5.nativeElement;
	    let ctx = canvas5.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });
    storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid + '/').child('deskriptor6');
	  storageRef.getDownloadURL().then( url => {
      let canvas6 = this.canvas6.nativeElement;
	    let ctx = canvas6.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });

  }
  
  //Toast1 wird in der Mitte der Seite angezeigt (middle) und fängt an dem User
  //die SzenarioerstellungPage zu erklären (siehe message).
  toast1Present() {
    let toast = this.toastCtrl.create({
      message: 'Auf dieser Seite finden Sie all Ihre Informationen aus den vorangegangenen Schritten wieder.',
      position: 'middle',
	  showCloseButton: true,
	  closeButtonText: 'Weiter',
	});
    //Wenn auf 'Weiter' geklickt wird, wird Toast2 aufgerufen.
    toast.onDidDismiss(() => {
      this.toast2Present();
    });

    toast.present();	  
  }
  
  //Toast2 wird ganz oben angezeigt (top) und erklärt dem User, dass auf dieser Seite
  //alle seine Annahmen usw. wiederzufinden sind (siehe message).
  toast2Present() {
    let toast = this.toastCtrl.create({
      message: 'Hier oben können Sie durch Klicken Ihre die Annahmen, Randbedingungen usw. einsehen.\n Sie können hier ebenfalls jederzeit alle Ihre Ideen verändern.',
      position: 'top',
	  showCloseButton: true,
	  closeButtonText: 'Weiter',
	});
    // Wenn der User auf 'Weiter' klickt, dann wird hilfeAlert() aufgerufen.
    toast.onDidDismiss(() => {
      this.hilfeAlert();
    });

    toast.present();	  
  }
  //HIlfeAlert dient dem User zur Entscheidung, ob er die Hilfestellung/ den Denkanstoß verwenden will. 
  hilfeAlert() {
    let alert = this.alertCtrl.create({
      title: 'Szenarioerstellung',
      message: 'In dem großen Eingabefeld können Sie nun Ihr Szenario erstllen. Nutzen Sie dafür die von Ihnen gesammelten Informationen, indem Sie Zusammenhänge und Entwicklungen erarbeiten. \n Denken Sie daran, dass Sie Ihren Gedanken und Vorstellungen freien Lauf lassen können. \n \n Wollen Sie alleine vorgehen oder wollen Sie dafür einen Denkanstoß verwenden?',
      buttons: [
        {
          text: 'Denkanstoß verwenden',
		  //Wenn der User den Denkanstoß verwenden will, wird hilfeVar auf true gesetzt.
		  //Dadurch wird die UI verändert. (siehe szenarioerstellung.html: 3 Textareas mit
		  // mit Dialogfeldern statt nur einer ohne Dialogfeld.)
          handler: data => {
            this.hilfeVar = true;
		    //Dieser Wert wird in der Datenbank gespeichert
			this.szenarioProvider.updateHilfe(this.hilfeVar);
			//Danach wird startHilfe() aufgerufen.
			this.startHilfe();
          }
        },        
		{
          text: 'Alleine vorgehen',
          role: 'cancel',
		  //Wenn der User keine Starthilfe haben will, wird Toast 3 aufgerufen.
          handler: () => {
            this.toast3Present();
          }
        }

      ]
    });
    alert.present();
  }
  
  //Toast3 wird in der Mitte der Seite angezeigt (top) und erklärt dem User, dass er mit einem Klick
  //auf das Fragezeichensymbol (siehe szenarioerstellung.html: ion-icon) auch noch entscheiden kann,
  //die Hilfestellung zu benutzen (siehe Message).
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

private captureEvents(canvasEl: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  Observable
    .fromEvent(canvasEl, 'mousedown')
    .switchMap((e) => {
      return Observable
        .fromEvent(canvasEl, 'mousemove')
        .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
        .pairwise()
    })
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();

      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      this.drawOnCanvas(prevPos, currentPos, ctx);
    });
}


  private drawOnCanvas(
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number },
    ctx: CanvasRenderingContext2D
    ) {
      // incase the context is not set
      if (!ctx) { return; }

      // start our drawing path
      ctx.beginPath();

      // we're drawing lines so we need a previous position
      if (prevPos) {
      // sets the start point
      ctx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      ctx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      ctx.stroke();
      }
  }

  toggleSchluesselfaktoren(){
    if(this.toggleVarSchluesselfaktoren == true){
      this.toggleVarSchluesselfaktoren = false;
    } else if (this.toggleVarSchluesselfaktoren == false) {
      this.toggleVarSchluesselfaktoren = true;
    }
  }

  hideSchluesselfaktoren(){
      this.toggleVarSchluesselfaktoren = false;
  } 
  
  clearCanvas(ctx : CanvasRenderingContext2D){	  
    ctx.clearRect(0, 0, this.width, this.height);   
  }
  clearCanvas1(){
    this.clearCanvas(this.cx1);
  }
  clearCanvas2(){
    this.clearCanvas(this.cx2);
  }
  clearCanvas3(){
    this.clearCanvas(this.cx3);
  }
  clearCanvas4(){
    this.clearCanvas(this.cx4);
  }
  clearCanvas5(){
    this.clearCanvas(this.cx5);
  }
  clearCanvas6(){
    this.clearCanvas(this.cx6);
  }
	
  drawCanvas(ctx : CanvasRenderingContext2D){
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';	  
  }
  drawCanvas1(){
    this.drawCanvas(this.cx1)
  }
  drawCanvas2(){
    this.drawCanvas(this.cx2)
  }
  drawCanvas3(){
    this.drawCanvas(this.cx3)
  }
  drawCanvas4(){
    this.drawCanvas(this.cx4)
  }
  drawCanvas5(){
    this.drawCanvas(this.cx5)
  }
  drawCanvas6(){
    this.drawCanvas(this.cx6)
  }

  eraseCanvas(ctx : CanvasRenderingContext2D){
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#FFF';	  
  }
  eraseCanvas1() {
    this.eraseCanvas(this.cx1)
  }
  eraseCanvas2() {
    this.eraseCanvas(this.cx2)
  }
  eraseCanvas3() {
    this.eraseCanvas(this.cx3)
  }
  eraseCanvas4() {
    this.eraseCanvas(this.cx4)
  }
  eraseCanvas5() {
    this.eraseCanvas(this.cx5)
  }
  eraseCanvas6() {
    this.eraseCanvas(this.cx6)
  }

ionViewWillLeave(){
    let canvas1 = this.canvas1.nativeElement;
	  let canvas2 = this.canvas2.nativeElement;
	  let canvas3 = this.canvas3.nativeElement;
    let canvas4 = this.canvas4.nativeElement;
    let canvas5 = this.canvas5.nativeElement;
    let canvas6 = this.canvas6.nativeElement;

    var storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid);	
	  canvas1.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor1").put(blob);
    });
	  canvas2.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor2").put(blob);
    });
	  canvas3.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor3").put(blob);
    });
	  canvas4.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor4").put(blob);
    });
	  canvas5.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor5").put(blob);
    });
	  canvas6.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      /*var uploadTask =*/ storageRef.child("deskriptor6").put(blob);
    });
	/*
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    });
	*/
  }

  
  //Funktion zum Updaten der Szenariotexte für die Ausgangslage, die Entwicklung und den Endzustand
  updateSzenariotext(ausgangslageText: string,
                     entwicklungText: string,
					 endzustandText: string) {
	  this.szenarioProvider.updateSzenariotext(ausgangslageText, entwicklungText, endzustandText);
  }
  
  //In der startHilfe Funktion wird ein Toast in der Mitte der Seite (middle) aufgerufen,
  //der den groben folgenden Ablauf der Szenarioerstellung erklärt.
  startHilfe() {

	  let toast = this.toastCtrl.create({
        message: 'Ihr Szenario wird in drei Schritten beschrieben: zuerst die Ausgangslage, dann die Entwicklung und zum Schluss der Endzustand. \n Zuerst sollten Sie die Ausgangslage beschreiben. \n Dabei geht es darum, den Anfangszustand ihres Szenarios zu beschreiben. \n Das Dialogfeld wird Ihnen bei dieser Aufgabe helfen.',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });
      //Wenn der User auf 'Weiter' klickt, dann wird der ausgangslageText beschrieben.
      toast.onDidDismiss( data => {
		//Die Variable wird nur beschrieben, falls der Ausgangslagetext noch aus den Dummidaten aus 
		//ionViewDidEnter besteht. Wenn der User schon ohne Hilfestellung Eingaben getätigt hat,
		//dann sollen diese nicht überschrieben werden.
		//Außerdem wird so verhindert, dass der geschriebene Text des Users - auch mit Hilfestellung,
		//beim erneuten aufrufen der Seite überschrieben wird.
		if (this.ausgangslageText == "") {
        this.ausgangslageText= "Startzeitpunkt:" + this.startSzenario;
		}
		//Dann wird der ausgangslageCounter auf 1 gesetzt (UI Veränderungen in szenarioerstellung.html). 
		this.ausgangslageCounter = 1;
		// Zusätzlich wird der neue Wert in der Datenbank gespeichert. So kann der User beim erneuten aufruf der 
		//Seite an der gleichen Stelle weiterarbeiten.
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
        //Übergabe des neuen ausgangslageCounters an die ausgangslageDialog() Funktion.		
		this.ausgangslageDialog(this.ausgangslageCounter);
      });

    toast.present();  

  }
  
  //Funktion, um abhängig vom übergebenen Wert den ausgangslageDialogText in 
  //szenarioerstelung.html festelgt.
  ausgangslageDialog (counter) {
	if (counter == 0) {
		
	} else if (counter == 1) {
	  this.ausgangslageDialogText = "Ausgehend vom Startzeitpunkt ihres Szenarios (" + this.startSzenario + ") ..."
	} else if (counter == 2) {
        this.ausgangslageDialogText = 'Nun sollen Sie die wichtigsten Aspekte der Situation, in der sich [das Produkt oder die Dienstleistung] befindet beschreiben. \n Beziehen Sie die Annahmen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'
	} else if (counter == 3) {
        this.ausgangslageDialogText = 'Welchen Einfluss haben die Randbedingungen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'	
	} else {
        this.ausgangslageDialogText = 'Welchen Einfluss haben die Randbedingungen und deren Begründungen auf [das Produkt oder die Dienstleistung] und die Ausgangslage?'
        //Wenn alle Fragen vom User bearbeitet worden sind, wird die entwicklungsHilfe() Funktion aufgerufen.	
		this.entwicklungHilfe();
	}
  }
  
  //In der entwicklungHilfe() Funktion wird ein Toast in der Mitte der Seite (middle) aufgerufen,
  //der dem User den weiteren Ablauf erklärt (siehe Message).
  entwicklungHilfe() {
	//Der Toast wird nur dann aufgerufen, wenn der Ausgangslagetext noch aus den Dummidaten aus 
    //ionViewDidEnter besteht. So wird verhindert, dass der User, der sein Szenario nur noch einmal 
	//nachträglich verändern will, immer wieder den Toast wegklicken muss.
    if (this.entwicklungText == "") {
	  let toast = this.toastCtrl.create({
        message: 'Sie haben Ihr Ausgangslage fertiggestellt! Sie können jedoch trotzdem jederzeit Verfeinerungen vornehmen.\nSie können bei Bedarf ebenfalls das Dialogfeld wieder einblenden. \Nun entwickeln Sie Ihr Szenario von der Ausgangslage aus weiter. \n Das Dialogfeld wird Ihnen auch hier helfen',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });
      //Wenn der User auf weiter klickt ...
      toast.onDidDismiss(() => {
          //Dann wird der entwicklungCounter auf 1 gesetzt (UI Veränderungen in szenarioerstellung.html). 
		  this.entwicklungCounter = 1;
		  // Zusätzlich wird der neue Wert in der Datenbank gespeichert. So kann der User beim erneuten aufruf der 
		  //Seite an der gleichen Stelle weiterarbeiten.
      this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
      //Übergabe des neuen entwicklungCounter an die entwicklungDialog() Funktion.		  
		  this.entwicklungDialog(this.entwicklungCounter);
      //Am Ende des Dialoges soll das Dialogfeld einklappen
      this.toggleAusgangslage = false;
      });

    toast.present();  
	}

  }
  
  //Siehe Erklärung zu ausgangslageDialog
  entwicklungDialog (counter) {
	if (counter == 0) {
		
    } else if (counter == 1) {
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

  //Sehr ähnlich zu entwicklungHilfe(). Siehe Erklärung dort.
  endzustandHilfe() {
    if(this.endzustandText == "") {
	  let toast = this.toastCtrl.create({
        message: 'Text nach Entwicklung und für Endzustand \n Das Dialogfeld wird Ihnen auch hier helfen',
        position: 'middle',
	    showCloseButton: true,
	    closeButtonText: 'Weiter',
	  });

      toast.onDidDismiss(() => {
        this.endzustandText= "Endzeitpunkt:" + this.endSzenario;
		    this.endzustandCounter = 1;
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);		
		    this.endzustandDialog(this.endzustandCounter);
        this.toggleEntwicklung = false;
		  });
    toast.present();  
    }
  }
  
  //Siehe Erklärung zu ausgangslageDialog  
  endzustandDialog (counter) {
	  if (counter == 1) {
	    this.endzustandDialogText = "Sie sind am Ende Ihres Szenarios angekommen (" + this.endSzenario +") ..."
	  } else if (counter == 2) {
        this.endzustandDialogText = 'Frage 2'
	  } else if (counter == 3) {
        this.endzustandDialogText = 'Frage 3'	
	  } else {
        this.endzustandDialogText = 'Frage 3'
		    this.szenarioFertig();
	  }
  }

  szenarioFertig(){
    if(this.endzustandText !== ""){
  	  let toast = this.toastCtrl.create({
        message: 'Herzlichen Glückwunsch: Sie haben ihr Szenario erstellt! \n Wenn Sie wollen, können Sie nun selbstständig weitre Verfeinerungen und Ergänzungen vornehmen.',
        position: 'middle',
	      showCloseButton: true,
	      closeButtonText: 'Weiter',
	    });

        toast.onDidDismiss(() => {
          this.toggleEndzustand = false;
		    });
      toast.present(); 
    } 
  }
  
  //Funktion, um abhängig vom übergebenen Argument den entsprechenden Counter hochzuzählen.
  countForward(identifier) {
	//Wenn der identifier der ausgangslage entspricht und kleiner als 4 ist (es gibt nur 3 Fragen
	//und bei einem zusätzlichen Klick den entwicklungHilfe-Toast), dann
	if(identifier == "ausgangslage" && this.ausgangslageCounter < 4) {
	  //Zähle den ausgangslageCounter um eine Zahl nach oben.
      this.ausgangslageCounter = this.ausgangslageCounter + 1;
	  //und übergebe diesen neuen Wert an die ausgangslageDialog() Funktion
	  this.ausgangslageDialog(this.ausgangslageCounter);
	  //Dann update den neuen ausgangslageCounter-Wert in der Datenbank.
	  this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	//Der Rest der Funktion funktionert in gleicher Art und Weise nur für die anderen Counter.
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

  //Funktion, um abhängig vom übergebenen Argument den entsprechenden Counter runterzuzählen.  
  countBackward(identifier) {
    //Wenn der identifier der ausgangslage entspricht...
    if (identifier == "ausgangslage") {
	  //Zähle den ausgangslageCounter um eine Zahl nach unten.
      this.ausgangslageCounter = this.ausgangslageCounter - 1;
	  //und übergebe diesen neuen Wert an die ausgangslageDialog() Funktion.
	  this.ausgangslageDialog(this.ausgangslageCounter);
	  //Dann update den neuen ausgangslageCounter-Wert in der Datenbank.
	  this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	//Dieser Teil der Funktion funktionert noch nicht korrekt.
	//Hier soll der Counter um 2 reduziert werden, wenn der Counter gleich 4 ist.
	//Hintergrund ist, dass man sonst zwei mal auf zurück klicken müsste, wenn der Counter
	//auf 4 steht, um die Frage 2 zu sehen.
	} else if (this.ausgangslageCounter == 4 && identifier == "ausgangslage") {
	    this.ausgangslageCounter = this.ausgangslageCounter -2;
		this.entwicklungDialog(this.ausgangslageCounter);
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
    //Der Rest der Funktion funktionert in gleicher Art und Weise nur für die anderen Counter.		
	}else if (identifier == "entwicklung") {
		this.entwicklungCounter = this.entwicklungCounter - 1;
		this.entwicklungDialog(this.entwicklungCounter);
		this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
    } else if (identifier == "entwicklung" && this.entwicklungCounter == 4) {
	    this.entwicklungCounter = this.entwicklungCounter -2;
		this.entwicklungDialog(this.entwicklungCounter);
	    this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
	} else if (identifier == "endzustand") {
		this.endzustandCounter = this.endzustandCounter - 1;
		this.endzustandDialog(this.endzustandCounter);
        this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);		
	} else if (identifier == "endzustand" && this.endzustandCounter == 4) {
	    this.endzustandCounter = this.endzustandCounter -2;
		this.endzustandDialog(this.endzustandCounter);
	    this.szenarioProvider.updateCounter(this.ausgangslageCounter, this.entwicklungCounter, this.endzustandCounter);
    }
  }

  
}


