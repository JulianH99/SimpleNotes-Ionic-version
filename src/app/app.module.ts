import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';

import { MyApp } from './app.component';
import { NotesPage } from '../pages/notes/notes';
import { AddNotePage } from './../pages/add-note/add-note';
import { firebaseConfig } from './env';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotesProvider } from '../providers/notes/notes';

@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    AddNotePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    AddNotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotesProvider
  ]
})
export class AppModule {}
