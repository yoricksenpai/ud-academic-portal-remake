import { PrismaClient, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const password = "admin123"; // Change avec un vrai mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Nettoyage de la base de données - optionnel, enlever si vous voulez ajouter aux données existantes
  console.log('🗑️ Nettoyage de la base de données...');
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.student.deleteMany({});
  
  console.log('🧑‍🏫 Création des enseignants...');
  const instructors = await Promise.all([
    prisma.instructor.create({
      data: {
        staffId: `PROF-${randomUUID().substring(0, 6)}`,
        firstName: 'Marie',
        lastName: 'Curie',
        email: 'marie.curie@universite.fr',
        password: hashedPassword,
        department: 'Sciences Physiques',
      },
    }),
    prisma.instructor.create({
      data: {
        staffId: `PROF-${randomUUID().substring(0, 6)}`,
        firstName: 'Albert',
        lastName: 'Einstein',
        email: 'albert.einstein@universite.fr',
        password: hashedPassword,
        department: 'Mathématiques',
      },
    }),
    prisma.instructor.create({
      data: {
        staffId: `PROF-${randomUUID().substring(0, 6)}`,
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada.lovelace@universite.fr',
        password: hashedPassword,
        department: 'Informatique',
      },
    }),
    prisma.instructor.create({
      data: {
        staffId: `PROF-${randomUUID().substring(0, 6)}`,
        firstName: 'René',
        lastName: 'Descartes',
        email: 'rene.descartes@universite.fr',
        password: hashedPassword,
        department: 'Philosophie',
      },
    }),
  ]);

  console.log('📚 Création des cours...');
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        courseCode: 'PHY101',
        title: 'Introduction à la Physique',
        description: 'Principes fondamentaux de la physique classique',
        credits: 3,
        semester: 'Automne 2023',
        instructorId: instructors[0].id,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'MATH201',
        title: 'Calcul Avancé',
        description: 'Théorie et applications du calcul différentiel et intégral',
        credits: 4,
        semester: 'Printemps 2024',
        instructorId: instructors[1].id,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'CS303',
        title: 'Algorithmes et Structures de Données',
        description: 'Conception et analyse d\'algorithmes efficaces',
        credits: 4,
        semester: 'Automne 2023',
        instructorId: instructors[2].id,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'PHIL202',
        title: 'Logique et Raisonnement',
        description: 'Introduction aux principes de la logique formelle',
        credits: 3,
        semester: 'Printemps 2024',
        instructorId: instructors[3].id,
      },
    }),
    prisma.course.create({
      data: {
        courseCode: 'CS101',
        title: 'Introduction à la Programmation',
        description: 'Bases de la programmation avec Python',
        credits: 3,
        semester: 'Automne 2023',
        instructorId: instructors[2].id,
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
        password: hashedPassword,
        dateOfBirth: new Date('1999-05-15'),
        enrolledYear: 2021,
        major: 'Informatique',
        academicYear: "2023-2024", 
        faculty: "Engineering", 
        program: "Bachelor of Science", 
        level: "Undergraduate"
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Sophie',
        lastName: 'Dubois',
        email: 'sophie.dubois@etudiant.fr',
        password: hashedPassword,
        dateOfBirth: new Date('2000-03-22'),
        enrolledYear: 2022,
        major: 'Physique',
        academicYear: "2023-2024",
        faculty: "Engineering",
        program: "Bachelor of Science",
        level: "Undergraduate"
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Alexandre',
        lastName: 'Petit',
        email: 'alexandre.petit@etudiant.fr',
        password: hashedPassword,
        dateOfBirth: new Date('1998-11-07'),
        enrolledYear: 2020,
        major: 'Mathématiques',
        academicYear: "2023-2024",
        faculty: "Engineering",
        program: "Bachelor of Science",
        level: "Undergraduate"
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Emma',
        lastName: 'Leroy',
        email: 'emma.leroy@etudiant.fr',
        password: hashedPassword,
        dateOfBirth: new Date('2001-09-30'),
        enrolledYear: 2023,
        major: 'Philosophie',
        academicYear: "2023-2024",
        faculty: "Engineering",
        program: "Bachelor of Science",
        level: "Undergraduate"
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Lucas',
        lastName: 'Moreau',
        email: 'lucas.moreau@etudiant.fr',
        password: hashedPassword,
        dateOfBirth: new Date('1999-01-18'),
        enrolledYear: 2021,
        major: 'Informatique',
        academicYear: "2023-2024",
        faculty: "Engineering",
        program: "Bachelor of Science",
        level: "Undergraduate"
      },
    }),
    prisma.student.create({
      data: {
        studentId: `ETU-${randomUUID().substring(0, 6)}`,
        firstName: 'Chloé',
        lastName: 'Roux',
        email: 'chloe.roux@etudiant.fr',
        password: hashedPassword,
        dateOfBirth: new Date('2000-07-12'),
        enrolledYear: 2022,
        major: 'Physique',
        academicYear: "2023-2024", 
        faculty: "Engineering", 
        program: "Bachelor of Science", 
        level: "Undergraduate"
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
        courseId: courses[2].id, // CS303: Algorithmes
        status: Status.ENROLLED,
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[4].id, // CS101: Intro à la Programmation
        status: Status.ENROLLED,
        grade: 'A',
      },
    }),
    
    // Sophie Dubois
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[0].id, // PHY101: Intro à la Physique
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
        courseId: courses[3].id, // PHIL202: Logique et Raisonnement
        status: Status.DROPPED,
      },
    }),
    
    // Emma Leroy
    prisma.enrollment.create({
      data: {
        studentId: students[3].id,
        courseId: courses[3].id, // PHIL202: Logique et Raisonnement
        status: Status.ENROLLED,
      },
    }),
    
    // Lucas Moreau
    prisma.enrollment.create({
      data: {
        studentId: students[4].id,
        courseId: courses[2].id, // CS303: Algorithmes
        status: Status.COMPLETED,
        grade: 'A-',
      },
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[4].id,
        courseId: courses[4].id, // CS101: Intro à la Programmation
        status: Status.COMPLETED,
        grade: 'A+',
      },
    }),
    
    // Chloé Roux
    prisma.enrollment.create({
      data: {
        studentId: students[5].id,
        courseId: courses[0].id, // PHY101: Intro à la Physique
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

  console.log('✅ Données de test générées avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
