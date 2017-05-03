import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BenachrichtigungenPage } from '../pages/benachrichtigungen/benachrichtigungen';
import { FallstudiePage } from '../pages/fallstudie/fallstudie';
import { MeinSzenarioPage } from '../pages/meinSzenario/meinSzenario';
import { BewertungenPage } from '../pages/bewertungen/bewertungen';
import { EinstellungenPage } from '../pages/einstellungen/einstellungen';
import { UeberPage } from '../pages/ueber/ueber';
import { LogInPage } from '../pages/log-in/log-in';
import { ProblemfeldPage } from '../pages/problemfeld/problemfeld';
import { ProblemdefinitionPage } from '../pages/problemdefinition/problemdefinition';
import { SchluesselfaktorenPage } from '../pages/schluesselfaktoren/schluesselfaktoren';
import { DeskriptorenanalysePage } from '../pages/deskriptorenanalyse/deskriptorenanalyse';
import { AnnahmenPage } from '../pages/annahmen/annahmen';
import { RandbedingungenPage } from '../pages/randbedingungen/randbedingungen';
import { EreignissePage } from '../pages/ereignisse/ereignisse';
import { SzenarioerstellungPage } from '../pages/szenarioerstellung/szenarioerstellung';
import { SzenariobewertungPage } from '../pages/szenariobewertung/szenariobewertung';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BenachrichtigungenPage,
	FallstudiePage,
	MeinSzenarioPage,
	BewertungenPage,
	EinstellungenPage,
	UeberPage,
	LogInPage,
	ProblemfeldPage,
	ProblemdefinitionPage,
	DeskriptorenanalysePage,
	SchluesselfaktorenPage,
	AnnahmenPage,
	RandbedingungenPage,
	EreignissePage,
	SzenarioerstellungPage,
	SzenariobewertungPage
	
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BenachrichtigungenPage,
	FallstudiePage,
	MeinSzenarioPage,
	BewertungenPage,
	EinstellungenPage,
	UeberPage,
	LogInPage,
	ProblemfeldPage,
	ProblemdefinitionPage,
	DeskriptorenanalysePage,
	SchluesselfaktorenPage,
	AnnahmenPage,
	RandbedingungenPage,
	EreignissePage,
	SzenarioerstellungPage,
	SzenariobewertungPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
