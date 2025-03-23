// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  // Check authentication
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        courseCode: true,
        title: true,
        instructor: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        courseCode: "asc",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
