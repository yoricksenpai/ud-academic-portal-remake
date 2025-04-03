// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  // Check authentication
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const url = new URL(request.url);
    const managerId = url.searchParams.get("managerId");

    const courses = await prisma.course.findMany({
      where: managerId ? { instructorId: parseInt(managerId) } : undefined,
      select: {
        id: true,
        courseCode: true,
        title: true,
        description: true,
        credits: true,
        semester: true,
        instructor: {
          select: {
            id: true,
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

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  // Check authentication
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const data = await request.json();
    const newCourse = await prisma.course.create({
      data: {
        courseCode: data.courseCode,
        title: data.title,
        description: data.description,
        credits: data.credits,
        semester: data.semester,
        instructorId: parseInt( data.instructorId),
      },
    });
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
