import { NotesProvider } from './../../providers/notes/notes';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoteId } from '../../interfaces/note';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public notesProvider: NotesProvider) {
  }

  ionViewDidLoad() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesProvider.fetchNotes().subscribe(
      notes => this.notes = notes
    );
  }

}
