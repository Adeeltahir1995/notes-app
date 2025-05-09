'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { EditorToolbar } from './editor-toolbar';
import { editorExtensions } from './editor-extensions';

type Props = {
  content: string;
  onUpdate: (html: string) => void;
};

export function RichTextEditor({ content, onUpdate }: Props) {
  const lastHtmlRef = useRef(content);

  const editor = useEditor({
    extensions: editorExtensions,
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[240px] rounded-md border bg-white p-4 text-base focus:outline-none prose max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== lastHtmlRef.current) {
        lastHtmlRef.current = html;
        onUpdate(html);
      }
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="relative space-y-2">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
