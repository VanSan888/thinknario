import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

//provider Import
import { AuthData } from '../providers/auth/auth';
import { BibliothekProvider } from '../providers/bibliothek/bibliothek';
import { ProfileProvider } from '../providers/profile/profile';
import { SzenarioProvider } from '../providers/szenario/szenario';
import { RatingProvider } from '../providers/rating/rating';

//Validator Import
import { SzenarioValidator } from '../validators/szenarioValidator';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	  FormsModule,
	  HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    BibliothekProvider,
    ProfileProvider,
  	SzenarioProvider,
	  RatingProvider,
	  SzenarioValidator,
 
  ]
})
export class AppModule {}
