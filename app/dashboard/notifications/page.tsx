"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle2, ChevronRight, Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Données factices pour les notifications
const notifications = [
  {
    id: "notif-001",
    title: "Résultats des examens disponibles",
    preview: "Les résultats des examens du premier semestre sont maintenant disponibles...",
    content:
      "Les résultats des examens du premier semestre sont maintenant disponibles. Vous pouvez les consulter dans la section 'Notes'. En cas de réclamation, veuillez contacter le secrétariat de votre département dans un délai de 72 heures.",
    date: "2023-05-15T10:30:00",
    category: "Académique",
    read: false,
    important: true,
  },
  {
    id: "notif-002",
    title: "Rappel de paiement",
    preview: "Nous vous rappelons que le dernier versement des frais de scolarité...",
    content:
      "Nous vous rappelons que le dernier versement des frais de scolarité doit être effectué avant le 30 mai 2023. Passé ce délai, des pénalités de retard seront appliquées conformément au règlement financier de l'université. Veuillez effectuer votre paiement dans les meilleurs délais.",
    date: "2023-05-10T14:15:00",
    category: "Finance",
    read: true,
    important: true,
  },
  {
    id: "notif-003",
    title: "Modification de l'emploi du temps",
    preview: "Suite à l'indisponibilité du Dr. Kamga, le cours de Mathématiques...",
    content:
      "Suite à l'indisponibilité du Dr. Kamga, le cours de Mathématiques Appliquées prévu ce jeudi 18 mai est reporté au vendredi 19 mai de 14h à 17h dans l'amphithéâtre B. Veuillez prendre note de ce changement et ajuster votre planning en conséquence.",
    date: "2023-05-16T09:00:00",
    category: "Emploi du temps",
    read: false,
    important: false,
  },
  {
    id: "notif-004",
    title: "Atelier de préparation professionnelle",
    preview: "Un atelier de rédaction de CV et préparation aux entretiens...",
    content:
      "Un atelier de rédaction de CV et préparation aux entretiens d'embauche sera organisé le 25 mai 2023 de 13h à 17h au Centre de Carrières. Cet atelier est gratuit pour tous les étudiants de l'université. Les places sont limitées, veuillez vous inscrire via le portail étudiant avant le 20 mai.",
    date: "2023-05-12T11:45:00",
    category: "Événement",
    read: true,
    important: false,
  },
  {
    id: "notif-005",
    title: "Maintenance du système informatique",
    preview: "Une maintenance du système informatique est prévue ce weekend...",
    content:
      "Une maintenance du système informatique est prévue ce weekend du 20 au 21 mai. Pendant cette période, le portail étudiant et certains services numériques seront temporairement indisponibles. Nous nous excusons pour la gêne occasionnée et vous remercions de votre compréhension.",
    date: "2023-05-17T16:30:00",
    category: "Système",
    read: false,
    important: true,
  },
]

// Fonction pour formater la date
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return `Aujourd'hui à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  } else if (diffDays === 1) {
    return `Hier à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  } else {
    return `${date.toLocaleDateString("fr-FR")} à ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  }
}

export default function NotificationsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string | null>(null)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Filtrer les notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (showUnreadOnly && notification.read) return false
    if (filter && notification.category !== filter) return false
    return true
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  }

  // Catégories uniques pour le filtre
  const categories = Array.from(new Set(notifications.map((n) => n.category)))

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Consultez vos notifications et annonces importantes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowUnreadOnly(!showUnreadOnly)}>
              <CheckCircle2 className="h-4 w-4" />
              {showUnreadOnly ? "Afficher tout" : "Non lues uniquement"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem checked={filter === null} onCheckedChange={() => setFilter(null)}>
                  Toutes les catégories
                </DropdownMenuCheckboxItem>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={filter === category}
                    onCheckedChange={() => setFilter(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucune notification</h3>
                <p className="text-sm text-muted-foreground">
                  {showUnreadOnly
                    ? "Vous n'avez aucune notification non lue pour le moment."
                    : "Vous n'avez aucune notification pour le moment."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div key={notification.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Card
                  className={`cursor-pointer transition-colors ${notification.read ? "" : "border-l-4 border-l-primary"}`}
                  onClick={() => router.push(`/dashboard/notifications/${notification.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription>{notification.preview}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={notification.important ? "destructive" : "secondary"}>
                          {notification.category}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{formatDate(notification.date)}</span>
                      {!notification.read && (
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          Non lu
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

