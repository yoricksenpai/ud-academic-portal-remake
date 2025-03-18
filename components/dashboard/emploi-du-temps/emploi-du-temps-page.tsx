"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Calendar, Clock, Download, MapPin, CalendarDays, CalendarIcon, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Types pour l'emploi du temps
interface CourseSession {
  id: string
  courseCode: string
  courseName: string
  instructor: string
  day: string
  startTime: string
  endTime: string
  location: string
  type: "CM" | "TD" | "TP"
}

interface WeeklySchedule {
  monday: CourseSession[]
  tuesday: CourseSession[]
  wednesday: CourseSession[]
  thursday: CourseSession[]
  friday: CourseSession[]
  saturday: CourseSession[]
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function EmploiDuTempsPage() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [selectedWeek, setSelectedWeek] = useState<string>("current")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Données d'exemple pour l'emploi du temps
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule | null>(null)

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setWeeklySchedule({
        monday: [
          {
            id: "1",
            courseCode: "INF3101",
            courseName: "Programmation Web",
            instructor: "Dr. KAMLA",
            day: "Lundi",
            startTime: "08:00",
            endTime: "10:00",
            location: "Amphi 300",
            type: "CM",
          },
          {
            id: "2",
            courseCode: "INF3102",
            courseName: "Bases de données avancées",
            instructor: "Dr. MBINKEU",
            day: "Lundi",
            startTime: "10:15",
            endTime: "12:15",
            location: "Salle 102",
            type: "TD",
          },
        ],
        tuesday: [
          {
            id: "3",
            courseCode: "INF3103",
            courseName: "Réseaux informatiques",
            instructor: "Prof. NZALI",
            day: "Mardi",
            startTime: "13:00",
            endTime: "15:00",
            location: "Amphi 200",
            type: "CM",
          },
        ],
        wednesday: [
          {
            id: "4",
            courseCode: "INF3101",
            courseName: "Programmation Web",
            instructor: "M. TAMO",
            day: "Mercredi",
            startTime: "08:00",
            endTime: "10:00",
            location: "Labo Info 3",
            type: "TP",
          },
        ],
        thursday: [
          {
            id: "5",
            courseCode: "INF3102",
            courseName: "Bases de données avancées",
            instructor: "Dr. MBINKEU",
            day: "Jeudi",
            startTime: "15:15",
            endTime: "17:15",
            location: "Labo Info 2",
            type: "TP",
          },
        ],
        friday: [
          {
            id: "6",
            courseCode: "INF3103",
            courseName: "Réseaux informatiques",
            instructor: "M. FOUDA",
            day: "Vendredi",
            startTime: "10:15",
            endTime: "12:15",
            location: "Salle 105",
            type: "TD",
          },
        ],
        saturday: [],
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Fonction pour obtenir la couleur de fond selon le type de cours
  const getSessionColor = (type: "CM" | "TD" | "TP") => {
    switch (type) {
      case "CM":
        return "bg-blue-100 border-blue-300 hover:bg-blue-200"
      case "TD":
        return "bg-green-100 border-green-300 hover:bg-green-200"
      case "TP":
        return "bg-purple-100 border-purple-300 hover:bg-purple-200"
      default:
        return "bg-gray-100 border-gray-300 hover:bg-gray-200"
    }
  }

  // Fonction pour rendre les sessions d'un jour
  const renderDaySessions = (day: CourseSession[] | undefined) => {
    if (!day || day.length === 0) {
      return <p className="text-center text-muted-foreground py-4">Aucun cours</p>
    }

    return day.map((session) => (
      <motion.div
        key={session.id}
        className={`p-3 mb-3 rounded-md border ${getSessionColor(session.type)} cursor-pointer transition-all`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold">{session.courseName}</h4>
          <span className="text-xs font-medium px-2 py-1 rounded bg-white">{session.type}</span>
        </div>
        <div className="text-sm space-y-1">
          <p className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {session.startTime} - {session.endTime}
          </p>
          <p className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {session.location}
          </p>
          <p className="flex items-center text-muted-foreground text-xs">
            <User className="h-3 w-3 mr-1" />
            {session.instructor}
          </p>
        </div>
      </motion.div>
    ))
  }

  const handleDownload = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Votre emploi du temps est en cours de téléchargement",
    })
  }

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mon emploi du temps</h1>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Semaine</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une semaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="previous">Semaine précédente</SelectItem>
                  <SelectItem value="current">Semaine actuelle</SelectItem>
                  <SelectItem value="next">Semaine prochaine</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Vue</label>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day" className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Jour
                </TabsTrigger>
                <TabsTrigger value="week" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Semaine
                </TabsTrigger>
                <TabsTrigger value="month" className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Mois
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Emploi du temps - Semaine du 11 au 16 Mars 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-64 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Lundi</h3>
                    {renderDaySessions(weeklySchedule?.monday)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Mardi</h3>
                    {renderDaySessions(weeklySchedule?.tuesday)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Mercredi</h3>
                    {renderDaySessions(weeklySchedule?.wednesday)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Jeudi</h3>
                    {renderDaySessions(weeklySchedule?.thursday)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Vendredi</h3>
                    {renderDaySessions(weeklySchedule?.friday)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-center py-2 bg-muted rounded-md">Samedi</h3>
                    {renderDaySessions(weeklySchedule?.saturday)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
            <span className="text-sm">Cours magistral (CM)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
            <span className="text-sm">Travaux dirigés (TD)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-2"></div>
            <span className="text-sm">Travaux pratiques (TP)</span>
          </div>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

