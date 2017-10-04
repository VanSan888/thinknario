//Viewchild und ElementRef werden benötigt, um die Canvas mittels JavaScript zu beeinflussen
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController,
         ToastController, Loading,  LoadingController, reorderArray } from 'ionic-angular';
//Das Obervable und die anderen rxjs Komponenten werden für das Zeichnen auf dem Canvas benötigt.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/fromEvent';
//DomSanitizer und SafeRecourceUrl werden benötigt, um die Youtube-Videos einzubetten und dabei
//die Sicherheit zu gewährleisten
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { SzenarioProvider } from '../../providers/szenario/szenario';

//Für Canvas aus nmp:
import { ViewEncapsulation } from '@angular/core';
import { CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
//Alte Ideen müssen in dieser Datei, in der dazugehörigen .hmtl module.ts und in app.module bereinigt werden


@IonicPage()
@Component({
  selector: 'page-deskriptorenanalyse',  
  templateUrl: 'deskriptorenanalyse.html',
  //Rahmen rund um die Canvas
  styles: ['canvas { border: 1px solid #000; }'],
  encapsulation: ViewEncapsulation.None 
})
export class DeskriptorenanalysePage {

//Notwendig um den Ladezustand anzuzeigen
public loading: Loading;

//Url-Variablen für die Youtube-Videos
public safeURL1: SafeResourceUrl;
public safeURL2: SafeResourceUrl;
public safeURL3: SafeResourceUrl;
public safeURL4: SafeResourceUrl;

//Wird benötigt, um die Hilfe-Videos ein- und auszublenden
public toggleHilfe: boolean = false;

//Referenzen zu den Canvas aus dem Template
@ViewChild('canvas1') public canvas1: ElementRef;
@ViewChild('canvas2') public canvas2: ElementRef;
@ViewChild('canvas3') public canvas3: ElementRef;

//@ViewChild('nameOfRef') canvasWhiteboard: CanvasWhiteboardComponent;

// Variablen für die Höhe und Breite der Canvas
@Input() public width = 400;
@Input() public height = 300;

//Deklarierung der Kontext-Variablen der Canvas
private cx1: CanvasRenderingContext2D;
private cx2: CanvasRenderingContext2D;
private cx3: CanvasRenderingContext2D;

//private cx3: CanvasRenderingContext2D;

//Variablen zum hoch- und runterladen der Schlüsselfaktoren. Wird benötigt, um nur
//die Schlüsselfaktoren anzuzeigen, die der User auch ausgewählt hat
public szenarioData: any;
public schluesselfaktor1: boolean = false;
public schluesselfaktor2: boolean = false;
public schluesselfaktor3: boolean = false;
public schluesselfaktor4: boolean = false;
public schluesselfaktor5: boolean = false;
public schluesselfaktor6: boolean = false;

//Variablen zum hoch- und runterladen der Start- und Endzeitpunkte der Szenarien
public timeScale: string;
public startSzenario: any = "";
public endSzenario:   any = "";

//Variablen, um den Kunden besser durch den Prozess zu leiten.
//Werden benötigt, um DOM-Elemente ein- und auszublenden
public hideDeskriptoren: boolean;
public hideStartEnd: boolean = true;

//Array zum sortieren der Schlüsselfaktoren
factors: Array<{show: boolean, name: string}>;


constructor(public navCtrl: NavController,
            public alertCtrl: AlertController,
            public szenarioProvider: SzenarioProvider,
            private _sanitizer: DomSanitizer,
            public loadingCtrl: LoadingController,
            public toastCtrl: ToastController,){
    //Festlegen der Youtube-URLs
    let videoURL1 = "https://www.youtube.com/embed/ilVnDcQUra0";
    //mit Hilfe der bypassSecurityTrustResourceUrl() Funktion wird die Sicherheit der
    //Youtube-URLs sichergestellt und auf eine neue Variable geschrieben (3 mal sehr ähnlich)
    this.safeURL1 = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL1);
    let videoURL2 = "https://www.youtube.com/embed/PAsEDOFKUfI";
    this.safeURL2 = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL2);
    let videoURL3 = "https://www.youtube.com/embed/v4yZ58aTVoI";
    this.safeURL3 = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL3);
  }
  
  //Frühester Lifecyclehook, um den Loadingcontroller anzuzeigen
  ionViewWillEnter(){
    //Erstellung des SVG Elements
    this.loading = this.loadingCtrl.create({
    //Anzuzeigender Text
    content: 'Bitte warten...'
    });
    //Anzeige des Loaders
    this.loading.present();
  }


  //Lifecyclehook, der besonders für das Festlegen von DOM-Elementen geeignet ist.
  ionViewDidLoad() {
    // Den Kontext der Canvas festlegen
    const canvasEl1: HTMLCanvasElement = this.canvas1.nativeElement;
    const canvasEl2: HTMLCanvasElement = this.canvas2.nativeElement;
    const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;

	  //const canvasEl3: HTMLCanvasElement = this.canvas3.nativeElement;
    //Kontext wird auf 2d festgelegt.
    this.cx1 = canvasEl1.getContext('2d');
    this.cx2 = canvasEl2.getContext('2d');
    this.cx3 = canvasEl3.getContext('2d');

    //this.cx3 =  this.canvasWhiteboard.canvas.nativeElement.getContext('2d');	
	 
    //Fehlermeldung, wenn das verwendete System HTML5 Canvas nicht unterstützt.
	  if( this.cx1 == null || this.cx2 == null || this.cx3 == null) {
      let alert = this.alertCtrl.create({
        title: 'Keine Unterstützung',
        subTitle: 'Ihr System unterstützt diese Funktion nicht. Bitte updaten Sie ihr System',
        buttons: ['Abbrechen']
      });
      alert.present();	
	}
	
    // Festlegen der Höhe und Breite der Canvas
    canvasEl1.width  = this.width;
    canvasEl1.height = this.height;
    canvasEl2.width  = this.width;
    canvasEl2.height = this.height;
    canvasEl3.width  = this.width;
    canvasEl3.height = this.height;

	  //this.canvasWhiteboard.canvas.width = this.width;
    //this.canvasWhiteboard.canvas.height = this.height;


    // Einstellungen für die Linienstärke, -farbe und -form, wie auf dem Canvas erscheinen soll
    this.cx1.lineWidth = 3;
    this.cx1.lineCap = 'round';
    this.cx1.strokeStyle = '#000';
    this.cx2.lineWidth = 3;
    this.cx2.lineCap = 'round';
    this.cx2.strokeStyle = '#000';
    this.cx3.lineWidth = 3;
    this.cx3.lineCap = 'round';
    this.cx3.strokeStyle = '#000';
    
    // Methode, um die Mausevents einzufangen
    this.captureEvents(canvasEl1, this.cx1);
	  this.captureEvents(canvasEl2, this.cx2);
    this.captureEvents(canvasEl3, this.cx3);
  }

  ionViewDidEnter () {
    //Diese Funktion wird benötigt, um beim ersten Aufruf der DeskriptorenanalysePage keinen Fehler
    //zu erzeugen. Theoretisch kannm an diese Funktion auch benutzen, um die gleiche Funktion, wie bei
    //szenarioProvider.checkPath() herzustellen, aber ich habe es nicht richtig hinbekommen.
    this.szenarioProvider.checkDeskriptorPath().then((result: any) => {
     if(result) {}
    });
    //Die Daten für die Schlüsselfaktoren sind definitv schon vorhanden, deswegen muss nicht zuerst
    //kontrolliert werden, ob sie schon da sind.
    this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
      this.szenarioData = szenarioSnap;
      this.schluesselfaktor1 = this.szenarioData.schluesselfaktoren.schluesselfaktor1;
	    this.schluesselfaktor2 = this.szenarioData.schluesselfaktoren.schluesselfaktor2;
      this.schluesselfaktor3 = this.szenarioData.schluesselfaktoren.schluesselfaktor3;
      this.schluesselfaktor4 = this.szenarioData.schluesselfaktoren.schluesselfaktor4;
      this.schluesselfaktor5 = this.szenarioData.schluesselfaktoren.schluesselfaktor5;
		  this.schluesselfaktor6 = this.szenarioData.schluesselfaktoren.schluesselfaktor6;
      this.factors           = this.szenarioData.schluesselfaktoren.orderedfactors;
      });
    //Siehe Erklärung bei AnnahmenPage
    this.szenarioProvider.checkPath("deskriptorenanalyse").then((result: boolean) => {
      if(result === true) {	
        this.szenarioProvider.getSzenarioData().then( szenarioSnap => {
          this.szenarioData  = szenarioSnap;
          this.timeScale     = this.szenarioData.deskriptorenanalyse.timeScale;
          this.startSzenario = this.szenarioData.deskriptorenanalyse.startSzenario;
          this.endSzenario   = this.szenarioData.deskriptorenanalyse.endSzenario;	
	    });
    
    //Deskriptoren werden angezeigt, wenn Daten im Pfad "deskriptorenanalyse" hinterlegt sind.
    //Andere HTML-Elemente werden ausgeblendet (siehe deskriptorenanalyse.html)
    this.hideDeskriptoren = true;
    this.hideStartEnd = true;
    
    //Aufruf der getDeskriptorURL() Funktion im SzenarioProvider.
    //6 mal, alle sehr ähnlich
    this.szenarioProvider.getDeskriptorURL('deskriptor1').then(url => {
      //Festlegen des Kontext
      let canvas1 = this.canvas1.nativeElement;
	    let ctx = canvas1.getContext('2d');
      //Aufruf eines neuen Bildes (Image)
      var img = new Image();
      //Festlegen der CrossOrigin property. Ohne, wären die Sicherheitsbedingungen nicht erfüllt.
      //Das Canvas wäre damit "tainted" und kann dadurch nicht mehr hochgeladen werden.
      //'anonymous' beseitigt dieses Problem
	    img.crossOrigin = 'anonymous';
      //Festelgen der Bildquelle (aus firebase)
      img.src = url;
      //Beschreiben des Canvas mit dem Bild aus firebase
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });


    this.szenarioProvider.getDeskriptorURL('deskriptor2').then(url => {
      let canvas2 = this.canvas2.nativeElement;
	    let ctx = canvas2.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0);
      };
    });
    this.szenarioProvider.getDeskriptorURL('deskriptor3').then(url => {
      let canvas3 = this.canvas3.nativeElement;
	    let ctx = canvas3.getContext('2d');
      var img = new Image();
	    img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
    });

    // Wenn keine Daten in dem abgefragten Pfad hinterlegt sind, dann ...
    } else {
       //Zeige leite den User durch die Deskriptorenanalyse (siehe deskriptorenanalyse.html)
       this.hideDeskriptoren = false;
       this.hideStartEnd = false;
       this.toggleHilfe = true;     
       //... beschreibe den Pfad mit Dummidaten.
       this.szenarioProvider.updateStartEnd(this.startSzenario, this.endSzenario);

	   }
	  }).then( loading => {
    //Wenn alle Inhalte geladen sind, soll der Loader ausgeblendet werden.
    this.loading.dismiss();
    });
  }


//Alert: siehe title und subtitle zur Erklärung
showStartEnd(){
  let alert = this.alertCtrl.create({
    title: 'Start und Ende ihres Szenarios',
    subTitle: 'Wann soll Ihre Aktivität starten? Wann soll Sie enden? Bitte wählen Sie die entsprechenden Zeiten aus!',
    buttons: ['Weiter']
      });
      alert.present();  
  //Anzeige der ion-datetime zu Auswahl der Start- und Endzeitpunkte
  this.hideStartEnd = true;
  //Hilfen werden ausgeblendet
  this.toggleHilfe = false;
}


//Anzeige der Deskriptoren
showDeskriptoren() {
  let toast = this.toastCtrl.create({
    message: 'Nun geht das darum, Ihre Schlüsselfaktoren über den Verlauf Ihrer Aktivität zu beschreiben.',
    position: 'middle',
    showCloseButton: true,
    closeButtonText: 'Weiter',
  });
  //Wenn auf 'Weiter' geklickt wird, wird Toast2 aufgerufen.
  toast.onDidDismiss(() => {
  });
  toast.present();
  this.hideDeskriptoren = true;
}


updateTimeScale(scala){
  this.timeScale = scala;
  this.szenarioProvider.updateTimeScale(this.timeScale);
}

//Aufruf der updateStartEnd() Funktion im SzenarioProvider
updateStartEnd(startSzenario, endSzenario) {
  this.szenarioProvider.updateStartEnd(startSzenario, endSzenario);
  
  //Wenn die Start- und Endzeitpunkte verändert werden, müssen auch die x-Achsen
  //der Canvas neu bezeichnet werden. Deswegen wird hier die drawCoordinates Funktion
  //für jedes der Canvas aufgerufen. Es werden die Daten für x- und y-Achse übergeben
  this.drawCoordinates(this.cx1, "Gefühltes Gewicht");
  this.drawCoordinates(this.cx2, "Wichtigkeit des Tragekomforts");
  this.drawCoordinates(this.cx3, "Wichtigkeit der Funktionalität");
}

//Funktion, um die Koordinatensysteme der Canvas zu zeichnen und zu aktualisieren.
//(Auch, wenn der Kunde neue Start und Endzeitpunkte auswählt)  
drawCoordinates(ctx: CanvasRenderingContext2D, yText: string) {
  //Linienstärke
  ctx.lineWidth = 3;
  //Linienform
  ctx.lineCap = 'round';
  //Linienfarbe (schwarz)
  ctx.strokeStyle = '#000';
  //Es wird ein Pfad für eine Zeichnung begonnen.
  ctx.beginPath();
  //Der "Stift" wird an eine Position gesetzt
  ctx.moveTo(30,30);
  //Festlegen der Linie für die  y-Achse
  ctx.lineTo(30,270);
  //Festlegen der Linie für die  x-Achse
  ctx.lineTo(370,270);
  //Zeichnen der Linien
  ctx.stroke();
  //Festlegen der Schriftart für die Achsenbezeichnung
  ctx.font = '20px serif';
  //Zurücksetzen der x-Achsenbeschriftung
  ctx.clearRect(0, 275, 400, 30);
  //Zeichnen der Start- und Endzeitpunkte
  ctx.fillText(this.startSzenario, 30, 290);  
  ctx.fillText(this.endSzenario, 340, 290);
  //Speichern des Bezugssystems des Canvas
  ctx.save();
  //Zurücksetzen der x-Achsenbeschriftung
  ctx.clearRect(0, 0, 27, 270);
  //Festlegen eines neues Ursprungs für das Bezugssystem
  ctx.translate(0, 300);
  //Drehen des Bezugssystems
  ctx.rotate(-Math.PI/2);
  //Festlegen des Schriftbezuges
  ctx.textAlign = "center";
  //Zeichnen und ausfüllen des Textes
  ctx.fillText(yText, 170, 25);
  //Wiederherstellen des ursprünglichen Bezugssystems
  ctx.restore();
}

 
//Funktionen für das npm canas
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


//Diese Funktion fängt Maus-Events ein. Sie wird benötigt, um auf dem Canvas zu zeichnen,
//sobald die linke Maustaste gedrückt wird und solange sie nicht losgelassen wird.
private captureEvents(canvasEl: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  Observable
    //Einfangen aller 'mousedown' Events des entsprechenden Canvas-Elements
    .fromEvent(canvasEl, 'mousedown')
    .switchMap((e) => {
      return Observable
        //Nach mousedown, werden alle Mausbewegungen aufgezeichnet
        .fromEvent(canvasEl, 'mousemove')
        //Stoppen und unsubscriben, sobald der User die Maustaste loslässt
        // Das löst das mouseup Event aus
        .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
        //pairwise() gruppiert aufeinanderfolgende Werte und gibt diese als
        //Array wieder aus.
        .pairwise()
    })
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();     
      //Vorherige und aktuelle Position mit offset
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };
      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };
      //Aufruf der drawOnCanvas Methode zum tatsächlichen Zeichnen der Linie
      this.drawOnCanvas(prevPos, currentPos, ctx);
    });
}

  //Funktion zum tatsächlcihen Zeichen auf dem Canvas Element. 
  //Benötigt aktuelle und vorherige position, sowie den Kontext des zu bemalenden Canvas
  private drawOnCanvas(
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number },
    ctx: CanvasRenderingContext2D
    ) {
      // Wenn der Kontext nicht festgelegt ist
      if (!ctx) { return; }

      // Start des Zeichenpfades
      ctx.beginPath();

      // Man zeichnet eine Linie, also braucht man eine vorherige Position
      if (prevPos) {
      // Den Startpunkt setzen
      ctx.moveTo(prevPos.x, prevPos.y); // von hier wird

      // eine Linie zur aktuellen Position gezeichnet
      ctx.lineTo(currentPos.x, currentPos.y);

      // Ausfüllen des Pfades mit den Eigenschaften die vorher festgelegt wurden
      ctx.stroke();
      }
  }
  
  //Funktion, um das Canvas Element zurück zu setzen. Benötigt den Kontext und den
  //Text für die y-Achse
  clearCanvas(ctx: CanvasRenderingContext2D, yText: string){
      //Zurückstezen des ausgewählten Canvas
      ctx.clearRect(0, 0, this.width, this.height);
      //Aufruf der drawCoordinates() Funktion, um das Koordinatensystem wieder herzustellen
      this.drawCoordinates(ctx, yText);
  }
  
  //Funktion des Buttons (Zurücksstzen) für das erste bis sechste Canvas.
  clearCanvas1(){
    this.clearCanvas(this.cx1, "Gefühltes Gewicht");
  }
  clearCanvas2(){
    this.clearCanvas(this.cx2, "Wichtigkeit des Tragekomforts");
  }
  clearCanvas3(){
    this.clearCanvas(this.cx3, "Wichtigkeit der Funktionalität");
  }

	
  //Funktion, um auf dem Canvas zu zeichen. benötigt den Kontext des Canvas
  drawCanvas(ctx : CanvasRenderingContext2D){
    //Strichstärke
    ctx.lineWidth = 3;
    //Strichform
    ctx.lineCap = 'round';
    //Strichfarbe(schwarz)
    ctx.strokeStyle = '#000';	  
  }
  //Funktion des Buttons (Zeichnen) für das erste bis sechste Canvas.
  drawCanvas1(){
    this.drawCanvas(this.cx1)
  }
  drawCanvas2(){
    this.drawCanvas(this.cx2)
  }
  drawCanvas3(){
    this.drawCanvas(this.cx3)
  }

  //Funktion, um zu radieren (malen in weiß). Siehe drawCanvas
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
  
  /*Funktion zum ordnen der Schlüsselfaktoren
  reorderItems(indexes) {
    let element = this.factors[indexes.from];
    this.factors.splice(indexes.from, 1);
    this.factors.splice(indexes.to, 0, element);
    let test = indexes.to;
  }
  */

  reorderItems(indexes) {
    this.factors = reorderArray(this.factors, indexes);
    this.szenarioProvider.updateOrderedFactors(this.factors);
  }

  goToAnnahmenPage(){
      this.navCtrl.push('AnnahmenPage');
  }
  

  //Lifecyclehook, wenn die Seite verlassen wird. Sinnvoll, um Canvas hochzuladen.
  ionViewWillLeave(){
    //Es wird ein Loader angezeigt, solange die Inhalte hochgeladen werden.
    this.loading = this.loadingCtrl.create({
    content: 'Bitte warten...'
    });

    this.loading.present();
    //Festlegen der Kontexte
    let canvas1 = this.canvas1.nativeElement;
	  let canvas2 = this.canvas2.nativeElement;
	  let canvas3 = this.canvas3.nativeElement;
    
    //Sechs mal Funktion, um canvas in blob umzuwandeln.
    //Nur so kann Firebase die Daten speichern. Als reines Canvas ist dies nicht möglich
	  canvas1.toBlob(blob => {
      //Neue Variable vom Typ Image.
      var image = new Image();
      //Festlegen der CrossOrigin property. Ohne, wären die Sicherheitsbedingungen nicht erfüllt.
      //Das Canvas wäre ansonsten "tainted" und könnte somit nach dem Herunterladen und neu bezeichnen
      //nicht wieder hochgeladen werden.
      //'anonymous' beseitigt dieses Problem
	    image.crossOrigin="anonymous";
      //Festlegen der Quelle des Image
      image.src = blob;
      //Aufruf der uploadDeskriptor() Funktion im SzenarioProvider.
      //Übergabe des blobs und des zu beschreibenden Pfades im firebase Storage.
      this.szenarioProvider.uploadDeskriptor(blob, 'deskriptor1');
    });    
	  canvas2.toBlob(blob => {
      var image = new Image();
	    image.crossOrigin="anonymous";
      image.src = blob;
      this.szenarioProvider.uploadDeskriptor(blob, 'deskriptor2');
    });
	  canvas3.toBlob(blob => {
      var image = new Image();
	    image.crossOrigin="anonymous";
      image.src = blob;
      this.szenarioProvider.uploadDeskriptor(blob, 'deskriptor3');
    });
    //Wenn alle Inhalte hochgeladen sind, soll der Loader wieder verschwinden.
    this.loading.dismiss();
  }
}
