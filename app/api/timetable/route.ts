// app/api/timetable/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";
import { getServerSession } from "next-auth";

// GET all sessions (with filtering)
export async function GET(request: NextRequest) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;

  // Check authentication
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract filter parameters
    const courseId = searchParams.get("courseId");
    const day = searchParams.get("day");
    const type = searchParams.get("type");

    // Build where clause
    const where: any = {};
    if (courseId) where.courseId = parseInt(courseId);
    if (day) where.day = day;
    if (type) where.type = type;

    const classSessions = await prisma.classSession.findMany({
      where,
      include: {
        course: {
          select: {
            courseCode: true,
            title: true,
            instructor: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json(classSessions);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      { error: "Failed to fetch timetable" },
      { status: 500 }
    );
  }
}

// POST a new session (admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession();

  // Check authentication and authorization
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "courseId",
      "day",
      "startTime",
      "endTime",
      "location",
      "type",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new class session
    const newSession = await prisma.classSession.create({
      data: {
        courseId: parseInt(data.courseId),
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        type: data.type,
        repeatWeekly: data.repeatWeekly ?? true,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });

    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    console.error("Error creating class session:", error);
    return NextResponse.json(
      { error: "Failed to create class session" },
      { status: 500 }
    );
  }
}
