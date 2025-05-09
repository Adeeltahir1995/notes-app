'use client';

import { deleteNote } from '@entities/note/lib/storage';

export function useDeleteNote(onDeleted: (id: string) => void) {
  return function handleDelete(id: string) {
    deleteNote(id);
    onDeleted(id);
  };
}
