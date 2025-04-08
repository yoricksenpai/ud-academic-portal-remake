
import { PrismaClient, Status } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Buffer } from 'buffer';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  console.log('🗑️ Cleaning database...');
  await prisma.enrollment.deleteMany({});
  await prisma.classSession.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.student.deleteMany({});
  
  console.log('🧑‍🏫 Creating instructors...');
  const instructors = await Promise.all([
    prisma.instructor.create({
      data: {
        staffId: `STAFF-${randomUUID().substring(0, 6)}`,
        firstName: 'Marie',
        lastName: 'Curie',
        email: 'marie.curie@univ-douala.cm',
        department: 'Physics',
      },
    }),
    prisma.instructor.create({
      data: {
        staffId: `STAFF-${randomUUID().substring(0, 6)}`,
        firstName: 'Albert',
        lastName: 'Einstein',
        email: 'albert.einstein@univ-douala.cm',
        department: 'Mathematics',
      },
    }),
    prisma.instructor.create({
      data: {
        staffId: `STAFF-${randomUUID().substring(0, 6)}`,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada.lovelace@univ-douala.cm',
        department: 'Computer Science',
      },
    }),
  ]);

  console.log('📚 Creating courses...');
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        courseCode: 'CS101',
        title: 'Introduction to Programming',
        description: 'Basic concepts of programming using Python',
        credits: 3,
        semester: 'Fall 2023',
        instructorId: instructors[2].id, // Ada Lovelace
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'MATH201',
        title: 'Advanced Calculus',
        description: 'Differential and integral calculus',
        credits: 4,
        semester: 'Spring 2024',
        instructorId: instructors[1].id, // Einstein
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'PHY101',
        title: 'General Physics',
        description: 'Introduction to physics principles',
        credits: 3,
        semester: 'Fall 2023',
        instructorId: instructors[0].id, // Marie Curie
      },
    }),
  ]);

  // Store course IDs for later use
  const courseIds = courses.map(course => course.id);

  // Create class sessions for each course
  console.log('🗓️ Creating class sessions...');
  await Promise.all([
    // For CS101
    prisma.classSession.create({
      data: {
        // Connect by ID instead of using courseId directly
        course: {
          connect: { 
            id: courses[0].id 
          }
        },
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00',
        location: 'Room A101',
        type: 'CM',
        startDate: new Date('2023-09-04'),
        endDate: new Date('2023-12-15'),
      },
    }),
    prisma.classSession.create({
      data: {
        course: {
          connect: { 
            id: courses[0].id 
          }
        },
        day: 'Wednesday',
        startTime: '13:00',
        endTime: '15:00',
        location: 'Lab B205',
        type: 'TP',
        startDate: new Date('2023-09-06'),
        endDate: new Date('2023-12-13'),
      },
    }),
    
    // For MATH201
    prisma.classSession.create({
      data: {
        course: {
          connect: { 
            id: courses[1].id 
          }
        },
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '12:00',
        location: 'Room C103',
        type: 'CM',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-10'),
      },
    }),
    prisma.classSession.create({
      data: {
        course: {
          connect: { 
            id: courses[1].id 
          }
        },
        day: 'Thursday',
        startTime: '15:00',
        endTime: '17:00',
        location: 'Room C103',
        type: 'TD',
        startDate: new Date('2024-01-17'),
        endDate: new Date('2024-05-09'),
      },
    }),
    
    // For PHY101
    prisma.classSession.create({
      data: {
        course: {
          connect: { 
            id: courses[2].id 
          }
        },
        day: 'Monday',
        startTime: '14:00',
        endTime: '16:00',
        location: 'Room D201',
        type: 'CM',
        startDate: new Date('2023-09-04'),
        endDate: new Date('2023-12-15'),
      },
    }),
    prisma.classSession.create({
      data: {
        course: {
          connect: { 
            id: courses[2].id 
          }
        },
        day: 'Friday',
        startTime: '09:00',
        endTime: '12:00',
        location: 'Lab D109',
        type: 'TP',
        startDate: new Date('2023-09-08'),
        endDate: new Date('2023-12-15'),
      },
    }),
  ]);

  console.log('👨‍🎓 Création des étudiants...');
  const students = await Promise.all([
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Thomas',
        lastName: 'Martin',
        email: 'thomas.martin@etudiant.fr',
        dateOfBirth: new Date('1999-05-15'),
        enrolledYear: 2021,
        major: 'Informatique',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Sciences',
        program: 'Computer Science',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 12 34 56 78',

      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Sophie',
        lastName: 'Dubois',
        email: 'sophie.dubois@etudiant.fr',
        dateOfBirth: new Date('2000-03-22'),
        enrolledYear: 2022,
        major: 'Physique',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Sciences',
        program: 'Physics',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 23 45 67 89',
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Alexandre',
        lastName: 'Petit',
        email: 'alexandre.petit@etudiant.fr',
        dateOfBirth: new Date('1998-11-07'),
        enrolledYear: 2020,
        major: 'Mathématiques',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Sciences',
        program: 'Mathematics',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 34 56 78 90',
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Emma',
        lastName: 'Leroy',
        email: 'emma.leroy@etudiant.fr',
        dateOfBirth: new Date('2001-09-30'),
        enrolledYear: 2023,
        major: 'Philosophie',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Arts & Humanities',
        program: 'Philosophy',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 45 67 89 01',
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Lucas',
        lastName: 'Moreau',
        email: 'lucas.moreau@etudiant.fr',
        dateOfBirth: new Date('1999-01-18'),
        enrolledYear: 2021,
        major: 'Informatique',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Sciences',
        program: 'Computer Science',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 56 78 90 12',

      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Chloé',
        lastName: 'Roux',
        email: 'chloe.roux@etudiant.fr',
        dateOfBirth: new Date('2000-07-12'),
        enrolledYear: 2022,
        major: 'Physique',
        // Required fields from schema
        academicYear: '2023-2024',
        faculty: 'Sciences',
        program: 'Physics',
        level: 'Undergraduate',
        // Optional fields
        phoneNumber: '+33 6 67 89 01 23',
      },
    }),
  ]);

  console.log('📝 Création des inscriptions aux cours...');
  // Use connect syntax for enrollment relations too
  await Promise.all([
    // Thomas Martin
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[0].id } },
        course: { connect: { id: courses[0].id } },
        status: Status.ENROLLED,
        grade: 'A',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[0].id } },
        course: { connect: { id: courses[1].id } },
        status: Status.ENROLLED,
      },
    }),
    
    // Sophie Dubois
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[1].id } },
        course: { connect: { id: courses[2].id } },
        status: Status.ENROLLED,
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[1].id } },
        course: { connect: { id: courses[1].id } },
        status: Status.WAITLISTED,
      },
    }),
    
    // Alexandre Petit
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[2].id } },
        course: { connect: { id: courses[1].id } },
        status: Status.ENROLLED,
        grade: 'B+',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[2].id } },
        course: { connect: { id: courses[2].id } },
        status: Status.DROPPED,
      },
    }),
    
    // Emma Leroy
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[3].id } },
        course: { connect: { id: courses[2].id } },
        status: Status.ENROLLED,
      },
    }),
    
    // Lucas Moreau
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[4].id } },
        course: { connect: { id: courses[0].id } },
        status: Status.COMPLETED,
        grade: 'A-',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[4].id } },
        course: { connect: { id: courses[1].id } },
        status: Status.COMPLETED,
        grade: 'A+',
      },
    }),
    
    // Chloé Roux
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[5].id } },
        course: { connect: { id: courses[2].id } },
        status: Status.ENROLLED,
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[5].id } },
        course: { connect: { id: courses[1].id } },
        status: Status.ENROLLED,
      },
    }),
  ]);

  console.log('✅ Test data generated successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
