import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { IonicStorageModule } from '@ionic/storage';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlus } from '@ionic-native/google-plus';

import { MyApp } from './app.component';
import { NotesPage } from '../pages/notes/notes';
import { AddNotePage } from './../pages/add-note/add-note';
import { TrashedNotesPage } from './../pages/trashed-notes/trashed-notes';
import { IntroPage } from './../pages/intro/intro';
import { firebaseConfig } from './env';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotesProvider } from '../providers/notes/notes';

@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    AddNotePage,
    TrashedNotesPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DirectivesModule,
    TooltipsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    AddNotePage,
    TrashedNotesPage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesProvider,
    GooglePlus
  ]
})
export class AppModule {}
