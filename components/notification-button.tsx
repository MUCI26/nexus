"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bell, BellOff } from "lucide-react"

export function NotificationButton() {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const subscribe = async () => {
    setLoading(true)
    
    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      
      if (permission === "granted") {
        // Registriere Service Worker
        const registration = await navigator.serviceWorker.register("/service-worker.js")
        console.log("Service Worker registered:", registration)
        
        // Hole Push Subscription
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        })
        
        // Sende an Server
        await fetch("/api/notifications/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription })
        })
        
        console.log("Subscribed:", subscription)
      }
    } catch (error) {
      console.error("Subscribe error:", error)
    }
    
    setLoading(false)
  }

  if (permission === null) return null

  if (permission === "granted") {
    return (
      <Button variant="ghost" size="sm" className="text-slate-400">
        <Bell className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={subscribe}
      disabled={loading}
      className="text-slate-400 hover:text-slate-600"
    >
      <BellOff className="w-5 h-5" />
      <span className="ml-2 text-xs hidden lg:inline">Benachrichtigungen</span>
    </Button>
  )
}
