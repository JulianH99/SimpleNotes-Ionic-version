import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoteId } from '../../interfaces/note';
import { AddNotePage } from '../add-note/add-note';
import { Storage } from '@ionic/storage';
import { IntroPage } from './../intro/intro';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotesProvider } from './../../providers/notes/notes';
import { LoadingController } from 'ionic-angular';

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
  public selectedNotes: Array<string> = [];

  constructor(public navCtrl: NavController,
    public notesProvider: NotesProvider, public storage: Storage,
    public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

    this.storage.get('intro-done').then(done => {
      if(!done){
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage)
      }
    })
  }

  ionViewDidEnter(){


    this.afAuth.authState.subscribe(
      user => {
        this.notesProvider.setUser(user.email);
        this.fetchNotes();

      }
    )
  }

  fetchNotes() {

    var loading: any;
    if(!this.notes){
      loading = this.loadingCtrl.create({content:'Loading notes...'});
      loading.present();
    }

    this.notesProvider.fetchNotes().subscribe(
      notes => {
        if(!this.notes)
          loading.dismiss()
        this.notes = notes;

      }
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

  deselectAll() {
    this.selectedNotes.splice(0, this.selectedNotes.length)
  }

  select(noteId: string) {

    if(this.selectedNotes.indexOf(noteId) != -1){
      this.selectedNotes.splice(this.selectedNotes.indexOf(noteId), 1);
      return;
    }
    this.selectedNotes.push(noteId);
  }

  selected(id: string): boolean {
    return this.selectedNotes.indexOf(id) != -1;
  }

  deleteSelected() {

    this.selectedNotes.forEach(note => this.deleteNote(note));

  }

}
