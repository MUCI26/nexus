import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/todos - Alle Todos abrufen
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: [{ isCompleted: 'asc' }, { dueDate: 'asc' }]
    })
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

// POST /api/todos - Neues Todo erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, dueDate } = body
    
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        isCompleted: false
      }
    })
    
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}
