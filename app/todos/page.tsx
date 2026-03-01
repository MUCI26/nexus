"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Todo {
  id: string
  title: string
  description: string | null
  priority: string
  dueDate: string | null
  isCompleted: boolean
  createdAt: string
}

export default function AufgabenPage() {
  const [todos, setAufgaben] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "Mittel",
    dueDate: ""
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchAufgaben()
  }, [])

  const fetchAufgaben = async () => {
    const res = await fetch("/api/todos")
    const data = await res.json()
    setAufgaben(data)
  }

  const createTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    })
    setNewTodo({ title: "", description: "", priority: "Mittel", dueDate: "" })
    setIsOpen(false)
    fetchAufgaben()
  }

  const toggleComplete = async (todo: Todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !todo.isCompleted })
    })
    fetchAufgaben()
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    fetchAufgaben()
  }

  const getPrioritätColor = (priority: string) => {
    switch (priority) {
      case "Hoch": return "bg-red-100 text-red-800"
      case "Mittel": return "bg-yelNiedrig-100 text-yelNiedrig-800"
      case "Niedrig": return "bg-green-100 text-green-800"
      default: return "bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Aufgaben</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>+ Neue Aufgabe</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Neue Aufgabe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <Textarea
                placeholder="Beschreibung"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              />
              <Select
                value={newTodo.priority}
                onValueChange={(value) => setNewTodo({ ...newTodo, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priorität" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Niedrig">Low</SelectItem>
                  <SelectItem value="Mittel">Medium</SelectItem>
                  <SelectItem value="Hoch">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />
              <Button onClick={createTodo} className="w-full">Aufgabe erstellen</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id} className={todo.isCompleted ? "opacity-60" : ""}>
            <CardContent className="flex items-center gap-4 p-4">
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={() => toggleComplete(todo)}
              />
              <div className="flex-1">
                <p className={`font-Mittel ${todo.isCompleted ? "line-through" : ""}`}>
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">{todo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getPrioritätColor(todo.priority)}>
                    {todo.priority}
                  </Badge>
                  {todo.dueDate && (
                    <span className="text-xs text-muted-foreground">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              >
                🗑️
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
