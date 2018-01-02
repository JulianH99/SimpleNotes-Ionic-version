import { Observable } from 'rxjs/Observable';
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
  private trashedNotesCollection: AngularFirestoreCollection<Note>;
  private notes: Observable<NoteId[]>;
  private trashedNotes: Observable<NoteId[]>;

  constructor(private afs: AngularFirestore) {

    this.notesCollection = this.afs.collection<Note>('notes', ref =>
      ref.orderBy('created', "desc").where('trashed', '==', false));

    this.trashedNotesCollection = this.afs.collection<Note>('notes', ref =>
      ref.orderBy('created', 'desc').where('trashed', '==', true));


  }

  fetchNotes():  Observable<NoteId[]> {
    this.notes = this.notesCollection.snapshotChanges().map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Note;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })

    return this.notes;
  }

  fetchTrashedNotes(): Observable<NoteId[]> {
    this.trashedNotes = this.trashedNotesCollection.snapshotChanges().map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Note;
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      }
    )
    return this.trashedNotes;
  }

  addNote(note: Note): Promise<any> {
    return this.notesCollection.add(note);
  }

  deleteNote(id: string): Promise<any> {
    return this.notesCollection.doc(id).update({
      trashed: true
    });
  }

  unDeleteNote(id: string): Promise<any> {
    return this.trashedNotesCollection.doc(id).update({
      trashed: false
    });
  }

  fullDeleteNote(id: string): Promise<any> {
    return this.notesCollection.doc(id).delete();
  }

  editNote(note: Note, id: string): Promise<any> {
    return this.notesCollection.doc(id).update(note);
  }

  fetchNote(id: string): any {
    var doc = this.notesCollection.doc(id);

    doc.valueChanges().subscribe(
      data  => console.log(data)
    );

    return doc.valueChanges();
  }

}
