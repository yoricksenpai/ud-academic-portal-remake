import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import studentService from '@/src/services/studentService';

// Type pour les inscriptions
interface Inscription {
  id: string
  userId: string
  academicYear: string
  faculty: string
  program: string
  level: string
  registrationDate: string
  status: "pending" | "validated" | "rejected"
}

// Simuler une base de données d'inscriptions
const inscriptionsDB: Inscription[] = [
  {
    id: "INS-2024-001",
    userId: "1",
    academicYear: "2024-2025",
    faculty: "École Nationale Supérieure Polytechnique",
    program: "Génie Informatique",
    level: "Niveau 3",
    registrationDate: "2024-09-15",
    status: "validated",
  },
  {
    id: "INS-2023-042",
    userId: "1",
    academicYear: "2023-2024",
    faculty: "École Nationale Supérieure Polytechnique",
    program: "Génie Informatique",
    level: "Niveau 2",
    registrationDate: "2023-09-12",
    status: "validated",
  },
]

export async function GET() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const inscriptions = await studentService.getAllStudents();
    return NextResponse.json(inscriptions)
  } catch (error) {
    console.error("Error fetching inscriptions:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Générer un ID unique pour la nouvelle inscription
    const newId = `INS-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    const newInscription: Inscription = {
      id: newId,
      userId: "1", // Dans une application réelle, ce serait l'ID de l'utilisateur connecté
      academicYear: data.academicYear,
      faculty: data.faculty,
      program: data.program,
      level: data.level,
      registrationDate: new Date().toISOString().split("T")[0],
      status: "pending",
    }

    // Ajouter la nouvelle inscription à la "base de données"
    inscriptionsDB.push(newInscription)

    return NextResponse.json(newInscription)
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Trouver l'inscription à mettre à jour
    const inscriptionIndex = inscriptionsDB.findIndex((i) => i.id === data.id)

    if (inscriptionIndex === -1) {
      return NextResponse.json({ error: "Inscription non trouvée" }, { status: 404 })
    }

    // Mettre à jour l'inscription
    inscriptionsDB[inscriptionIndex] = {
      ...inscriptionsDB[inscriptionIndex],
      ...data,
    }

    return NextResponse.json(inscriptionsDB[inscriptionIndex])
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID d'inscription requis" }, { status: 400 })
    }

    // Trouver l'index de l'inscription à supprimer
    const inscriptionIndex = inscriptionsDB.findIndex((i) => i.id === id)

    if (inscriptionIndex === -1) {
      return NextResponse.json({ error: "Inscription non trouvée" }, { status: 404 })
    }

    // Vérifier si l'inscription peut être supprimée (non validée)
    if (inscriptionsDB[inscriptionIndex].status === "validated") {
      return NextResponse.json({ error: "Impossible de supprimer une inscription validée" }, { status: 400 })
    }

    // Supprimer l'inscription
    inscriptionsDB.splice(inscriptionIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

