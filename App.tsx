import { useEffect, useState } from "react";
import "./App.css";

interface Note {
  id: number;
  text: string;
  date: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [noteText, setNoteText] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (): void => {
    if (noteText.trim() === "") return;

    const newNote: Note = {
      id: Date.now(),
      text: noteText,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  const deleteNote = (id: number): void => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <div className="container">
        <h1>React Notes App</h1>
        <p className="subtitle">
          Create, search and manage your notes
        </p>

        <div className="note-input">
          <textarea
            placeholder="Write a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />

          <button onClick={addNote}>Add Note</button>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p className="empty">No notes found</p>
          ) : (
            filteredNotes.map((note) => (
              <div className="note-card" key={note.id}>
                <p>{note.text}</p>
                <span>{note.date}</span>

                <button onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
