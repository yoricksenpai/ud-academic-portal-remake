// app/api/timetable/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";
import { getServerSession } from "next-auth";

// GET a specific session
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const classSession = await prisma.classSession.findUnique({
      where: { id },
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
    });

    if (!classSession) {
      return NextResponse.json(
        { error: "Class session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classSession);
  } catch (error) {
    console.error("Error fetching class session:", error);
    return NextResponse.json(
      { error: "Failed to fetch class session" },
      { status: 500 }
    );
  }
}

// UPDATE a session (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const data = await request.json();

    // Check if class session exists
    const existingSession = await prisma.classSession.findUnique({
      where: { id },
    });

    if (!existingSession) {
      return NextResponse.json(
        { error: "Class session not found" },
        { status: 404 }
      );
    }

    // Update the session
    const updatedSession = await prisma.classSession.update({
      where: { id },
      data: {
        courseId: data.courseId ? parseInt(data.courseId) : undefined,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        type: data.type,
        repeatWeekly: data.repeatWeekly,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error("Error updating class session:", error);
    return NextResponse.json(
      { error: "Failed to update class session" },
      { status: 500 }
    );
  }
}

// DELETE a session (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);

    // Check if class session exists
    const existingSession = await prisma.classSession.findUnique({
      where: { id },
    });

    if (!existingSession) {
      return NextResponse.json(
        { error: "Class session not found" },
        { status: 404 }
      );
    }

    // Delete the session
    await prisma.classSession.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting class session:", error);
    return NextResponse.json(
      { error: "Failed to delete class session" },
      { status: 500 }
    );
  }
}
