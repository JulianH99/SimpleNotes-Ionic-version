import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NotesPage } from './../notes/notes';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth, public toastCtrl: ToastController) {

  }

  goToHome(){
    this.navCtrl.setRoot(NotesPage);
  }

  logIn(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        auth => {
          this.goToHome();
        }
      )
      .catch(
        err => {
          let toast = this.toastCtrl.create({
            message: err.message,
            showCloseButton: true,
            closeButtonText: 'OK'
          });

          toast.present()
        }
      );
  }

}
