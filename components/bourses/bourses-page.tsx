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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, FileText, Briefcase, Search, ArrowRight, CheckCircle, Globe } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"

// Données factices pour les bourses
const scholarships = [
  {
    id: "scholar-001",
    title: "Bourse d'excellence académique",
    description: "Bourse destinée aux étudiants ayant obtenu d'excellents résultats académiques.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-06-30",
    amount: "500 000 FCFA par an",
    status: "Ouvert",
    category: "National",
    organization: "Ministère de l'Enseignement Supérieur",
    eligibility: [
      "Être inscrit à l'Université de Douala",
      "Avoir une moyenne générale d'au moins 16/20",
      "Être de nationalité camerounaise",
    ],
    requirements: [
      "Relevé de notes des deux derniers semestres",
      "Lettre de motivation",
      "Copie de la carte d'étudiant",
      "Certificat de nationalité",
    ],
  },
  {
    id: "scholar-002",
    title: "Bourse Orange pour l'innovation technologique",
    description:
      "Programme de bourses pour soutenir les étudiants porteurs de projets innovants dans le domaine des technologies.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-07-15",
    amount: "750 000 FCFA + mentorat",
    status: "Ouvert",
    category: "Privé",
    organization: "Fondation Orange",
    eligibility: [
      "Être inscrit en Licence 3, Master ou Doctorat",
      "Avoir un projet innovant dans le domaine technologique",
      "Être âgé de moins de 30 ans",
    ],
    requirements: [
      "Dossier de présentation du projet",
      "Relevé de notes du dernier semestre",
      "CV détaillé",
      "Lettre de recommandation d'un enseignant",
    ],
  },
  {
    id: "scholar-003",
    title: "Bourse de mobilité internationale",
    description: "Programme de bourses pour étudier à l'étranger dans le cadre d'échanges universitaires.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-08-15",
    amount: "1 500 000 FCFA + billet d'avion",
    status: "Ouvert",
    category: "International",
    organization: "Agence Universitaire de la Francophonie (AUF)",
    eligibility: [
      "Être inscrit en Master ou Doctorat",
      "Avoir une moyenne générale d'au moins 14/20",
      "Avoir un niveau B2 en français et/ou en anglais",
    ],
    requirements: [
      "Projet d'études",
      "Lettre d'invitation de l'université d'accueil",
      "Relevés de notes des deux dernières années",
      "Certificat de langue",
      "Lettre de motivation",
    ],
  },
  {
    id: "scholar-004",
    title: "Bourse sociale pour étudiants défavorisés",
    description: "Programme d'aide financière destiné aux étudiants issus de milieux socio-économiques défavorisés.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-06-01",
    amount: "300 000 FCFA par an",
    status: "Clôturé",
    category: "National",
    organization: "Ministère des Affaires Sociales",
    eligibility: [
      "Être inscrit à l'Université de Douala",
      "Justifier d'une situation sociale difficile",
      "Être de nationalité camerounaise",
    ],
    requirements: [
      "Attestation de revenus des parents",
      "Copie de la carte d'étudiant",
      "Certificat de résidence",
      "Copie de la CNI",
    ],
  },
  {
    id: "scholar-005",
    title: "Bourse de recherche en santé publique",
    description:
      "Financement pour les projets de recherche dans le domaine de la santé publique et des maladies tropicales.",
    image: "/placeholder.svg?height=200&width=400",
    deadline: "2023-09-30",
    amount: "2 000 000 FCFA",
    status: "Ouvert",
    category: "International",
    organization: "Organisation Mondiale de la Santé (OMS)",
    eligibility: [
      "Être inscrit en Master 2 ou Doctorat",
      "Avoir un projet de recherche en santé publique",
      "Être parrainé par un enseignant-chercheur",
    ],
    requirements: [
      "Protocole de recherche détaillé",
      "CV académique",
      "Lettres de recommandation",
      "Budget prévisionnel du projet",
      "Calendrier d'exécution",
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

export function BoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { status } = useAuth()
  const router = useRouter()

  // Filtrer les bourses en fonction de la recherche, du tab actif et de la catégorie
  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || scholarship.category === categoryFilter

    if (activeTab === "all") return matchesSearch && matchesCategory
    if (activeTab === "open") return matchesSearch && matchesCategory && scholarship.status === "Ouvert"
    if (activeTab === "closed") return matchesSearch && matchesCategory && scholarship.status === "Clôturé"

    return matchesSearch && matchesCategory
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

  // Vérifier si la date limite est dépassée
  const isDeadlinePassed = (dateString: string) => {
    const deadline = new Date(dateString)
    const today = new Date()
    return today > deadline
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
              <h1 className="text-3xl font-bold tracking-tight">Bourses et aides financières</h1>
              <p className="text-muted-foreground">Découvrez les opportunités de financement pour vos études</p>
            </div>
            <Briefcase className="h-12 w-12 text-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une bourse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="National">Nationale</SelectItem>
                <SelectItem value="International">Internationale</SelectItem>
                <SelectItem value="Privé">Privée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Toutes les bourses</TabsTrigger>
              <TabsTrigger value="open">Bourses ouvertes</TabsTrigger>
              <TabsTrigger value="closed">Bourses clôturées</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredScholarships.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune bourse trouvée</h3>
                    <p className="text-sm text-muted-foreground">
                      Aucune bourse ne correspond à vos critères de recherche.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredScholarships.map((scholarship, index) => (
                    <motion.div
                      key={scholarship.id}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={scholarship.image || "/placeholder.svg"}
                            alt={scholarship.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={
                                scholarship.status === "Ouvert" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                              }
                            >
                              {scholarship.status}
                            </Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge
                              className={
                                scholarship.category === "International"
                                  ? "bg-blue-500 text-white"
                                  : scholarship.category === "National"
                                    ? "bg-purple-500 text-white"
                                    : "bg-orange-500 text-white"
                              }
                            >
                              {scholarship.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{scholarship.title}</CardTitle>
                          <CardDescription>{scholarship.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="text-sm">Date limite: {formatDate(scholarship.deadline)}</span>
                            </div>
                            {isDeadlinePassed(scholarship.deadline) && (
                              <Badge variant="outline" className="bg-red-100 text-red-800">
                                Expiré
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">Montant: {scholarship.amount}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="text-sm">Organisation: {scholarship.organization}</span>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">Critères d'éligibilité:</h4>
                            <ul className="space-y-1 text-sm">
                              {scholarship.eligibility.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full gap-2"
                            disabled={scholarship.status !== "Ouvert" || isDeadlinePassed(scholarship.deadline)}
                          >
                            {scholarship.status === "Ouvert" && !isDeadlinePassed(scholarship.deadline)
                              ? "Postuler maintenant"
                              : "Candidature fermée"}
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

