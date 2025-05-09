'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadNotes } from '@entities/note/lib/storage';
import { useEditNote } from '@features/edit-note/model';
import { Button, RichTextEditor } from '@shared/ui';

export function NoteEditor() {
  const params = useParams();
  const id = params?.id as string;

  const note = loadNotes().find((n) => n.id === id);
  const [saved, setSaved] = useState(true);

  const { content, setContent, handleSave } = useEditNote(id, note?.content || '');

  useEffect(() => {
    if (note?.content !== content) {
      setSaved(false);
    }
  }, [content, note?.content]);

  const handleSmartSave = () => {
    handleSave();
    setSaved(true);
  };

  if (!note) return <div>Note not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <div className="rounded-md border bg-white shadow-sm">
        <RichTextEditor content={content} onUpdate={setContent} />
      </div>
      <Button
        onClick={handleSmartSave}
        disabled={saved}
        className={saved ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      >
        {saved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}
