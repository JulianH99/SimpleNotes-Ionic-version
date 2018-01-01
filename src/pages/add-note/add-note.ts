import { Note } from './../../interfaces/note';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesProvider } from './../../providers/notes/notes';
import { Note } from '../../interfaces/note';


/**
 * Generated class for the AddNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html',
})
export class AddNotePage {

  public note: Note;
  public id: string

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public notesProvider: NotesProvider) {

      if((this.id = this.navParams.get('id'))){
        this.notesProvider.fetchNote(this.id).subscribe(
          note => this.note = note
        );
      }else{
        this.note ={
          title: '',
          content: '',
          created: new Date(),
          trashed: false
        }
      }

      console.log(this.note);

  }

  ionViewDidLoad() {

  }

  addNote() {
    if(this.note.content){
      this.notesProvider.addNote(this.note).then(
        result => this.navCtrl.pop()
      )
    }
  }

  updateNote() {

    if(this.note.content){
      this.notesProvider.editNote(this.note, this.id).then(
        result => this.navCtrl.pop()
      );
    }

  }

}
