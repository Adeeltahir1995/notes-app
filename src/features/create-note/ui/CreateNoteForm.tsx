'use client';

import { Button, Input } from '@shared/ui';
import { useCreateNote } from '../model';
import { Note } from '@entities/note/types';

type Props = {
  onCreated: (note: Note) => void;
};

export function CreateNoteForm({ onCreated }: Props) {
  const { title, setTitle, handleCreate } = useCreateNote(onCreated);

  return (
    <form
      className="flex items-center gap-2 mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <Input
        placeholder="New note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
