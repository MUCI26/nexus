"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, CheckSquare, Cloud, Plus } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/notes", label: "Notizen", icon: FileText },
    { href: "/todos", label: "Aufgaben", icon: CheckSquare },
    { href: "/thoughts", label: "Gedanken", icon: Cloud },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 lg:hidden z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                isActive 
                  ? "text-white" 
                  : "text-slate-400"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isActive ? "bg-white/20" : ""
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
