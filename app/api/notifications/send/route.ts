import { NextRequest, NextResponse } from 'next/server'

// Lazy initialization - only when needed
let webpush: typeof import('web-push') | null = null

function getWebPush() {
  if (!webpush) {
    webpush = require('web-push')
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY
    
    // Only set VAPID if keys are provided
    if (vapidPublicKey && vapidPrivateKey && vapidPublicKey.length > 20) {
      try {
        webpush.setVapidDetails(
          'mailto:nexus@app.com',
          vapidPublicKey,
          vapidPrivateKey
        )
      } catch (e) {
        console.warn('VAPID setup failed:', e)
      }
    }
  }
  return webpush
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, title, body: messageBody, tag } = body
  
    if (!subscription) {
      return NextResponse.json({ error: 'No subscription' }, { status: 400 })
    }
    
    // Try to send notification if VAPID is configured
    const wp = getWebPush()
    if (wp && process.env.VAPID_PUBLIC_KEY) {
      try {
        const payload = JSON.stringify({ title, body: messageBody, tag })
        await wp.sendNotification(subscription, payload)
      } catch (e) {
        console.warn('Push failed:', e)
      }
    }
    
    return NextResponse.json({ success: true, message: 'Notification queued' })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
