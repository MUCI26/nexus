"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Thought {
  id: string
  content: string
  mood: string
  createdAt: string
}

const MOODS = ["😊", "😐", "😔", "🤔", "😄", "😴", "🤯", "❤️"]

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [newThought, setNewThought] = useState({ content: "", mood: "🤔" })

  useEffect(() => {
    fetchThoughts()
  }, [])

  const fetchThoughts = async () => {
    const res = await fetch("/api/thoughts")
    const data = await res.json()
    setThoughts(data)
  }

  const createThought = async () => {
    if (!newThought.content.trim()) return
    
    await fetch("/api/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newThought)
    })
    setNewThought({ content: "", mood: "🤔" })
    fetchThoughts()
  }

  const deleteThought = async (id: string) => {
    await fetch(`/api/thoughts/${id}`, { method: "DELETE" })
    fetchThoughts()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Schnelle Gedanken</h1>
        <p className="text-muted-foreground">
          Fange deine spontanen Ideen und Gefühle ein
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <Textarea
            placeholder="Was beschäftigt dich gerade?"
            rows={3}
            value={newThought.content}
            onChange={(e) => setNewThought({ ...newThought, content: e.target.value })}
          />
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {MOODS.map((mood) => (
                <Button
                  key={mood}
                  variant={newThought.mood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewThought({ ...newThought, mood })}
                >
                  {mood}
                </Button>
              ))}
            </div>
            <Button onClick={createThought} className="ml-auto">
              Gedanken hinzufügen
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {thoughts.map((thought) => (
          <Card key={thought.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-2xl">{thought.mood}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteThought(thought.id)}
              >
                🗑️
              </Button>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{thought.content}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(thought.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
