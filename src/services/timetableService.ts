// src/services/timetableService.ts
import prisma from "../prisma";

export class TimetableService {
  /**
   * Get all class sessions with optional filtering
   */
  async getAllSessions(
    filters: {
      courseId?: number;
      day?: string;
      type?: string;
    } = {}
  ) {
    const where: any = {};
    if (filters.courseId) where.courseId = filters.courseId;
    if (filters.day) where.day = filters.day;
    if (filters.type) where.type = filters.type;

    return prisma.classSession.findMany({
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
  }

  /**
   * Get a specific class session by ID
   */
  async getSessionById(id: number) {
    return prisma.classSession.findUnique({
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
  }

  /**
   * Create a new class session
   */
  async createSession(data: {
    courseId: number;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    type: string;
    repeatWeekly?: boolean;
    startDate: Date;
    endDate?: Date | null;
  }) {
    return prisma.classSession.create({
      data: {
        courseId: data.courseId,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        type: data.type,
        repeatWeekly: data.repeatWeekly ?? true,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  }

  /**
   * Update an existing class session
   */
  async updateSession(
    id: number,
    data: Partial<{
      courseId: number;
      day: string;
      startTime: string;
      endTime: string;
      location: string;
      type: string;
      repeatWeekly: boolean;
      startDate: Date;
      endDate: Date | null;
    }>
  ) {
    return prisma.classSession.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a class session
   */
  async deleteSession(id: number) {
    return prisma.classSession.delete({
      where: { id },
    });
  }

  /**
   * Get timetable for a specific student
   */
  async getStudentTimetable(studentId: string) {
    // Get the student's database ID from their studentId
    const student = await prisma.student.findUnique({
      where: { studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // Get active enrollments
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: student.id,
        status: { in: ["ENROLLED", "WAITLISTED"] },
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

    // Format the data
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
    return {
      monday: timetable.filter((s) => s.day.toLowerCase() === "monday"),
      tuesday: timetable.filter((s) => s.day.toLowerCase() === "tuesday"),
      wednesday: timetable.filter((s) => s.day.toLowerCase() === "wednesday"),
      thursday: timetable.filter((s) => s.day.toLowerCase() === "thursday"),
      friday: timetable.filter((s) => s.day.toLowerCase() === "friday"),
      saturday: timetable.filter((s) => s.day.toLowerCase() === "saturday"),
      sunday: timetable.filter((s) => s.day.toLowerCase() === "sunday"),
    };
  }
}

export default new TimetableService();
