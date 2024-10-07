// app/api/pujo-events/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.pujoEvent.findMany({
      orderBy: {
        date: 'asc',
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching pujo events:', error);
    return NextResponse.json({ error: 'Failed to fetch pujo events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    const { title, image, rating, location, date, time, description, crowdLevel } = data;

    if (!title || !image || !rating || !location || !date || !time || !description || !crowdLevel) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validate crowdLevel against Prisma enum
    const validCrowdLevels = ['Low', 'Medium', 'High', 'VeryHigh', 'Extreme'];
    if (!validCrowdLevels.includes(crowdLevel)) {
      return NextResponse.json({ error: `Invalid crowdLevel. Must be one of: ${validCrowdLevels.join(', ')}` }, { status: 400 });
    }

    const newEvent = await prisma.pujoEvent.create({
      data: {
        title,
        image,
        rating,
        location,
        date: new Date(date),
        time,
        description,
        crowdLevel,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating pujo event:', error);
    return NextResponse.json({ error: 'Failed to create pujo event' }, { status: 500 });
  }
}
