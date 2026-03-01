"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, FileText, CheckSquare, Cloud, Search, Sparkles, Bell } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, color: "text-slate-600" },
    { href: "/notes", label: "Notizen", icon: FileText, color: "text-amber-600" },
    { href: "/todos", label: "Aufgaben", icon: CheckSquare, color: "text-emerald-600" },
    { href: "/thoughts", label: "Gedanken", icon: Cloud, color: "text-violet-600" },
  ]

  return (
    <aside className="w-72 bg-slate-900 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">Nexus</h1>
            <p className="text-xs text-slate-400">Produktivität</p>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Suchen..."
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2">
          Menü
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-white text-slate-900" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? item.color : ""}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-400">Online</span>
          </div>
          <Bell className="w-4 h-4 text-slate-500" />
        </div>
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-sm font-medium text-white">Nexus Cloud</p>
          <p className="text-xs text-slate-400">v1.0 • PostgreSQL</p>
        </div>
      </div>
    </aside>
  )
}
