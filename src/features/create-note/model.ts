"use client";

import { useState } from "react";
import { Note } from "@entities/note/types";
import { createNote } from "@entities/note/lib/storage";
import { nanoid } from "nanoid";

export function useCreateNote(onCreated: (note: Note) => void) {
  const [title, setTitle] = useState("");

  function handleCreate() {
    const newNote: Note = {
      id: nanoid(),
      title: title || "Untitled",
      content: "",
      updatedAt: Date.now(),
    };

    createNote(newNote);
    onCreated(newNote);
    setTitle("");
  }

  return { title, setTitle, handleCreate };
}
