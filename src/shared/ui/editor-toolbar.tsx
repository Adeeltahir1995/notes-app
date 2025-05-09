

'use client';

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as BulletListIcon,
  ListOrdered as OrderedListIcon,
  Quote as QuoteIcon,
  Minus as MinusIcon,
  CheckSquare as TaskIcon,
} from 'lucide-react';
import { IconButton } from './icon-button';
import { Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';

export function EditorToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-md border bg-white p-2 shadow-sm">
      <select
        className="rounded border px-2 py-1 text-sm"
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'paragraph') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: Number(value) as Level }).run();
        }}
        value={
          editor.isActive('heading', { level: 1 }) ? '1' :
          editor.isActive('heading', { level: 2 }) ? '2' :
          editor.isActive('heading', { level: 3 }) ? '3' :
          'paragraph'
        }
      >
        <option value="paragraph">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <IconButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<BoldIcon size={16} />} />
      <IconButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<ItalicIcon size={16} />} />
      <IconButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<UnderlineIcon size={16} />} />
      <IconButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<BulletListIcon size={16} />} />
      <IconButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<OrderedListIcon size={16} />} />
      <IconButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<QuoteIcon size={16} />} />
      <IconButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<MinusIcon size={16} />} />
      <IconButton active={editor.isActive('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} icon={<TaskIcon size={16} />} />
    </div>
  );
}
