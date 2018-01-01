import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Note, NoteId } from '../../interfaces/note';
/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesProvider {

  private notesCollection: AngularFirestoreCollection<Note>;
  private notes: Observable<NoteId[]>;

  constructor(private afs: AngularFirestore) {

    this.notesCollection = this.afs.collection<Note>('notes', ref =>
      ref.orderBy('created').where('trashed', '==', false));

    this.notes = this.notesCollection.snapshotChanges().map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Note;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })

  }

  fetchNotes():  Observable<NoteId[]> {
    return this.notes;
  }

  addNote(note: Note): Promise<any> {
    return this.notesCollection.add(note);
  }

  deleteNote(id: string): Promise<any> {
    return this.notesCollection.doc(id).update({
      trashed: true
    });
  }

  fullDeleteNote(id: string): Promise<any> {
    return this.notesCollection.doc(id).delete();
  }

  editNote(note: Note, id: string): Promise<any> {
    return this.notesCollection.doc(id).update(note);
  }

  fetchNote(id: string): Observable<NoteId> {
    var doc = this.notesCollection.doc(id);
    var data: any;
    doc.valueChanges().subscribe(data => data = data)

    return of({...data, id: id});
  }

}
