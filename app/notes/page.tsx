"use client"

import { useState, useEffect } from "react"
import { Card, CardInhalt, CardHeader, CardTitel } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogInhalt, DialogHeader, DialogTitel, DialogTrigger } from "@/components/ui/dialog"
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

export default function NotizenPage() {
  const [notes, setNotizen] = useState<Note[]>([])
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchNotizen()
  }, [])

  const fetchNotizen = async () => {
    const res = await fetch("/api/notes")
    const data = await res.json()
    setNotizen(data)
  }

  const createNote = async () => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Inhalt-Type": "application/json" },
      body: JSON.stringify({
        ...newNote,
        tags: newNote.tags ? newNote.tags.split(",").map((t) => t.trim()) : []
      })
    })
    setNewNote({ title: "", content: "", tags: "" })
    setIsOpen(false)
    fetchNotizen()
  }

  const toggleFavorite = async (note: Note) => {
    await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: { "Inhalt-Type": "application/json" },
      body: JSON.stringify({ isFavorite: !note.isFavorite })
    })
    fetchNotizen()
  }

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" })
    fetchNotizen()
  }

  const parseSchlagwörter = (tags: string | null) => {
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
        <h1 className="text-3xl font-bold">Notizen</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>+ Neue Notiz</Button>
          </DialogTrigger>
          <DialogInhalt className="max-w-2xl">
            <DialogHeader>
              <DialogTitel>Create Neue Notiz</DialogTitel>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Titel"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Inhalt (supports Markdown)"
                rows={10}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <Input
                placeholder="Schlagwörter (comma separated)"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
              <Button onClick={createNote} className="w-full">Notiz erstellen</Button>
            </div>
          </DialogInhalt>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitel className="text-lg">{note.title}</CardTitel>
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
                {parseSchlagwörter(note.tags).map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardInhalt>
              <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                {note.content.slice(0, 200)}
                {note.content.length > 200 && "..."}
              </div>
            </CardInhalt>
          </Card>
        ))}
      </div>
    </div>
  )
}
