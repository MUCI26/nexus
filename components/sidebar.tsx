"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
    { href: "/", label: "Dashboard", icon: "🏠", color: "bg-blue-100 text-blue-600" },
    { href: "/notes", label: "Notizen", icon: "📝", color: "bg-amber-100 text-amber-600" },
    { href: "/todos", label: "Aufgaben", icon: "✅", color: "bg-emerald-100 text-emerald-600" },
    { href: "/thoughts", label: "Gedanken", icon: "💭", color: "bg-purple-100 text-purple-600" },
  ]

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            N
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">Nexus</h1>
            <p className="text-xs text-gray-500">Produktivität</p>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="search"
            placeholder="Suchen..."
            className="pl-10 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
          Menü
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              pathname === item.href 
                ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              pathname === item.href 
                ? "bg-white/20" 
                : item.color
            }`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {pathname === item.href && (
              <div className="ml-auto w-2 h-2 rounded-full bg-white">
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
          <p className="text-sm font-medium mb-1">Nexus MVP</p>
          <p className="text-xs text-white/80">Version 1.0 • Erfolgreich deployed</p>
        </div>
      </div>
    </aside>
  )
}
