import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import { SzenarioProvider } from '../../providers/szenario/szenario';
import { CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
import { ViewEncapsulation } from '@angular/core';
//Alte Ideen müssen in dieser Datei, in der dazugehörigen .hmtl module.ts und in app.module bereinigt werden
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-deskriptorenanalyse',  
  templateUrl: 'deskriptorenanalyse.html',
  styles: ['canvas { border: 1px solid #000; }'],
  encapsulation: ViewEncapsulation.None 
})
export class DeskriptorenanalysePage {

//Notwendig für Naviigation	
annahmenPage = 'AnnahmenPage'

//a reference to the canvas element from our template
@ViewChild('canvas1') public canvas1: ElementRef;
@ViewChild('canvas2') public canvas2: ElementRef;
@ViewChild('canvas3') public canvas3: ElementRef;
@ViewChild('canvas4') public canvas4: ElementRef;
@ViewChild('canvas5') public canvas5: ElementRef;
@ViewChild('canvas6') public canvas6: ElementRef;

//@ViewChild('nameOfRef') canvasWhiteboard: CanvasWhiteboardComponent;

// setting a width and height for the canvas
@Input() public width = 400;
@Input() public height = 300;

private cx1: CanvasRenderingContext2D;
private cx2: CanvasRenderingContext2D;
private cx3: CanvasRenderingContext2D;
private cx4: CanvasRenderingContext2D;
private cx5: CanvasRenderingContext2D;
private cx6: CanvasRenderingContext2D;

//private cx3: CanvasRenderingContext2D;

public szenarioData: any;
public schluesselfaktor1: boolean = false;
public schluesselfaktor2: boolean = false;
public schluesselfaktor3: boolean = false;
public schluesselfaktor4: boolean = false;
public schluesselfaktor5: boolean = false;
public schluesselfaktor6: boolean = false;


constructor(public navCtrl: NavController,
            public alertCtrl: AlertController,
            public szenarioProvider: SzenarioProvider){

  }
   
  ionViewDidLoad() {
    // get the context
    const canvasEl1: HTMLCanvasElement = this.canvas1.nativeElement;
    const canvasEl2: HTMLCanvasElement = this.canvas2.nativeElement;
    const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;
    const canvasEl4: HTMLCanvasElement = this.canvas4.nativeElement;
    const canvasEl5: HTMLCanvasElement = this.canvas5.nativeElement;
    const canvasEl6: HTMLCanvasElement = this.canvas6.nativeElement;
	  //const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;
    this.cx1 = canvasEl1.getContext('2d');
    this.cx2 = canvasEl2.getContext('2d');
    this.cx3 = canvasEl3.getContext('2d');
    this.cx4 = canvasEl4.getContext('2d');
    this.cx5 = canvasEl5.getContext('2d');
    this.cx6 = canvasEl6.getContext('2d');
    //this.cx3 =  this.canvasWhiteboard.canvas.nativeElement.getContext('2d');	
	
	  if( this.cx1 == null || this.cx2 == null || this.cx3 == null || this.cx4 == null || 
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

  }
  
  ionViewDidEnter () {

    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.schluesselfaktor1 = this.szenarioData.schluesselfaktoren.schluesselfaktor1;
	    this.schluesselfaktor2 = this.szenarioData.schluesselfaktoren.schluesselfaktor2;
      this.schluesselfaktor3 = this.szenarioData.schluesselfaktoren.schluesselfaktor3;
      this.schluesselfaktor4 = this.szenarioData.schluesselfaktoren.schluesselfaktor4;
      this.schluesselfaktor5 = this.szenarioData.schluesselfaktoren.schluesselfaktor5;
		  this.schluesselfaktor6 = this.szenarioData.schluesselfaktoren.schluesselfaktor6;
    });

    this.szenarioProvider.checkDeskriptorPath().then((result: boolean) => {
     if(result == false) {
       let test = result;
     } else {
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
    });
    
    
  }
  
drawCoordinates() {

  this.cx1.beginPath();
  this.cx1.moveTo(30,30);
  this.cx1.lineTo(30,270);
  this.cx1.lineTo(370,270);
  this.cx1.stroke();
  this.cx1.font = '20px serif';
  this.cx1.fillText('2001',30,290);  
  this.cx1.fillText('2018',340,290);
  this.cx1.save();
  this.cx1.translate(0, 300);
  this.cx1.rotate(-Math.PI/2);
  this.cx1.textAlign = "center";
  this.cx1.fillText("Operationalisiertes Bsp.1", 170, 25);
  this.cx1.restore();

}
  

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    console.log(updates);
  }
  onCanvasClear() {
    console.log("The canvas was cleared");
  }
  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }
  onCanvasRedo(updateUUID: string) {
    console.log(`REDO with uuid: ${updateUUID}`);
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
  
}
