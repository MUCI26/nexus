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

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await fetch("/api/todos")
    const data = await res.json()
    setTodos(data)
  }

  const createTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    })
    setNewTodo({ title: "", description: "", priority: "medium", dueDate: "" })
    setIsOpen(false)
    fetchTodos()
  }

  const toggleComplete = async (todo: Todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !todo.isCompleted })
    })
    fetchTodos()
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    fetchTodos()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todos</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>+ New Todo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Todo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              />
              <Select
                value={newTodo.priority}
                onValueChange={(value) => setNewTodo({ ...newTodo, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />
              <Button onClick={createTodo} className="w-full">Create Todo</Button>
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
                <p className={`font-medium ${todo.isCompleted ? "line-through" : ""}`}>
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">{todo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getPriorityColor(todo.priority)}>
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
