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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Willkommen zurück</p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${stat.lightColor} rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                    <div className={`w-8 h-8 rounded-full ${stat.lightColor} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <ArrowUpRight className={`w-4 h-4 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.count}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link href="/notes">
          <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900">Notizen</h3>
                  <p className="text-sm text-slate-500 mt-1">Markdown • Tags • Favoriten</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/todos">
          <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 bg-gradient-to-br from-emerald-50/50 to-teal-50/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <CheckSquare className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900">Aufgaben</h3>
                  <p className="text-sm text-slate-500 mt-1">Prioritäten • Deadlines</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/thoughts">
          <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 bg-gradient-to-br from-violet-50/50 to-purple-50/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Cloud className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900">Gedanken</h3>
                  <p className="text-sm text-slate-500 mt-1">Mood Tracking • Momente</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-violet-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
