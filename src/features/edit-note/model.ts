'use client';

import { updateNote, loadNotes } from '@entities/note/lib/storage';
import { useEffect, useRef, useState } from 'react';

export function useEditNote(noteId: string, initialContent: string) {
  const [content, setContent] = useState(initialContent);
  const lastSyncedRef = useRef(initialContent);
  const isDirtyRef = useRef(false);

  useEffect(() => {
    if (content !== lastSyncedRef.current) {
      isDirtyRef.current = true;
    }
  }, [content]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fresh = loadNotes().find((n) => n.id === noteId);
      const isUserTyping = isDirtyRef.current;

      if (!isUserTyping && fresh && fresh.content !== content) {
        setContent(fresh.content);
        lastSyncedRef.current = fresh.content;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [noteId, content]);

  function handleSave() {
    updateNote(noteId, { content });
    lastSyncedRef.current = content;
    isDirtyRef.current = false;
  }

  return { content, setContent, handleSave };
}
