import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NotesPage } from './../notes/notes';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

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
    public afAuth: AngularFireAuth, public toastCtrl: ToastController,
    public googlePlus: GooglePlus) {

  }

  goToHome(){
    this.navCtrl.setRoot(NotesPage);
  }

  logIn(){

    this.googlePlus.login({
      'webClientId':'542261871956-s1dl2000ssm8jhu3la8polpj2dlb909j.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(res.idToken)
      ).then(auth => this.goToHome())
    });

    /*this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
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
      */
  }

}
