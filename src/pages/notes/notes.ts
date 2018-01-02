import { NotesProvider } from './../../providers/notes/notes';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoteId } from '../../interfaces/note';
import { AddNotePage } from '../add-note/add-note';
import { IntroPage } from './../intro/intro';
import { Storage } from '@ionic/storage';

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
    public notesProvider: NotesProvider, public storage: Storage) {


  }

  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if(!done){
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage)
      }
    })
    this.fetchNotes();

  }

  fetchNotes() {
    this.notesProvider.fetchNotes().subscribe(
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
