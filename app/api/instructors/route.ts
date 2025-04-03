import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";

export async function GET(request: NextRequest) {
  try {
    const instructors = await prisma.instructor.findMany({
      select: {
        id: true,
        staffId: true,
        firstName: true,
        lastName: true,
        email: true,
        department: true,
      },
      orderBy: {
        lastName: 'asc',
      },
    });

    return NextResponse.json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newInstructor = await prisma.instructor.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        department: data.department,
        staffId: `INST-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      },
      select: {
        id: true,
        staffId: true,
        firstName: true,
        lastName: true,
        email: true,
        department: true,
      }
    });
    return NextResponse.json(newInstructor, { status: 201 });
  } catch (error) {
    console.error("Error creating instructor:", error);
    return NextResponse.json(
      { error: "Failed to create instructor" },
      { status: 500 }
    );
  }
}
