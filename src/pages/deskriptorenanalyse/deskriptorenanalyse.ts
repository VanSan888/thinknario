import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
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
  @ViewChild('canvasWhiteboard') public canvas3: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 300;

  private cx1: CanvasRenderingContext2D;
  private cx2: CanvasRenderingContext2D;
  //private cx3: CanvasRenderingContext2D;
  
  public downloadURL: any;

  
  
   constructor(public navCtrl: NavController, public alertCtrl: AlertController)
   {

   }
   
  ionViewDidLoad() {
    // get the context
    const canvasEl1: HTMLCanvasElement = this.canvas1.nativeElement;
    const canvasEl2: HTMLCanvasElement = this.canvas2.nativeElement;
	const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;
    this.cx1 = canvasEl1.getContext('2d');
    this.cx2 = canvasEl2.getContext('2d');
    //this.cx3 = canvasEl3.getContext('2d');	
	
	if ( this.cx1 == null || this.cx2 == null) {
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



    // set some default properties about the line
    this.cx1.lineWidth = 3;
    this.cx1.lineCap = 'round';
    this.cx1.strokeStyle = '#000';
    this.cx2.lineWidth = 3;
    this.cx2.lineCap = 'round';
    this.cx2.strokeStyle = '#000';	
	
    
    // we'll implement this method to start capturing mouse events
    this.captureEvents1(canvasEl1);
	this.captureEvents2(canvasEl2);
  }
  
  ionViewDidEnter () {
	 let storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid +'/').child('deskriptor1');
	 storageRef.getDownloadURL().then(function(url) {

     // Insert url into an <img> tag to "download"
	 /*
	 var img: HTMLImageElement = new Image;
     img.onload = function(){
     this.cx1.drawImage(img,0,0); // Or at whatever offset you like
     };
     img.src = url;*/
    });
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


private captureEvents1(canvasEl: HTMLCanvasElement) {
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

      this.drawOnCanvas1(prevPos, currentPos);
    });
}

private captureEvents2(canvasEl: HTMLCanvasElement) {
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

      this.drawOnCanvas2(prevPos, currentPos);
    });
}

  private drawOnCanvas1(
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number }
    ) {
      // incase the context is not set
      if (!this.cx1) { return; }

      // start our drawing path
      this.cx1.beginPath();

      // we're drawing lines so we need a previous position
      if (prevPos) {
      // sets the start point
      this.cx1.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx1.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx1.stroke();
      }
  }

  private drawOnCanvas2(
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number }
    ) {
      // incase the context is not set
      if (!this.cx2) { return; }

      // start our drawing path
      this.cx2.beginPath();

      // we're drawing lines so we need a previous position
      if (prevPos) {
      // sets the start point
      this.cx2.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx2.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx2.stroke();
      }
  } 
  
    clearCanvas1(){
        this.cx1.clearRect(0, 0, this.canvas1.nativeElement.width, this.canvas1.nativeElement.height);   
    }
	
    clearCanvas2(){
        this.cx2.clearRect(0, 0, this.canvas2.nativeElement.width, this.canvas2.nativeElement.height);   
    }

	
  uploadDeskriptoren(){
    let canvas1 = this.canvas1.nativeElement;
	canvas1.crossOrigin = "anonymous";
	let canvas2 = this.canvas2.nativeElement;
    var storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid);	
	canvas1.toBlob(blob => {
      var image = new Image();
	  image.crossOrigin="anonymous";
      image.src = blob;
      var uploadTask = storageRef.child("deskriptor1").put(blob);
    });
	canvas2.toBlob(blob => {
      var image = new Image();
      image.src = blob;
      var uploadTask = storageRef.child("deskriptor2").put(blob);
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

  
  uploadDeskriptoren2(){
    let canvas1 = this.canvas1.nativeElement;
	let dataURL = canvas1.toDataURL().substring(24);
    var storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid);	
    var uploadTask = storageRef.putString(dataURL, 'base64', {contentType:'image/jpg'}).then(function(snapshot) {
    console.log('Uploaded a base64 string!');
    });/*
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
    });*/
  }
  

  uploadDeskriptoren3(){
    let canvas1 = this.canvas1.nativeElement;
	let dataURL = canvas1.toDataURL();
    var storageRef = firebase.storage().ref().child(firebase.auth().currentUser.uid);	
    var uploadTask = storageRef.putString(dataURL.substring(24), 'base64', {contentType:'image/jpg'}).then(snapshot => {
    console.log('Uploaded a base64 string!');
    }).then(uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        this.downloadURL = uploadTask.snapshot.downloadURL;
    }));
	

  }
  
  downloadDeskriptoren() {
	/*let storageRef =  firebase.storage().ref().child(firebase.auth().currentUser.uid +'/').child('deskriptor1');
	storageRef.getDownloadURL().then(function(url) {	 
	this.downloadURL = url;
	});	*/
	this.downloadURL = 'https://firebasestorage.googleapis.com/v0/b/thinknario.appspot.com/o/BNgYN3kSbBcgVDFQ9aiVFYOONPH2%2Fdeskriptor1?alt=media&token=6b425a58-6347-4e83-a0df-e737a8d17e74'
    let canvas1 = this.canvas1.nativeElement;
	let ctx = canvas1.getContext('2d');
    var img = new Image();
	//img.crossOrigin = 'anonymous';
    img.src = this.downloadURL;
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
  }

  
}
