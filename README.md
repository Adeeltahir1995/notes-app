# 📝 Collaborative Notes App (Frontend)

A simple yet scalable collaborative notes application built with **Next.js**, **TypeScript**, and **Tiptap**, following the **Feature-Sliced Design (FSD)** architecture. Users can create, view, and edit rich-text notes using a Notion-style editor.

---

## 🚀 Tech Stack & Rationale

| Tech               | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| **Next.js (App Router)** | Modern React framework with file-based routing and fullstack capabilities |
| **TypeScript**     | Type safety and better DX                                                |
| **Tailwind CSS**   | Utility-first styling, fast design iteration                            |
| **Shadcn/ui**      | Prebuilt, accessible UI components with Tailwind integration            |
| **Tiptap Editor**  | Highly extensible rich-text editor (used for Notion-like editing)       |
| **Lucide Icons**   | Clean icon system for the editor toolbar                                |
| **Feature-Sliced Design (FSD)** | Scalable folder structure to separate concerns and improve maintainability |

---

## 📁 Folder Structure

src/
├── app/ → Next.js App Router layout, routing, global styles
├── entities/ → Reusable business logic (e.g. note types, storage)
├── features/ → Isolated, self-contained features (create/edit/delete notes)
├── widgets/ → UI compositions like NoteList and NoteEditor
├── shared/ → UI primitives (button, input, editor) and utils
├── processes/ → (Reserved for multi-feature flows if needed)

yaml
Copy
Edit

---

## 🧑‍💻 Setup & Run Locally

### 📦 Requirements
- Node.js v18 or later
- pnpm / npm / yarn

### 🛠 Installation

```bash
# clone the repo
git clone https://github.com/your-username/notes-app.git
cd notes-app

# install dependencies
npm install

# run dev server
npm run dev
Then go to http://localhost:3000 ✨

✨ Features
✅ Create & delete notes (stored in localStorage)

✅ Rich text editing: headings, lists, blockquote, task lists

✅ Fully interactive Save button (disabled unless dirty)

✅ Clean, responsive UI using Tailwind + Shadcn

✅ FSD architecture for clean code separation

📌 Why FSD?
Feature-Sliced Design improves:

Code discoverability

Long-term scalability

Ease of reuse across teams/modules

Each slice (entities, features, widgets, etc.) has a clearly defined responsibility.

🛠 Customization
To extend the editor: see shared/ui/editor-extensions.ts

To style components: use Tailwind utilities or extend shadcn/ui base components

📄 License
MIT — free to use, modify, and build on.

🙏 Acknowledgements
Tiptap for the awesome editor

Shadcn/UI for the design system

Lucide for icons