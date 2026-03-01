import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/thoughts - Alle Gedanken abrufen
export async function GET() {
  try {
    const thoughts = await prisma.thought.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(thoughts)
  } catch (error) {
    console.error('Thoughts GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch thoughts' }, { status: 500 })
  }
}

// POST /api/thoughts - Neuen Gedanken erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, mood } = body
    
    const thought = await prisma.thought.create({
      data: {
        content,
        mood: mood || '🤔',
        userId: 'temp-user-id'
      }
    })
    
    return NextResponse.json(thought, { status: 201 })
  } catch (error) {
    console.error('Thoughts POST error:', error)
    return NextResponse.json({ error: 'Failed to create thought' }, { status: 500 })
  }
}
