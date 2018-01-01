export interface Note {
  title?: string;
  content: string;
};


export interface NoteId extends Note{
  id: string;
};
