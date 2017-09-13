import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { SzenarioProvider } from '../providers/szenario/szenario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  zone: NgZone;

  public hideHome: boolean = true;
  public hideBenachrichtigungen: boolean = true;
  public hideBewertungen: boolean = true;




  pages: Array<{title: string, component: any, hidden: boolean}>;

  constructor(
  
    public platform: Platform,
	  public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public szenarioProvider: SzenarioProvider) {

    this.initializeApp();
	  //firebase Initialisierung und 
	  firebase.initializeApp({
	  //firebase-Konfiguration
      apiKey: "AIzaSyBY6OTviwlRvdO7Pa6nhgHSHmAGE91klNM",
      authDomain: "thinknario.firebaseapp.com",
      databaseURL: "https://thinknario.firebaseio.com",
      storageBucket: "thinknario.appspot.com",
      messagingSenderId: "320520092415"
    });
    
    //NgZone lässt den folgenden Code außerhalb von Angular laufen
	  this.zone = new NgZone({});
	  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      //zone.run startet den Code außerhalb von Angular.
      this.zone.run(() => {
        //Wenn kein Nutzer authentifiziert ist, zu LogInPage
        if (!user) {
          this.rootPage = 'LogInPage';
          unsubscribe();
	      //Wenn ein Nutzer authentifiziert ist, bleibe auf der Page, auf der du bist
        } else {
          unsubscribe();
        }
      });     
    });
    this.szenarioProvider.checkPath("average").then((result: boolean) => {
	    //Wenn in dem Pfad Daten hinterlegt sind, dann...
      if(result === true) {    
        this.hideHome = false;
        this.hideBenachrichtigungen = false;
        this.hideBewertungen = false;
      } else {
          this.rootPage = 'MeinSzenarioPage';
      }
    }).then( result => {
      // used for ngFor and navigation
      this.pages = [
        { title: 'Home', component: 'HomePage', hidden: this.hideHome },
        { title: 'Benachrichtigungen und Statistik', component: 'BenachrichtigungenPage', hidden: this.hideBenachrichtigungen },
	      { title: 'Fallstudie', component: 'FallstudiePage', hidden: false },
	      { title: 'Mein Szenario', component: 'MeinSzenarioPage', hidden: false },
	      { title: 'Bewertungen', component: 'BewertungenPage', hidden: this.hideBewertungen },
	      { title: 'Profileinstellungen', component: 'EinstellungenPage', hidden: false },
	      { title: 'Über', component: 'UeberPage', hidden: false }
      ];
    });
  }

  //App initiieren	
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    //Navigation aus dem SideMenu zu den einzelnen Seiten
    this.nav.setRoot(page.component);
  }
  

  
}

