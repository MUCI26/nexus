import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/notes/[id] - Notiz aktualisieren
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, tags, isFavorite } = body
    
    const note = await prisma.note.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(tags && { tags: JSON.stringify(tags) }),
        ...(typeof isFavorite === 'boolean' && { isFavorite })
      }
    })
    
    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

// DELETE /api/notes/[id] - Notiz löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.note.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
