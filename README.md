# Collaborative Notes App (Frontend)

This is a scalable, single-page collaborative notes application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Tiptap**. It follows the **Feature-Sliced Design (FSD)** architecture pattern, enabling easy modular development and long-term maintainability.

Users can create, view, and edit rich-text notes using a Notion-like editor interface. Notes are stored locally in `localStorage`.

---

## Tech Stack and Rationale

| Technology                | Purpose                                                                 |
|--------------------------|-------------------------------------------------------------------------|
| **Next.js (App Router)** | File-based routing, client/server rendering, and layout management      |
| **TypeScript**           | Static typing for improved developer experience and refactoring safety |
| **Tailwind CSS**         | Utility-first CSS for faster and consistent UI development              |
| **Shadcn/UI**            | Accessible, headless component library styled with Tailwind             |
| **Tiptap Editor**        | Rich-text editor built on ProseMirror with great customization support  |
| **Lucide Icons**         | Clean, open-source icon set used in the rich-text editor toolbar        |
| **Feature-Sliced Design**| Folder structure designed for scalability and separation of concerns    |

---

## Project Structure

## Folder Structure

```txt
src/
├── app/           # Next.js App Router (layouts, routes, global styles)
│   ├── layout.tsx
│   ├── globals.css
│   └── note/[id]/page.tsx
│
├── entities/      # Domain-level logic (types, localStorage access)
│   └── note/
│       ├── lib/storage.ts
│       ├── types.ts
│       └── ui/NoteCard.tsx
│
├── features/      # Feature-level slices (create, edit, delete logic)
│   ├── create-note/
│   │   ├── model.ts
│   │   └── CreateNoteForm.tsx
│   ├── delete-note/model.ts
│   └── edit-note/model.ts
│
├── widgets/       # UI compositions built from features/entities
│   ├── note-list/NoteList.tsx
│   └── note-editor/NoteEditor.tsx
│
├── shared/        # Reusable UI components and utilities
│   ├── lib/utils.ts
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── rich-text-editor.tsx
│       ├── icon-button.tsx
│       ├── editor-toolbar.tsx
│       ├── editor-extensions.ts
│       └── index.ts
```
---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm / pnpm / yarn (any one)

### Installation

```bash
# Clone the repository
git clone https://github.com/Adeeltahir1995/notes-app.git
cd notes-app

# Install dependencies
npm install

# Run the development server
npm run dev
```
Visit the app at: http://localhost:3000

### Testing

The application uses Jest and React Testing Library for unit testing. Tests are organized alongside the components they test in `__tests__` directories.

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

#### Test Coverage

The test suite covers the following key components:

- **NoteCard Component**: Tests rendering, click handling, and delete functionality
- **NoteList Component**: Tests rendering, note creation, deletion, and navigation
- **Storage Module**: Tests all CRUD operations and error handling for localStorage

Current test coverage includes:
- 100% coverage for NoteCard component
- 100% coverage for NoteList component
- 95.65% coverage for storage module

#### Testing Setup

The testing environment is configured with:
- Jest for test running and assertions
- React Testing Library for component testing
- JSDOM for browser environment simulation
- Custom Jest configuration for Next.js and module aliases
- Mock implementations for localStorage and Next.js router

### Key Features
- Create, edit, and delete notes (stored in localStorage)
- Rich-text editing (headings, lists, task list)
- Interactive Save button that reflects dirty state
- Clean architecture following Feature-Sliced Design
- Customizable editor toolbar built with Tiptap + Lucide icons