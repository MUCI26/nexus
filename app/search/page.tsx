"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Note {
  id: string
  title: string
  content: string
  tags: string | null
  isFavorite: boolean
}

interface Todo {
  id: string
  title: string
  description: string | null
  priority: string
  isCompleted: boolean
}

interface Thought {
  id: string
  content: string
  mood: string
  createdAt: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [Ergebnisse, setResults] = useState<{
    notes: Note[]
    todos: Todo[]
    thoughts: Thought[]
  }>({ notes: [], todos: [], thoughts: [] })

  useEffect(() => {
    if (query) {
      fetchSearchResults()
    }
  }, [query])

  const fetchSearchResults = async () => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data)
  }

  const parseTags = (tags: string | null) => {
    if (!tags) return []
    try {
      return JSON.parse(tags)
    } catch {
      return []
    }
  }

  const totalResults = Ergebnisse.notes.length + Ergebnisse.todos.length + Ergebnisse.thoughts.length

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Suchergebnisse für "{query}"
      </h1>
      
      <p className="text-muted-foreground">
        Gefunden {totalResults} Ergebnisse
      </p>

      {Ergebnisse.notes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Notes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Ergebnisse.notes.map((note) => (
              <Link href={`/notes`} key={note.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      {note.isFavorite && <span>⭐</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {parseTags(note.tags).map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {note.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {Ergebnisse.todos.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Todos</h2>
          <div className="space-y-2">
            {Ergebnisse.todos.map((todo) => (
              <Link href={`/todos`} key={todo.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className={todo.isCompleted ? "line-through" : ""}>
                      {todo.title}
                    </span>
                    <Badge className="ml-auto">{todo.priority}</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {Ergebnisse.thoughts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Thoughts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Ergebnisse.thoughts.map((thought) => (
              <Link href={`/thoughts`} key={thought.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <span className="text-2xl">{thought.mood}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(thought.createdAt).toLocaleString()}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{thought.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {totalResults === 0 && query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No Ergebnisse found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
