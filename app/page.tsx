import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { FileText, CheckSquare, Cloud, TrendingUp, ArrowUpRight } from "lucide-react"

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

  const stats = [
    {
      title: "Notizen",
      count: notesCount,
      label: "Gespeichert",
      icon: FileText,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      href: "/notes"
    },
    {
      title: "Aufgaben",
      count: todosCount,
      label: `${incompleteTodos} offen`,
      icon: CheckSquare,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      href: "/todos"
    },
    {
      title: "Gedanken",
      count: thoughtsCount,
      label: "Erfasst",
      icon: Cloud,
      color: "bg-violet-500",
      lightColor: "bg-violet-50",
      textColor: "text-violet-600",
      href: "/thoughts"
    },
    {
      title: "Fortschritt",
      count: `${completionRate}%`,
      label: "Erledigt",
      icon: TrendingUp,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/todos"
    }
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Willkommen zurück</p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.lightColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
                    </div>
                    <div className="hidden lg:flex w-8 h-8 rounded-full bg-slate-100 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className={`w-4 h-4 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-4">
                    <p className="text-xs lg:text-sm text-slate-500">{stat.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-slate-900 mt-1">{stat.count}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-900">Schnellzugriff</p>
        
        <div className="grid grid-cols-1 gap-3">
          <Link href="/notes">
            <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Notizen</h3>
                  <p className="text-sm text-slate-500">Markdown • Tags • Favoriten</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/todos">
            <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Aufgaben</h3>
                  <p className="text-sm text-slate-500">Prioritäten • Deadlines</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/thoughts">
            <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 bg-white">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">Gedanken</h3>
                  <p className="text-sm text-slate-500">Mood Tracking • Momente</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
