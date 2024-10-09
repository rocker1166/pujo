// app/api/pandal/[id]/comments/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const commentsData = await prisma.comment.findMany({
    where: { pujoEventId: Number(id) },
  });

  return NextResponse.json(commentsData);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  const newComment = await prisma.comment.create({
    data: {
      text: body.text,
      pujoEventId: Number(id),
    },
  });

  return NextResponse.json(newComment);
}
