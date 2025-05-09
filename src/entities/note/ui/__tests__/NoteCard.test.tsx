import { render, screen, fireEvent } from '@testing-library/react'
import { NoteCard } from '../NoteCard'
import { Note } from '../../types'

describe('NoteCard', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    updatedAt: Date.now(),
  }

  const mockOnClick = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders note title and date', () => {
    render(<NoteCard note={mockNote} />)
    
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.queryByText('Untitled Note')).not.toBeInTheDocument()
  })

  it('renders "Untitled Note" when title is empty', () => {
    const noteWithoutTitle: Note = { ...mockNote, title: '' }
    render(<NoteCard note={noteWithoutTitle} />)
    
    expect(screen.getByText('Untitled Note')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    render(<NoteCard note={mockNote} onClick={mockOnClick} />)
    
    fireEvent.click(screen.getByText('Test Note').closest('div[data-slot="card"]')!)
    expect(mockOnClick).toHaveBeenCalledWith(mockNote.id)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard note={mockNote} onDelete={mockOnDelete} />)
    
    fireEvent.click(screen.getByText('Delete'))
    expect(mockOnDelete).toHaveBeenCalledWith(mockNote.id)
  })

  it('does not show delete button when onDelete is not provided', () => {
    render(<NoteCard note={mockNote} />)
    
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
}) 