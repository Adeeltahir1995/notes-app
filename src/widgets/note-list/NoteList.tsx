'use client';

import { useCallback, useEffect, useState } from 'react';
import { Note } from '@entities/note/types';
import { loadNotes } from '@entities/note/lib/storage';
import { NoteCard } from '@entities/note/ui/NoteCard';
import { CreateNoteForm } from '@features/create-note/ui/CreateNoteForm';
import { useDeleteNote } from '@features/delete-note/model';

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const handleCreate = useCallback((note: Note) => {
    setNotes((prev) => [note, ...prev]);
  }, []);

  const handleDelete = useDeleteNote(
    useCallback((id: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }, [])
  );

  const handleSelect = (id: string) => {
    window.location.href = `/note/${id}`;
  };

  return (
    <section className="w-3xl mx-auto px-6 md:px-12 py-8 space-y-8 bg-muted/50 rounded-xl shadow-sm">
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">My Notes</h1>
      <CreateNoteForm onCreated={handleCreate} />
    </div>
  
    {notes.length === 0 ? (
      <p className="text-gray-500 text-center italic">No notes yet. Start by creating one!</p>
    ) : (
      <div className="flex flex-col gap-3">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onClick={handleSelect}
          />
        ))}
      </div>
    )}
  </section>
  
  );
}
