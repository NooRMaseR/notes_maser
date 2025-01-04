import { useState, useEffect } from "react";
import { INote } from "../utils/constants";
import Alert from "../components/aleart";
import Note from "../components/note";
import store  from "../utils/store";
import api from "../utils/api";
import * as actions from '../utils/storeActions'

export default function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  store.dispatch(actions.updateState('hasToken', localStorage.getItem('access') !== null))

  function showError(errorMessage: unknown) {
    setError(errorMessage as string);
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, 5000);
  }

  async function addNote() {
    const res = await api.post("/notes/", { title: title, content: content });

    if (res.status === 201) {
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
    }
  }

  async function deleteNote(id: number) {
    const res = await api.delete(`/notes/${id}/`);

    if (res.status === 204) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  }

  useEffect(() => {
    api.get("/notes/").then((response) => {
      setNotes(response.data);
    });
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <div
        className="container d-flex flex-column"
        style={{ width: "100%", height: "100svh" }}
        >
        <h1>Welcome {username}</h1>
        {hasError && <Alert message={error} color="danger" />}
        <div className="d-flex flex-column justify-content-center gap-2">
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="title..."
            className="form-control form-input"
          />
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="content..."
            className="form-control form-input"
          />
          <button className="btn btn-primary" onClick={addNote}>
            Add Note
          </button>
        </div>
        <div>
          <h2>My Notes</h2>
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={deleteNote} onError={(error) => showError(error)} />
          ))}
        </div>
      </div>
    </>
  );
}
