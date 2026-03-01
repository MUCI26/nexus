import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export default async function Dashboard() {
  const [notesCount, todosCount, thoughtsCount, incompleteTodos] = await Promise.all([
    prisma.note.count(),
    prisma.todo.count(),
    prisma.thought.count(),
    prisma.todo.count({ where: { isCompleted: false } })
  ])

  const completionRate = todosCount > 0 
    ? Math.round(((todosCount - incompleteTodos) / todosCount) * 100) 
    : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Willkommen zurück</p>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <Link href="/todos">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">
            + Neue Aufgabe
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 mb-1">Notizen</p>
                <p className="text-3xl font-bold text-gray-900">{notesCount}</p>
                <p className="text-xs text-gray-500 mt-1">Gespeicherte Ideen</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">
                📝
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">Aufgaben</p>
                <p className="text-3xl font-bold text-gray-900">{todosCount}</p>
                <p className="text-xs text-gray-500 mt-1">{incompleteTodos} offen</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Gedanken</p>
                <p className="text-3xl font-bold text-gray-900">{thoughtsCount}</p>
                <p className="text-xs text-gray-500 mt-1">Erfasste Momente</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                💭
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Fortschritt</p>
                <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">Aufgaben erledigt</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                📊
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link href="/notes">
          <Card className="group hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-amber-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  📝
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">Notizen</h3>
                  <p className="text-sm text-gray-500">Markdown, Tags, Favoriten</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/todos">
          <Card className="group hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  ✅
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">Aufgaben</h3>
                  <p className="text-sm text-gray-500">Prioritäten, Deadlines</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/thoughts">
          <Card className="group hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  💭
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">Gedanken</h3>
                  <p className="text-sm text-gray-500">Mood Tracking, Momente</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
