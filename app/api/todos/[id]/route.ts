import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/todos/[id] - Todo aktualisieren
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, priority, dueDate, isCompleted } = body
    
    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(typeof isCompleted === 'boolean' && { isCompleted })
      }
    })
    
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

// DELETE /api/todos/[id] - Todo löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
