import { INote } from "../utils/constants";

interface NoteProps {
    note: INote;
    onDelete: (id: number) => void;
}

export default function Note({ note, onDelete }: NoteProps) {

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.content}</p>
        <p className="text-muted small">{new Date(note.updated_at).toLocaleDateString()}</p>
      </div>
      <div className="cart-footer">
        <button className="btn btn-danger" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}
