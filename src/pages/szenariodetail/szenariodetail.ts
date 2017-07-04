import { Component, Input, ElementRef, ViewChild } from '@angular/core';
//NavParams kontrollieren die Navigationsparameter
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { BibliothekProvider } from '../../providers/bibliothek/bibliothek';
import * as firebase from 'firebase';


@IonicPage({
	name: 'szenariodetail',
	//Hier wird eine Instanz dieser Seite mittels der SzenarioID aufgerufen
	//SzenarioID wird in bibliothekpage.ts an diese Seite übergeben
	segment: 'szenariodetail/:szenarioID'
})
@Component({
  selector: 'page-szenariodetail',
  templateUrl: 'szenariodetail.html',
  styles: ['canvas { border: 1px solid #000; }'],
})
export class SzenariodetailPage {
  
  //Variable die mit den Daten des Szenarios beschrieben wird.
  public currentSzenario: any;

  public pageId: string;

  //Variable um szenariodetail.html anzupassen, je nach dem, ob der User die Hiflestellung
  //in Anspruch genommen hat oder nicht.
  public hilfeVar: boolean = false;

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
  
  //NavParams sind notwendig, um die Weiterleitung von der Bibliothekpage zu gewährleisten
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public bibliothekProvider: BibliothekProvider) {}
  

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

    //Festelgen der pageId für Disqus
    this.pageId = this.navParams.get('szenarioId');

}
  
  ionViewDidEnter(){
	//Aufruf der getSzenarioDetail() Funktion und übergabe der aktuellen Navigationsparameter.
	//Durch die Übergabe dieses Parameters kann in bibliothek.ts der passende Pfad für die
	//Abzurufenden Daten beschritten werden
    this.bibliothekProvider.getSzenarioDetail(this.navParams.get('szenarioId'))
    .then( szenarioSnap => {
	  //Beschreiben der Variablen mit den Daten des Snapshots aus firebase
    this.currentSzenario = szenarioSnap;
	  this.hilfeVar = this.currentSzenario.hilfe;
    });

  let storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor1');
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
    storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor2');
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
    storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor3');
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
    storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor4');
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
    storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor5');
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
    storageRef =  firebase.storage().ref().child(this.navParams.get('szenarioId') + '/').child('deskriptor6');
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
  
  //Funktion für die Navigation zur Ratingdetailseite
  goToRatingDetail(szenarioId){
    //Übergabe des Navigationsparameters an diese Seite.
	//Der Navigationsparameter entspricht der UserID des Szenarios, welches bewertet werden soll.
    this.navCtrl.push('ratingdetail', { 'szenarioId': szenarioId });
  }

}
