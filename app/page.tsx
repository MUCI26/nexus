import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const [notesCount, todosCount, thoughtsCount, incompleteTodos] = await Promise.all([
    prisma.note.count(),
    prisma.todo.count(),
    prisma.thought.count(),
    prisma.todo.count({ where: { isCompleted: false } })
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Nexus - your productivity hub
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todosCount}</div>
            <p className="text-xs text-muted-foreground">
              {incompleteTodos} incomplete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thoughtsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/notes">
          <Button className="w-full" size="lg">
            📝 Manage Notes
          </Button>
        </Link>
        <Link href="/todos">
          <Button className="w-full" size="lg">
            ✅ Manage Todos
          </Button>
        </Link>
        <Link href="/thoughts">
          <Button className="w-full" size="lg">
            💭 Quick Thoughts
          </Button>
        </Link>
      </div>
    </div>
  )
}
