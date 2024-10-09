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

    const { title, image, rating, location, date, time, description, crowdLevel, latitude, longitude } = data;

    // Validate required fields
    if (
      !title ||
      !image ||
      rating === undefined ||
      !location ||
      !date ||
      !time ||
      !description ||
      !crowdLevel ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Validate crowdLevel against Prisma enum
    const validCrowdLevels = ['Low', 'Medium', 'High', 'VeryHigh', 'Extreme'];
    if (!validCrowdLevels.includes(crowdLevel)) {
      return NextResponse.json(
        { error: `Invalid crowdLevel. Must be one of: ${validCrowdLevels.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate latitude and longitude
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json({ error: 'Latitude and longitude must be numbers.' }, { status: 400 });
    }

    // Parse date and rating
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format.' }, { status: 400 });
    }

    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating)) {
      return NextResponse.json({ error: 'Rating must be a number.' }, { status: 400 });
    }

    const newEvent = await prisma.pujoEvent.create({
      data: {
        title,
        image,
        rating: parsedRating,
        location,
        date: parsedDate,
        time,
        description,
        crowdLevel,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating pujo event:', error);
    return NextResponse.json({ error: 'Failed to create pujo event' }, { status: 500 });
  }
}
