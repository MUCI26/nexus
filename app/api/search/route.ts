import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/search?q=query - Globale Suche
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query) {
      return NextResponse.json({ notes: [], todos: [], thoughts: [] })
    }
    
    const searchFilter = {
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { content: { contains: query, mode: 'insensitive' as const } }
      ]
    }
    
    const [notes, todos, thoughts] = await Promise.all([
      prisma.note.findMany({ where: searchFilter, take: 10 }),
      prisma.todo.findMany({ where: searchFilter, take: 10 }),
      prisma.thought.findMany({ 
        where: { content: { contains: query, mode: 'insensitive' } }, 
        take: 10 
      })
    ])
    
    return NextResponse.json({ notes, todos, thoughts })
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
