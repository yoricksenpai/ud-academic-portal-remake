import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

// Type pour les notifications
interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  createdAt: string
}

// Simuler une base de données de notifications
const notificationsDB: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "Inscription validée",
    message: "Votre inscription pour l'année académique 2024-2025 a été validée.",
    type: "success",
    read: false,
    createdAt: "2025-03-10T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    title: "Nouveau cours ajouté",
    message: "Un nouveau cours a été ajouté à votre emploi du temps: INF3104 - Sécurité informatique.",
    type: "info",
    read: false,
    createdAt: "2025-03-12T14:15:00Z",
  },
  {
    id: "3",
    userId: "1",
    title: "Rappel de paiement",
    message: "N'oubliez pas de régler vos frais de scolarité avant le 31 mars 2025.",
    type: "warning",
    read: false,
    createdAt: "2025-03-13T09:00:00Z",
  },
]

export async function GET(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Récupérer les paramètres de requête
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const unreadOnly = searchParams.get("unreadOnly") === "true"

  // Filtrer les notifications
  let notifications = [...notificationsDB]

  if (userId) {
    notifications = notifications.filter((n) => n.userId === userId)
  }

  if (unreadOnly) {
    notifications = notifications.filter((n) => !n.read)
  }

  // Trier par date (plus récent en premier)
  notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(notifications)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const data = await request.json()

    // Marquer une notification comme lue
    if (data.action === "markAsRead" && data.notificationId) {
      const notification = notificationsDB.find((n) => n.id === data.notificationId)

      if (notification) {
        notification.read = true
        return NextResponse.json({ success: true })
      }

      return NextResponse.json({ error: "Notification non trouvée" }, { status: 404 })
    }

    // Marquer toutes les notifications comme lues
    if (data.action === "markAllAsRead" && data.userId) {
      const userNotifications = notificationsDB.filter((n) => n.userId === data.userId)

      userNotifications.forEach((notification) => {
        notification.read = true
      })

      return NextResponse.json({ success: true })
    }

    // Créer une nouvelle notification
    if (data.action === "create") {
      const newNotification: Notification = {
        id: `${Date.now()}`,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "info",
        read: false,
        createdAt: new Date().toISOString(),
      }

      notificationsDB.push(newNotification)

      return NextResponse.json(newNotification)
    }

    return NextResponse.json({ error: "Action non supportée" }, { status: 400 })
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

