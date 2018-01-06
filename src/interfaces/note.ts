export interface Note {
  title?: string;
  content: string;
  created?: Date;
  trashed?: boolean;
  user?: string;
};


export interface NoteId extends Note{
  id: string;
};
