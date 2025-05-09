'use client';

import { Note } from '../types';
import { format } from 'date-fns';
import React from 'react';
import { Card, Button } from '@shared/ui/';
type Props = {
  note: Note;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
};

export const NoteCard = React.memo(function NoteCard({ note, onDelete, onClick }: Props) {
  return (
    <Card className="p-4 mb-4 cursor-pointer hover:bg-muted" onClick={() => onClick?.(note.id)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{note.title || 'Untitled Note'}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(note.updatedAt), 'PPpp')}
          </p>
        </div>
        {onDelete && (
          <Button variant="outline" size="sm" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onDelete(note.id);
          }}>
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
});
