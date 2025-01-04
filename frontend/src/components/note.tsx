import { useState, useEffect } from "react";
import { INote } from "../utils/constants";
import { AxiosError } from "axios";
import "../styles/note-card.css";
import api from "../utils/api";

interface NoteProps {
  note: INote;
  onDelete: (id: number) => void;
  onError?: (error: string) => void;
  onMouseEnter?: (noteId: number) => void;
  onMouseLeave?: (noteId: number) => void;
  classes: string;
}

export default function Note({
  note,
  classes,
  onDelete,
  onError,
  onMouseEnter,
  onMouseLeave,
}: NoteProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>(note.title);
  const [noteContent, setNoteContent] = useState<string>(note.content);
  const [noteUpdated, setNoteUpdated] = useState<string>(note.updated_at);

  useEffect(() => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteUpdated(note.updated_at);
    setNoteUpdated(note.updated_at);
  }, [note]);

  async function onSave() {
    setEditMode(false);
    try {
      const response = await api.put(`/notes/${note.id}/`, {
        title: noteTitle,
        content: noteContent,
      });
      if (response.status === 200) {
        note.title = response.data.title;
        note.content = response.data.content;
        note.updated_at = response.data.updated_at;
      } else {
        onCancel();
      }
    } catch (error) {
      if (onError) {
        if ((error as AxiosError).response?.status === 401) {
          onError(
            "You are not authorized to update this note, Please Refresh the Page"
          );
        } else {
          onError(
            "An error occurred while updating the note, Please try again later"
          );
        }
      }
      onCancel();
    }
  }

  function onCancel() {
    setEditMode(false);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  }

  function Buttons() {
    if (editMode) {
      return (
        <>
          <button className="btn btn-primary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={onSave}>
            Save
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Update
          </button>
        </>
      );
    }
  }

  return (
    <div
      className={`card mb-3 shadow-sm gap-2 note-card ${classes}`}
      onMouseEnter={() => {
        if (onMouseEnter) onMouseEnter(note.id);
      }}
      onMouseLeave={() => {
        if (onMouseLeave) onMouseLeave(note.id);
      }}
    >
      <div className={`card-body ${editMode && 'gap-3 d-flex flex-column'}`}>
        {editMode ? (
          <input
            type="text"
            className="form-input form-control"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        ) : (
          <h5 className="card-title">{noteTitle}</h5>
        )}
        {editMode ? (
          <textarea
            className="form-input form-control"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        ) : (
          <p className="card-text">{noteContent}</p>
        )}
        <p className="text-muted small">
          {new Date(noteUpdated).toLocaleDateString()}
        </p>
      </div>
      <div className="card-footer d-flex justify-content-center gap-2">
        {<Buttons />}
      </div>
    </div>
  );
}
