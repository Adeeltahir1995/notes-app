import { Note } from "../types";

const STORAGE_KEY = "notes-app__notes";

export function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
}

export function deleteNote(id: string) {
  const notes = loadNotes().filter((note) => note.id !== id);
  saveNotes(notes);
}

export function createNote(note: Note) {
  const notes = loadNotes();
  notes.unshift(note);
  saveNotes(notes);
}

export function updateNote(id: string, update: Partial<Note>) {
  const notes = loadNotes().map((note) =>
    note.id === id ? { ...note, ...update, updatedAt: Date.now() } : note
  );
  saveNotes(notes);
}
