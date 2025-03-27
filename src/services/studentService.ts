import prisma from '../prisma';

export class StudentService {
  /**
   * Get all students
   */
  async getAllStudents() {
    return prisma.student.findMany();
  }

  /**
   * Get student by ID
   */
  async getStudentById(id: number) {
    return prisma.student.findUnique({
      where: { id },
      include: { enrollments: true }
    });
  }

  /**
   * Create a new student with inscription details
   */
  async createStudent(studentData: {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    enrolledYear: number;
    dateOfBirth?: Date;
    major?: string;
    academicYear: string;
    faculty: string;
    program: string;
    level: string;
    userId?: string;
  }) {
    return prisma.student.create({
      data: {
        ...studentData,
        status: 'PENDING',
      }
    });
  }

  /**
   * Update student information
   */
  async updateStudent(
    id: number,
    data: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      major: string;
    }>
  ) {
    return prisma.student.update({
      where: { id },
      data
    });
  }

  /**
   * Delete a student
   */
  async deleteStudent(id: number) {
    return prisma.student.delete({
      where: { id }
    });
  }

  /**
   * Enroll a student in a course
   */
  async enrollStudentInCourse(studentId: number, courseId: number) {
    return prisma.enrollment.create({
      data: {
        student: { connect: { id: studentId } },
        course: { connect: { id: courseId } }
      }
    });
  }

  /**
   * Get all courses a student is enrolled in
   */
  async getStudentCourses(studentId: number) {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true }
    });
    
    return enrollments.map(enrollment => enrollment.course);
  }
}

export default new StudentService();