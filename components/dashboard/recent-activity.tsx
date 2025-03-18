"use client"

import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { FileText, Calendar, CreditCard, User, Clock } from "lucide-react"

// Données d'exemple pour l'activité récente
const activities = [
  {
    id: "1",
    type: "login",
    description: "Connexion au système",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "2",
    type: "document",
    description: "Téléchargement de l'attestation d'inscription",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    type: "schedule",
    description: "Consultation de l'emploi du temps",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "4",
    type: "payment",
    description: "Paiement des frais de scolarité",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "5",
    type: "profile",
    description: "Mise à jour du profil",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
]

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "document":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "schedule":
        return <Calendar className="h-4 w-4 text-amber-500" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-green-500" />
      case "profile":
        return <User className="h-4 w-4 text-indigo-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: fr,
      })
    } catch (error) {
      return "Date inconnue"
    }
  }

  return (
    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
      {activities.map((activity) => (
        <div key={activity.id} className="p-2 rounded-md hover:bg-muted/70 transition-colors">
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-full bg-muted flex-shrink-0">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

