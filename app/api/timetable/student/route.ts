// app/api/timetable/student/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user.studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the student's ID from their studentId
    const student = await prisma.student.findUnique({
      where: { studentId: session.user.studentId },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Get all enrolled courses for the student
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: student.id,
        status: { in: ["ENROLLED", "WAITLISTED"] }, // Only active enrollments
      },
      include: {
        course: {
          include: {
            classSessions: true,
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

    // Format the timetable data for the frontend
    const timetable = enrollments
      .flatMap((enrollment) =>
        enrollment.course.classSessions.map((session) => ({
          id: session.id,
          courseCode: enrollment.course.courseCode,
          courseName: enrollment.course.title,
          instructor: `${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`,
          day: session.day,
          startTime: session.startTime,
          endTime: session.endTime,
          location: session.location,
          type: session.type,
        }))
      )
      .sort((a, b) => {
        // Sort by day of week and then by start time
        const days = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ];
        const dayCompare =
          days.indexOf(a.day.toLowerCase()) - days.indexOf(b.day.toLowerCase());
        if (dayCompare !== 0) return dayCompare;

        return a.startTime.localeCompare(b.startTime);
      });

    // Group by day for the UI
    const weeklySchedule = {
      monday: timetable.filter((s) => s.day.toLowerCase() === "monday"),
      tuesday: timetable.filter((s) => s.day.toLowerCase() === "tuesday"),
      wednesday: timetable.filter((s) => s.day.toLowerCase() === "wednesday"),
      thursday: timetable.filter((s) => s.day.toLowerCase() === "thursday"),
      friday: timetable.filter((s) => s.day.toLowerCase() === "friday"),
      saturday: timetable.filter((s) => s.day.toLowerCase() === "saturday"),
      sunday: timetable.filter((s) => s.day.toLowerCase() === "sunday"),
    };

    return NextResponse.json(weeklySchedule);
  } catch (error) {
    console.error("Error fetching student timetable:", error);
    return NextResponse.json(
      { error: "Failed to fetch timetable" },
      { status: 500 }
    );
  }
}
