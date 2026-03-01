import { NextRequest, NextResponse } from 'next/server'
import webpush from 'web-push'

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BF_MOCK_KEY_FOR_DEVELOPMENT'
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || 'MOCK_PRIVATE_KEY'

webpush.setVapidDetails(
  'mailto:nexus@app.com',
  vapidPublicKey,
  vapidPrivateKey
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, title, body: messageBody, tag } = body
  
    if (!subscription) {
      return NextResponse.json({ error: 'No subscription' }, { status: 400 })
    }
    
    return NextResponse.json({ success: true, message: 'Notification queued' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
