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
import { Calendar, FileText, Clock, Search, GraduationCap, ArrowRight, AlertCircle } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"

// Données factices pour les concours
const exams = [
  {
    id: "exam-001",
    title: "Concours d'entrée à l'École Nationale Supérieure Polytechnique",
    description: "Concours pour l'admission en première année du cycle des ingénieurs de conception.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-07-15",
    startDate: "2023-08-10",
    status: "Ouvert",
    fee: "20 000 FCFA",
    places: 150,
    departments: ["Génie Informatique", "Génie Civil", "Génie Électrique", "Génie Mécanique"],
    requirements: [
      "Être âgé de 23 ans au plus au 1er janvier de l'année du concours",
      "Être titulaire d'un Baccalauréat C, D, E, F1, F2, F3, F4 ou GCE A-Level",
      "Avoir obtenu une moyenne générale d'au moins 12/20",
    ],
  },
  {
    id: "exam-002",
    title: "Concours d'entrée à la Faculté de Médecine et des Sciences Pharmaceutiques",
    description: "Concours pour l'admission en première année du cycle de formation en médecine.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-07-30",
    startDate: "2023-08-25",
    status: "Ouvert",
    fee: "25 000 FCFA",
    places: 100,
    departments: ["Médecine Générale", "Pharmacie", "Odontologie"],
    requirements: [
      "Être âgé de 25 ans au plus au 1er janvier de l'année du concours",
      "Être titulaire d'un Baccalauréat C, D ou GCE A-Level en sciences",
      "Avoir obtenu une moyenne générale d'au moins 14/20",
    ],
  },
  {
    id: "exam-003",
    title: "Concours d'entrée à l'Institut Universitaire de Technologie",
    description: "Concours pour l'admission en DUT (Diplôme Universitaire de Technologie).",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-08-05",
    startDate: "2023-09-01",
    status: "Ouvert",
    fee: "15 000 FCFA",
    places: 200,
    departments: ["Informatique", "Gestion", "Électronique", "Maintenance Industrielle", "Commerce"],
    requirements: [
      "Être âgé de 24 ans au plus au 1er janvier de l'année du concours",
      "Être titulaire d'un Baccalauréat ou GCE A-Level",
      "Avoir obtenu une moyenne générale d'au moins 10/20",
    ],
  },
  {
    id: "exam-004",
    title: "Concours d'entrée à la Faculté des Sciences Économiques et de Gestion",
    description: "Concours pour l'admission en Master Professionnel.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-06-30",
    startDate: "2023-07-15",
    status: "Clôturé",
    fee: "25 000 FCFA",
    places: 120,
    departments: ["Finance", "Comptabilité", "Marketing", "Management des Organisations"],
    requirements: [
      "Être titulaire d'une Licence en économie, gestion ou équivalent",
      "Avoir obtenu une moyenne générale d'au moins 12/20",
      "Avoir une expérience professionnelle est un plus",
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

export function ConcoursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { status } = useAuth()
  const router = useRouter()

  // Filtrer les concours en fonction de la recherche et du tab actif
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "open") return matchesSearch && exam.status === "Ouvert"
    if (activeTab === "closed") return matchesSearch && exam.status === "Clôturé"

    return matchesSearch
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

  // Vérifier si la date limite est proche (moins de 7 jours)
  const isDeadlineClose = (dateString: string) => {
    const deadline = new Date(dateString)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 && diffDays <= 7
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
              <h1 className="text-3xl font-bold tracking-tight">Concours d'entrée</h1>
              <p className="text-muted-foreground">Découvrez les concours d'entrée à l'Université de Douala</p>
            </div>
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un concours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Tous les concours</TabsTrigger>
              <TabsTrigger value="open">Concours ouverts</TabsTrigger>
              <TabsTrigger value="closed">Concours clôturés</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredExams.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucun concours trouvé</h3>
                    <p className="text-sm text-muted-foreground">Aucun concours ne correspond à votre recherche.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredExams.map((exam, index) => (
                    <motion.div
                      key={exam.id}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={exam.image || "/placeholder.svg"}
                            alt={exam.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={
                                exam.status === "Ouvert" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                              }
                            >
                              {exam.status}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{exam.title}</CardTitle>
                          <CardDescription>{exam.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="text-sm">Date limite: {formatDate(exam.deadline)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-sm">Date du concours: {formatDate(exam.startDate)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">Frais d'inscription: {exam.fee}</span>
                          </div>

                          {isDeadlineClose(exam.deadline) && exam.status === "Ouvert" && (
                            <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-md border border-yellow-200">
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-yellow-700">Date limite d'inscription proche !</span>
                            </div>
                          )}

                          <Accordion type="single" collapsible>
                            <AccordionItem value="departments">
                              <AccordionTrigger className="text-sm">Filières concernées</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-1 text-sm">
                                  {exam.departments.map((dept, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="h-1 w-1 rounded-full bg-primary" />
                                      {dept}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="requirements">
                              <AccordionTrigger className="text-sm">Conditions d'admission</AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-1 text-sm">
                                  {exam.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <div className="h-1 w-1 rounded-full bg-primary mt-2" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full gap-2" disabled={exam.status !== "Ouvert"}>
                            {exam.status === "Ouvert" ? "S'inscrire au concours" : "Inscription clôturée"}
                            <ArrowRight className="h-4 w-4" />
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

