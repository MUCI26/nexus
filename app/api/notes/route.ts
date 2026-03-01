import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notes - Alle Notizen abrufen
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// POST /api/notes - Neue Notiz erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, tags, isFavorite } = body
    
    const note = await prisma.note.create({
      data: {
        title,
        content,
        tags: tags ? JSON.stringify(tags) : null,
        isFavorite: isFavorite || false
      }
    })
    
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
