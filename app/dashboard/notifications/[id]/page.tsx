"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, Calendar, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Données factices pour les notifications (même que dans la page précédente)
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
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Fonction pour formater l'heure
function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function NotificationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [notification, setNotification] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      const found = notifications.find((n) => n.id === params.id)
      setNotification(found || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

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

  if (loading) {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-64" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-40" />
            </CardFooter>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  if (!notification) {
    return (
      <DashboardShell>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Notification introuvable</h1>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Notification introuvable</h3>
              <p className="text-sm text-muted-foreground mb-4">
                La notification que vous recherchez n'existe pas ou a été supprimée.
              </p>
              <Button onClick={() => router.push("/dashboard/notifications")}>Retour aux notifications</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Détail de la notification</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{notification.title}</CardTitle>
                <Badge variant={notification.important ? "destructive" : "secondary"}>{notification.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(notification.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(notification.date)}</span>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p>{notification.content}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/notifications")}>
                Retour aux notifications
              </Button>
              <Button onClick={() => router.push("/dashboard")}>Aller au tableau de bord</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

