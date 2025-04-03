import { PrismaClient, Status } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  console.log('🗑️ Cleaning database...');
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.student.deleteMany({});
  
  console.log('🧑‍🏫 Creating instructors...');
  const instructors = await Promise.all([
    prisma.instructor.create({
      data: {
        firstName: 'Marie',
        lastName: 'Curie',
        email: 'marie.curie@univ-douala.cm',
        department: 'Physics',
      },
    }),
    prisma.instructor.create({
      data: {
        firstName: 'Albert',
        lastName: 'Einstein',
        email: 'albert.einstein@univ-douala.cm',
        department: 'Mathematics',
      },
    }),
    prisma.instructor.create({
      data: {
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
      },
    }),
  ]);

  console.log('📝 Création des inscriptions aux cours...');
  // Inscriptions avec différents statuts
  await Promise.all([
    // Thomas Martin
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[0].id, // CS101: Intro à la Programmation
        status: Status.ENROLLED,
        grade: 'A',
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[1].id, // MATH201: Calcul Avancé
        status: Status.ENROLLED,
      },
    }),
    
    // Sophie Dubois
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[2].id, // PHY101: Intro à la Physique
        status: Status.ENROLLED,
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[1].id, // MATH201: Calcul Avancé
        status: Status.WAITLISTED,
      },
    }),
    
    // Alexandre Petit
    prisma.enrollment.create({
      data: {
        studentId: students[2].id,
        courseId: courses[1].id, // MATH201: Calcul Avancé
        status: Status.ENROLLED,
        grade: 'B+',
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[2].id,
        courseId: courses[2].id, // PHY101: Intro à la Physique
        status: Status.DROPPED,
      },
    }),
    
    // Emma Leroy
    prisma.enrollment.create({
      data: {
        studentId: students[3].id,
        courseId: courses[2].id, // PHY101: Intro à la Physique
        status: Status.ENROLLED,
      },
    }),
    
    // Lucas Moreau
    prisma.enrollment.create({
      data: {
        studentId: students[4].id,
        courseId: courses[0].id, // CS101: Intro à la Programmation
        status: Status.COMPLETED,
        grade: 'A-',
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[4].id,
        courseId: courses[1].id, // MATH201: Calcul Avancé
        status: Status.COMPLETED,
        grade: 'A+',
      },
    }),
    
    // Chloé Roux
    prisma.enrollment.create({
      data: {
        studentId: students[5].id,
        courseId: courses[2].id, // PHY101: Intro à la Physique
        status: Status.ENROLLED,
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[5].id,
        courseId: courses[1].id, // MATH201: Calcul Avancé
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
