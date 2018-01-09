import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { NotesProvider } from './../../providers/notes/notes';
import { NoteId } from './../../interfaces/note';

/**
 * Generated class for the TrashedNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-trashed-notes',
  templateUrl: 'trashed-notes.html',
})
export class TrashedNotesPage {

  public notes: NoteId[];

  constructor(public navCtrl: NavController,
    public notesProvider: NotesProvider,
    public loadingCtrl: LoadingController) {
      //this.fetchNotes();
  }

  fetchNotes() {

    var loading: any;
    if(!this.notes){
      loading = this.loadingCtrl.create({content: 'Loading notes...'})
      loading.present();
    }
    this.notesProvider.fetchTrashedNotes().subscribe(
      notes => {
        if(!this.notes)
          loading.dismiss();
        this.notes = notes;
      }
    );

  }

  undeleteNote(id: string) {
    this.notesProvider.unDeleteNote(id).then(
      result => this.fetchNotes()
    );
  }

  deleteNote(id: string) {
    this.notesProvider.fullDeleteNote(id).then(
      result => this.fetchNotes()
    );
  }

  undeleteAll() {
    this.notes.forEach(
      note => this.notesProvider.unDeleteNote(note.id)
    );

    this.fetchNotes();

  }

  deleteAll() {
    this.notes.forEach(
      note => this.notesProvider.fullDeleteNote(note.id)
    );
  }


  ionViewDidLoad() {
    this.fetchNotes()
  }

}
