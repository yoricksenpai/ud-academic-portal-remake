import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedCourse = await prisma.course.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        courseCode: data.courseCode,
        title: data.title,
        description: data.description,
        credits: data.credits,
        semester: data.semester,
        instructorId: parseInt(data.instructorId),
      },
      include: {
        instructor: true,
      },
    });
    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
