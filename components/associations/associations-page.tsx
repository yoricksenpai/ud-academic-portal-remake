"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Search, Calendar, MapPin, Mail, Phone, UserPlus, Globe } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"

// Données factices pour les associations
const associations = [
  {
    id: "assoc-001",
    name: "Association des Étudiants en Informatique",
    acronym: "AEI",
    description: "Association regroupant les étudiants en informatique et technologies de l'Université de Douala.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Académique",
    members: 120,
    founded: "2010",
    president: "Michel Nguekam",
    location: "Campus principal, Bâtiment C, Salle 103",
    contact: {
      email: "aei@univ-douala.cm",
      phone: "+237 6XX XXX XXX",
      website: "https://aei.univ-douala.cm",
    },
    activities: [
      "Ateliers de programmation",
      "Hackathons",
      "Conférences techniques",
      "Visites d'entreprises",
      "Projets collaboratifs",
    ],
    events: [
      {
        title: "Hackathon IA",
        date: "2023-06-20",
        location: "Amphithéâtre B",
      },
      {
        title: "Séminaire sur la cybersécurité",
        date: "2023-07-15",
        location: "Salle de conférence",
      },
    ],
  },
  {
    id: "assoc-002",
    name: "Club de Débat et d'Éloquence",
    acronym: "CDE",
    description: "Club dédié à l'art oratoire, au débat et à l'éloquence.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Culture",
    members: 85,
    founded: "2015",
    president: "Sarah Ekambi",
    location: "Campus principal, Bâtiment D, Salle 45",
    contact: {
      email: "cde@univ-douala.cm",
      phone: "+237 6XX XXX XXX",
      website: null,
    },
    activities: [
      "Ateliers de prise de parole",
      "Concours d'éloquence",
      "Débats thématiques",
      "Formation en argumentation",
    ],
    events: [
      {
        title: "Tournoi de débat interuniversitaire",
        date: "2023-06-25",
        location: "Amphithéâtre A",
      },
    ],
  },
  {
    id: "assoc-003",
    name: "Association Sportive Universitaire",
    acronym: "ASU",
    description: "Association promouvant le sport et organisant des compétitions sportives universitaires.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Sport",
    members: 200,
    founded: "2005",
    president: "Paul Mbarga",
    location: "Complexe sportif universitaire",
    contact: {
      email: "asu@univ-douala.cm",
      phone: "+237 6XX XXX XXX",
      website: "https://asu.univ-douala.cm",
    },
    activities: ["Football", "Basketball", "Athlétisme", "Handball", "Volley-ball"],
    events: [
      {
        title: "Tournoi interfacultés",
        date: "2023-07-10",
        location: "Stade universitaire",
      },
      {
        title: "Compétition d'athlétisme",
        date: "2023-08-05",
        location: "Piste d'athlétisme",
      },
    ],
  },
  {
    id: "assoc-004",
    name: "Association des Étudiants Internationaux",
    acronym: "AEI",
    description:
      "Association visant à faciliter l'intégration des étudiants internationaux et promouvoir les échanges culturels.",
    image: "/placeholder.svg?height=200&width=400",
    category: "International",
    members: 75,
    founded: "2018",
    president: "Aya Diallo",
    location: "Campus principal, Bâtiment A, Salle 20",
    contact: {
      email: "aei-int@univ-douala.cm",
      phone: "+237 6XX XXX XXX",
      website: null,
    },
    activities: [
      "Accueil des nouveaux étudiants internationaux",
      "Journées culturelles",
      "Sorties découvertes",
      "Échanges linguistiques",
    ],
    events: [
      {
        title: "Festival des cultures",
        date: "2023-09-15",
        location: "Esplanade de l'université",
      },
    ],
  },
  {
    id: "assoc-005",
    name: "Club d'Entrepreneuriat",
    acronym: "CE",
    description: "Club dédié au développement de l'esprit entrepreneurial et à l'accompagnement des projets étudiants.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Professionnel",
    members: 110,
    founded: "2016",
    president: "Jean-Marc Essono",
    location: "Faculté des Sciences Économiques, Salle 15",
    contact: {
      email: "ce@univ-douala.cm",
      phone: "+237 6XX XXX XXX",
      website: "https://ce.univ-douala.cm",
    },
    activities: [
      "Ateliers business plan",
      "Mentorat",
      "Concours de pitch",
      "Rencontres avec des entrepreneurs",
      "Incubation de projets",
    ],
    events: [
      {
        title: "Startup Weekend",
        date: "2023-07-22",
        location: "Centre d'innovation",
      },
      {
        title: "Conférence sur le financement de projets",
        date: "2023-08-18",
        location: "Amphithéâtre C",
      },
    ],
  },
]

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

export function AssociationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { status } = useAuth()
  const router = useRouter()

  // Filtrer les associations en fonction de la recherche et du tab actif
  const filteredAssociations = associations.filter((association) => {
    const matchesSearch =
      association.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      association.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      association.acronym.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && association.category.toLowerCase() === activeTab.toLowerCase()
  })

  // Formatter la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
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
              <h1 className="text-3xl font-bold tracking-tight">Associations Étudiantes</h1>
              <p className="text-muted-foreground">
                Découvrez les associations et clubs étudiants de l'Université de Douala
              </p>
            </div>
            <Users className="h-12 w-12 text-primary" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une association..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="Académique">Académiques</TabsTrigger>
              <TabsTrigger value="Culture">Culturelles</TabsTrigger>
              <TabsTrigger value="Sport">Sportives</TabsTrigger>
              <TabsTrigger value="International">Internationales</TabsTrigger>
              <TabsTrigger value="Professionnel">Professionnelles</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredAssociations.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune association trouvée</h3>
                    <p className="text-sm text-muted-foreground">Aucune association ne correspond à votre recherche.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAssociations.map((association, index) => (
                    <motion.div
                      key={association.id}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={association.image || "/placeholder.svg"}
                            alt={association.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-white">{association.acronym}</Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge
                              className={
                                association.category === "Académique"
                                  ? "bg-blue-500 text-white"
                                  : association.category === "Culture"
                                    ? "bg-purple-500 text-white"
                                    : association.category === "Sport"
                                      ? "bg-green-500 text-white"
                                      : association.category === "International"
                                        ? "bg-amber-500 text-white"
                                        : "bg-rose-500 text-white"
                              }
                            >
                              {association.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{association.name}</CardTitle>
                          <CardDescription>{association.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-sm">{association.members} membres</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Fondée en {association.founded}</div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Contact:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>{association.contact.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{association.contact.phone}</span>
                              </div>
                              {association.contact.website && (
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-primary" />
                                  <a href={association.contact.website} className="text-primary hover:underline">
                                    Site web
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          <Accordion type="single" collapsible>
                            <AccordionItem value="activities">
                              <AccordionTrigger className="text-sm">Activités</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-1 text-sm">
                                  {association.activities.map((activity, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="h-1 w-1 rounded-full bg-primary" />
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            {association.events.length > 0 && (
                              <AccordionItem value="events">
                                <AccordionTrigger className="text-sm">Événements à venir</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-3">
                                    {association.events.map((event, i) => (
                                      <div key={i} className="p-2 border rounded-md">
                                        <div className="font-medium">{event.title}</div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                          <Calendar className="h-3 w-3" />
                                          <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                          <MapPin className="h-3 w-3" />
                                          <span>{event.location}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                          </Accordion>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full gap-2">
                            <UserPlus className="h-4 w-4" />
                            Rejoindre l'association
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

