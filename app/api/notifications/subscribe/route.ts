import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, userId = 'temp-user-id' } = body
    
    // Speichere Subscription in DB (später mit echter User-ID)
    // Für jetzt: einfach erfolgreich zurückgeben
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
