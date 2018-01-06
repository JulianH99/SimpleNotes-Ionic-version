import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoteId } from '../../interfaces/note';
import { AddNotePage } from '../add-note/add-note';
import { Storage } from '@ionic/storage';
import { IntroPage } from './../intro/intro';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotesProvider } from './../../providers/notes/notes';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  public notes: NoteId[];
  private userEmail: string;

  constructor(public navCtrl: NavController,
    public notesProvider: NotesProvider, public storage: Storage,
    public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if(!done){
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage)
      }
    })
    console.log('load');


  }

  ionViewDidEnter(){
    this.afAuth.authState.subscribe(
      user => {
        this.userEmail = user.email;
        this.fetchNotes();
      }
    )

  }

  fetchNotes() {
    this.notesProvider.fetchNotes(this.userEmail).subscribe(
      notes => this.notes = notes
    );
  }

  goToAdd() {
    this.navCtrl.push(AddNotePage)
  }

  goToDetail(id: string) {
    this.navCtrl.push(AddNotePage, {
      id: id
    });
  }

  deleteNote(id: string) {
    this.notesProvider.deleteNote(id).then(
      result => this.fetchNotes()
    );
  }

}
