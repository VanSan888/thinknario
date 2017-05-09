import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  zone: NgZone;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
	public statusBar: StatusBar,
	public splashScreen: SplashScreen) {
    this.initializeApp();
	firebase.initializeApp({
      apiKey: "AIzaSyBY6OTviwlRvdO7Pa6nhgHSHmAGE91klNM",
      authDomain: "thinknario.firebaseapp.com",
      databaseURL: "https://thinknario.firebaseio.com",
      storageBucket: "thinknario.appspot.com",
      messagingSenderId: "320520092415"
    });

	this.zone = new NgZone({});

	const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
     this.zone.run( () => {
	   //hier dann die Funktion einbauen, die den user
	   //an die Stelle weiterleitet, an der er sein Szenario weiter machen soll
       if (!user) {
         this.rootPage = 'LogInPage';
         unsubscribe();
       } else { 
       this.rootPage = 'HomePage';
         unsubscribe();
    }
  });     
});


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Benachrichtigungen', component: 'BenachrichtigungenPage' },
	  { title: 'Fallstudie', component: 'FallstudiePage' },
	  { title: 'Mein Szenario', component: 'MeinSzenarioPage' },
	  { title: 'Bewertungen', component: 'BewertungenPage' },
	  { title: 'Einstellungen', component: 'EinstellungenPage' },
	  { title: 'Über', component: 'UeberPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  

  
}

