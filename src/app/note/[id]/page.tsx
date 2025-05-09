'use client';

import { NoteEditor } from '@widgets/note-editor/NoteEditor';
import { useRouter } from 'next/navigation';

export default function NoteEditorPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-muted/40 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Note</h1>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Notes
          </button>
        </div>

        <NoteEditor />
      </div>
    </main>
  );
}
