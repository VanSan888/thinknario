import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//provider import
import { AuthData } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { SzenarioProvider } from '../providers/szenario/szenario';
//Validator Import
import { SzenarioValidator } from '../validators/szenarioValidator';
//Optional für Handykamera
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    MyApp,	
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	FormsModule,
	HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    EventProvider,
    ProfileProvider,
	//Optional für Handycamera
	Camera,
    SzenarioProvider,
	SzenarioValidator
  ]
})
export class AppModule {}
