"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  CalendarDays,
} from "lucide-react"

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

// Données pour les événements du calendrier
const calendarEvents = [
  {
    id: "event-001",
    title: "Rentrée académique",
    date: "2025-10-05",
    endDate: null,
    category: "Administratif",
    description: "Début officiel de l'année académique 2025-2026",
    location: "Campus principal",
  },
  {
    id: "event-002",
    title: "Début des cours du premier semestre",
    date: "2025-10-12",
    endDate: null,
    category: "Académique",
    description: "Début des enseignements pour le premier semestre",
    location: "Tous les campus",
  },
  {
    id: "event-003",
    title: "Cérémonie d'accueil des nouveaux étudiants",
    date: "2025-10-15",
    endDate: null,
    category: "Événement",
    description: "Cérémonie officielle d'accueil des nouveaux étudiants",
    location: "Amphithéâtre 1000",
  },
  {
    id: "event-004",
    title: "Date limite d'inscription administrative",
    date: "2025-10-30",
    endDate: null,
    category: "Administratif",
    description: "Date limite pour finaliser l'inscription administrative",
    location: "Service de la scolarité",
  },
  {
    id: "event-005",
    title: "Examens partiels du premier semestre",
    date: "2025-12-15",
    endDate: "2025-12-20",
    category: "Examen",
    description: "Évaluations partielles du premier semestre",
    location: "Selon les facultés",
  },
  {
    id: "event-006",
    title: "Vacances de fin d'année",
    date: "2025-12-22",
    endDate: "2026-01-05",
    category: "Vacances",
    description: "Vacances de Noël et du Nouvel An",
    location: null,
  },
  {
    id: "event-007",
    title: "Reprise des cours",
    date: "2026-01-06",
    endDate: null,
    category: "Académique",
    description: "Reprise des enseignements après les vacances de fin d'année",
    location: "Tous les campus",
  },
  {
    id: "event-008",
    title: "Examens du premier semestre",
    date: "2026-02-01",
    endDate: "2026-02-15",
    category: "Examen",
    description: "Examens finaux du premier semestre",
    location: "Selon les facultés",
  },
  {
    id: "event-009",
    title: "Début des cours du second semestre",
    date: "2026-03-01",
    endDate: null,
    category: "Académique",
    description: "Début des enseignements pour le second semestre",
    location: "Tous les campus",
  },
  {
    id: "event-010",
    title: "Journée portes ouvertes",
    date: "2026-03-15",
    endDate: null,
    category: "Événement",
    description: "Journée de présentation de l'université aux futurs étudiants",
    location: "Campus principal",
  },
  {
    id: "event-011",
    title: "Vacances de Pâques",
    date: "2026-04-10",
    endDate: "2026-04-20",
    category: "Vacances",
    description: "Vacances de Pâques",
    location: null,
  },
  {
    id: "event-012",
    title: "Examens du second semestre",
    date: "2026-06-01",
    endDate: "2026-06-15",
    category: "Examen",
    description: "Examens finaux du second semestre",
    location: "Selon les facultés",
  },
  {
    id: "event-013",
    title: "Délibérations et publication des résultats",
    date: "2026-07-01",
    endDate: "2026-07-15",
    category: "Administratif",
    description: "Délibérations des jurys et publication des résultats académiques",
    location: "Administration centrale",
  },
  {
    id: "event-014",
    title: "Cérémonie de remise des diplômes",
    date: "2026-07-30",
    endDate: null,
    category: "Événement",
    description: "Cérémonie officielle de remise des diplômes aux lauréats",
    location: "Palais des Sports",
  },
  {
    id: "event-015",
    title: "Vacances d'été",
    date: "2026-08-01",
    endDate: "2026-09-30",
    category: "Vacances",
    description: "Vacances d'été",
    location: null,
  },
]

// Données pour les semestres
const semesters = [
  {
    id: "sem-1",
    name: "Premier semestre",
    startDate: "2025-10-12",
    endDate: "2026-02-15",
    description: "Période d'enseignement et d'évaluation du premier semestre",
  },
  {
    id: "sem-2",
    name: "Second semestre",
    startDate: "2026-03-01",
    endDate: "2026-06-15",
    description: "Période d'enseignement et d'évaluation du second semestre",
  },
]

// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" }
  return new Date(dateString).toLocaleDateString("fr-FR", options)
}

// Fonction pour obtenir la couleur de la catégorie
const getCategoryColor = (category) => {
  switch (category) {
    case "Académique":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Administratif":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Examen":
      return "bg-red-100 text-red-800 border-red-200"
    case "Vacances":
      return "bg-green-100 text-green-800 border-green-200"
    case "Événement":
      return "bg-amber-100 text-amber-800 border-amber-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Fonction pour obtenir l'icône de la catégorie
const getCategoryIcon = (category) => {
  switch (category) {
    case "Académique":
      return <BookOpen className="h-4 w-4" />
    case "Administratif":
      return <Clock className="h-4 w-4" />
    case "Examen":
      return <GraduationCap className="h-4 w-4" />
    case "Vacances":
      return <Calendar className="h-4 w-4" />
    case "Événement":
      return <Award className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

export function CalendrierPage() {
  const [activeTab, setActiveTab] = useState("calendar")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { status } = useAuth()
  const router = useRouter()

  // Filtrer les événements par catégorie
  const filteredEvents =
    selectedCategory === "all" ? calendarEvents : calendarEvents.filter((event) => event.category === selectedCategory)

  // Filtrer les événements par mois et année
  const currentMonthEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
  })

  // Trier les événements par date
  const sortedEvents = [...currentMonthEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // Fonction pour naviguer entre les mois
  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = selectedMonth
    let newYear = selectedYear

    if (direction === "prev") {
      newMonth--
      if (newMonth < 0) {
        newMonth = 11
        newYear--
      }
    } else {
      newMonth++
      if (newMonth > 11) {
        newMonth = 0
        newYear++
      }
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  // Fonction pour obtenir le nom du mois
  const getMonthName = (month: number) => {
    const date = new Date()
    date.setMonth(month)
    return date.toLocaleString("fr-FR", { month: "long" })
  }

  // Fonction pour vérifier si une date a des événements
  const hasEvents = (date: Date) => {
    return filteredEvents.some((event) => {
      const eventStartDate = new Date(event.date)
      const eventEndDate = event.endDate ? new Date(event.endDate) : null

      if (eventEndDate) {
        return date >= eventStartDate && date <= eventEndDate
      } else {
        return (
          date.getDate() === eventStartDate.getDate() &&
          date.getMonth() === eventStartDate.getMonth() &&
          date.getFullYear() === eventStartDate.getFullYear()
        )
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader showLoginButton={status !== "authenticated"} onLoginClick={() => router.push("/")} />
      <MainNav />

      <motion.main
        className="flex-1 container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calendrier Académique</h1>
              <p className="text-muted-foreground">Consultez les dates importantes de l'année académique 2025-2026</p>
            </div>
            <CalendarDays className="h-12 w-12 text-primary" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="Académique">Académique</SelectItem>
                      <SelectItem value="Administratif">Administratif</SelectItem>
                      <SelectItem value="Examen">Examen</SelectItem>
                      <SelectItem value="Vacances">Vacances</SelectItem>
                      <SelectItem value="Événement">Événement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Légende</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Académique</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Administratif</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Examen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Vacances</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Événement</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger le calendrier
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Semestres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {semesters.map((semester) => (
                  <div key={semester.id} className="p-3 border rounded-md">
                    <h3 className="font-medium">{semester.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Du {formatDate(semester.startDate)} au {formatDate(semester.endDate)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{semester.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">Vue Calendrier</TabsTrigger>
                <TabsTrigger value="list">Vue Liste</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {getMonthName(selectedMonth)} {selectedYear}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      month={new Date(selectedYear, selectedMonth)}
                      modifiers={{
                        hasEvent: (date) => hasEvents(date),
                      }}
                      modifiersClassNames={{
                        hasEvent: "bg-primary/20 font-bold text-primary",
                      }}
                    />

                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Événements du mois</h3>
                      {sortedEvents.length > 0 ? (
                        <div className="space-y-3">
                          {sortedEvents.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {formatDate(event.date)}
                                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                                  </p>
                                </div>
                                <Badge variant="outline" className={getCategoryColor(event.category)}>
                                  <span className="flex items-center gap-1">
                                    {getCategoryIcon(event.category)}
                                    {event.category}
                                  </span>
                                </Badge>
                              </div>
                              {event.description && (
                                <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                              )}
                              {event.location && (
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                                  {event.location}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">Aucun événement pour ce mois</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des événements</CardTitle>
                    <CardDescription>Tous les événements de l'année académique 2025-2026</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {filteredEvents.length > 0 ? (
                        [...filteredEvents]
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((event) => (
                            <div key={event.id} className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
                              <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full flex items-center justify-center">
                                <div
                                  className={`h-6 w-6 rounded-full flex items-center justify-center text-white
                                  ${
                                    event.category === "Académique"
                                      ? "bg-blue-500"
                                      : event.category === "Administratif"
                                        ? "bg-purple-500"
                                        : event.category === "Examen"
                                          ? "bg-red-500"
                                          : event.category === "Vacances"
                                            ? "bg-green-500"
                                            : "bg-amber-500"
                                  }`}
                                >
                                  {getCategoryIcon(event.category)}
                                </div>
                              </div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{event.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(event.date)}
                                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                                  </p>
                                </div>
                                <Badge variant="outline" className={getCategoryColor(event.category)}>
                                  {event.category}
                                </Badge>
                              </div>
                              {event.description && (
                                <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                              )}
                              {event.location && <p className="text-xs text-muted-foreground mt-1">{event.location}</p>}
                            </div>
                          ))
                      ) : (
                        <p className="text-center text-muted-foreground py-4">Aucun événement trouvé</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

