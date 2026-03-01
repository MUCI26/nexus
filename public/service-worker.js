// Service Worker für Push Notifications
const CACHE_NAME = 'nexus-v1'

self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  event.waitUntil(clients.claim())
})

// Push Notification Handler
self.addEventListener('push', (event) => {
  const data = event.data.json()
  
  const options = {
    body: data.body || 'Neue Benachrichtigung',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: data.tag || 'default',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Öffnen'
      },
      {
        action: 'dismiss',
        title: 'Schließen'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Nexus', options)
  )
})

// Klick auf Notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'dismiss') return
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus()
      }
      return clients.openWindow('/')
    })
  )
})
