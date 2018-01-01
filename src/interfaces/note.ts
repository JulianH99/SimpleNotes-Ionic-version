export interface Note {
  title?: string;
  content: string;
  created?: Date;
  trashed?: boolean;
};


export interface NoteId extends Note{
  id: string;
};
