import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NoteList } from '../NoteList'
import { loadNotes } from '@entities/note/lib/storage'
import { Note } from '@entities/note/types'

jest.mock('@entities/note/lib/storage', () => ({
  loadNotes: jest.fn(),
  saveNotes: jest.fn(),
  deleteNote: jest.fn(),
}))

jest.mock('@features/create-note/ui/CreateNoteForm', () => ({
  CreateNoteForm: ({ onCreated }: { onCreated: (note: Note) => void }) => (
    <button onClick={() => onCreated({
      id: '3',
      title: 'New Note',
      content: 'New content',
      updatedAt: Date.now(),
    })}>
      Create Note
    </button>
  ),
}))

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('NoteList', () => {
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Test Note 1',
      content: 'Test content 1',
      updatedAt: Date.now(),
    },
    {
      id: '2',
      title: 'Test Note 2',
      content: 'Test content 2',
      updatedAt: Date.now(),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(loadNotes as jest.Mock).mockReturnValue([])
  })

  it('renders empty state when no notes exist', () => {
    render(<NoteList />)
    
    expect(screen.getByText('No notes yet. Start by creating one!')).toBeInTheDocument()
  })

  it('renders list of notes when notes exist', () => {
    ;(loadNotes as jest.Mock).mockReturnValue(mockNotes)
    
    render(<NoteList />)
    
    expect(screen.getByText('Test Note 1')).toBeInTheDocument()
    expect(screen.getByText('Test Note 2')).toBeInTheDocument()
  })

  it('deletes a note when delete button is clicked', async () => {
    ;(loadNotes as jest.Mock).mockReturnValue(mockNotes)
    
    render(<NoteList />)
    
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    await waitFor(() => {
      expect(screen.queryByText('Test Note 1')).not.toBeInTheDocument()
      expect(screen.getByText('Test Note 2')).toBeInTheDocument()
    })
  })

  it('navigates to note page when note is clicked', () => {
    ;(loadNotes as jest.Mock).mockReturnValue(mockNotes)
    
    render(<NoteList />)
    
    const noteCard = screen.getByText('Test Note 1').closest('div[data-slot="card"]')!
    fireEvent.click(noteCard)
    
    expect(mockPush).toHaveBeenCalledWith('/note/1')
  })

  it('adds a new note when created', () => {
    ;(loadNotes as jest.Mock).mockReturnValue(mockNotes)
    
    render(<NoteList />)
    
    fireEvent.click(screen.getByText('Create Note'))
    
    expect(screen.getByText('New Note')).toBeInTheDocument()
  })
}) 