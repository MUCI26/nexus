"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface Note {
  id: string
  title: string
  content: string
  tags: string | null
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const res = await fetch("/api/notes")
    const data = await res.json()
    setNotes(data)
  }

  const createNote = async () => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newNote,
        tags: newNote.tags ? newNote.tags.split(",").map((t) => t.trim()) : []
      })
    })
    setNewNote({ title: "", content: "", tags: "" })
    setIsOpen(false)
    fetchNotes()
  }

  const toggleFavorite = async (note: Note) => {
    await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite: !note.isFavorite })
    })
    fetchNotes()
  }

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" })
    fetchNotes()
  }

  const parseTags = (tags: string | null) => {
    if (!tags) return []
    try {
      return JSON.parse(tags)
    } catch {
      return []
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>+ New Note</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Content (supports Markdown)"
                rows={10}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
              <Button onClick={createNote} className="w-full">Create Note</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(note)}
                  >
                    {note.isFavorite ? "⭐" : "☆"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {parseTags(note.tags).map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {note.content.slice(0, 200)}
                {note.content.length > 200 && "..."}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
