    // src/components/leads/NotesSection.jsx
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const NotesSection = ({ notes, onAddNote, isAdding }) => {
  const [newNote, setNewNote] = useState('')
  const { user } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newNote.trim()) {
      onAddNote(newNote.trim(), user?.name || 'System')
      setNewNote('')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isAdding || !newNote.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-gray-700">{note.content}</p>
              <div className="mt-1 text-sm text-gray-500">
                By {note.createdBy} • {formatDate(note.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No notes yet. Add the first note above.</p>
        )}
      </div>
    </div>
  )
}

export default NotesSection