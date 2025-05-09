import { loadNotes, saveNotes, createNote, updateNote, deleteNote } from '../storage'
import { Note } from '../../types'

describe('storage', () => {
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
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('loadNotes', () => {
    it('returns empty array when no notes exist', () => {
      expect(loadNotes()).toEqual([])
    })

    it('returns parsed notes from localStorage', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))
      expect(loadNotes()).toEqual(mockNotes)
    })

    it('returns empty array when localStorage data is invalid', () => {
      localStorage.setItem('notes-app__notes', 'invalid json')
      expect(loadNotes()).toEqual([])
    })
  })

  describe('saveNotes', () => {
    it('saves notes to localStorage', () => {
      saveNotes(mockNotes)
      expect(JSON.parse(localStorage.getItem('notes-app__notes')!)).toEqual(mockNotes)
    })
  })

  describe('createNote', () => {
    it('adds note to the beginning of the list', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))

      const newNote: Note = {
        id: '3',
        title: 'New Note',
        content: 'New content',
        updatedAt: Date.now(),
      }

      createNote(newNote)

      const savedNotes = JSON.parse(localStorage.getItem('notes-app__notes')!)
      expect(savedNotes[0]).toEqual(newNote)
      expect(savedNotes.length).toBe(3)
    })
  })

  describe('updateNote', () => {
    it('updates existing note', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))

      const update = {
        title: 'Updated Title',
        content: 'Updated content',
      }

      const beforeUpdate = Date.now()
      updateNote('1', update)
      const afterUpdate = Date.now()

      const savedNotes = JSON.parse(localStorage.getItem('notes-app__notes')!)
      const updatedNote = savedNotes.find((note: Note) => note.id === '1')

      expect(updatedNote).toMatchObject(update)
      expect(updatedNote.updatedAt).toBeGreaterThanOrEqual(beforeUpdate)
      expect(updatedNote.updatedAt).toBeLessThanOrEqual(afterUpdate)
    })

    it('does not update non-existent note', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))

      updateNote('non-existent', { title: 'New Title' })

      const savedNotes = JSON.parse(localStorage.getItem('notes-app__notes')!)
      expect(savedNotes).toEqual(mockNotes)
    })
  })

  describe('deleteNote', () => {
    it('removes note from storage', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))

      deleteNote('1')

      const savedNotes = JSON.parse(localStorage.getItem('notes-app__notes')!)
      expect(savedNotes.length).toBe(1)
      expect(savedNotes[0].id).toBe('2')
    })

    it('does nothing when note does not exist', () => {
      localStorage.setItem('notes-app__notes', JSON.stringify(mockNotes))

      deleteNote('non-existent')

      const savedNotes = JSON.parse(localStorage.getItem('notes-app__notes')!)
      expect(savedNotes).toEqual(mockNotes)
    })
  })
}) 