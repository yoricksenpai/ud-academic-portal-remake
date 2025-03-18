"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Search,
  Calendar,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Newspaper,
  GraduationCap,
  Award,
  Users,
  Globe,
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

// Données pour les actualités
const newsItems = [
  {
    id: "news-001",
    title: "Ouverture des inscriptions pour l'année académique 2025-2026",
    excerpt:
      "L'Université de Douala annonce l'ouverture des inscriptions pour la nouvelle année académique. Les étudiants sont invités à consulter les modalités d'inscription sur le site web de l'université.",
    content: `
      <p>L'Université de Douala a le plaisir d'annoncer l'ouverture des inscriptions pour l'année académique 2025-2026. Les inscriptions débuteront le 15 juin 2025 et se poursuivront jusqu'au 15 août 2025.</p>
      
      <p>Les étudiants sont invités à consulter les modalités d'inscription sur le site web de l'université. Les documents requis pour l'inscription sont les suivants :</p>
      
      <ul>
        <li>Une copie certifiée conforme du baccalauréat ou équivalent</li>
        <li>Une copie certifiée conforme de l'acte de naissance</li>
        <li>Une copie de la carte nationale d'identité</li>
        <li>4 photos d'identité récentes</li>
        <li>Le reçu de paiement des frais d'inscription</li>
      </ul>
      
      <p>Pour plus d'informations, veuillez contacter le service des inscriptions au +237 233 XX XX XX ou par email à inscriptions@univ-douala.cm.</p>
    `,
    date: "2025-06-01",
    image: "/placeholder.svg?height=400&width=600",
    category: "Administratif",
    author: "Service de la Communication",
    featured: true,
  },
  {
    id: "news-002",
    title: "Conférence internationale sur l'intelligence artificielle",
    excerpt:
      "L'Université de Douala accueillera une conférence internationale sur l'intelligence artificielle du 20 au 22 avril 2025. Des experts du monde entier sont attendus pour cet événement majeur.",
    content: `
      <p>L'Université de Douala est fière d'accueillir la Conférence Internationale sur l'Intelligence Artificielle (CIIA 2025) qui se tiendra du 20 au 22 avril 2025 au campus principal.</p>
      
      <p>Cette conférence réunira des experts et chercheurs du monde entier pour discuter des avancées récentes et des perspectives futures dans le domaine de l'intelligence artificielle. Au programme :</p>
      
      <ul>
        <li>Conférences plénières par des experts internationaux</li>
        <li>Sessions thématiques sur le machine learning, le deep learning, la vision par ordinateur, etc.</li>
        <li>Ateliers pratiques pour les étudiants et les professionnels</li>
        <li>Exposition de projets innovants</li>
      </ul>
      
      <p>Les inscriptions pour participer à la conférence sont ouvertes. Les frais d'inscription sont de 50 000 FCFA pour les professionnels et 15 000 FCFA pour les étudiants. Pour plus d'informations, visitez le site web de la conférence : www.ciia2025.univ-douala.cm.</p>
    `,
    date: "2025-03-05",
    image: "/placeholder.svg?height=400&width=600",
    category: "Événement",
    author: "Département d'Informatique",
    featured: true,
  },
  {
    id: "news-003",
    title: "Résultats des examens du premier semestre",
    excerpt:
      "Les résultats des examens du premier semestre sont désormais disponibles. Les étudiants peuvent les consulter sur le portail étudiant ou aux tableaux d'affichage de leurs facultés respectives.",
    content: `
      <p>La Direction des Affaires Académiques informe tous les étudiants que les résultats des examens du premier semestre de l'année académique 2024-2025 sont désormais disponibles.</p>
      
      <p>Les étudiants peuvent consulter leurs résultats :</p>
      
      <ul>
        <li>Sur le portail étudiant (www.portail.univ-douala.cm)</li>
        <li>Aux tableaux d'affichage de leurs facultés respectives</li>
      </ul>
      
      <p>Les réclamations éventuelles doivent être adressées au chef de département concerné dans un délai de 72 heures après la publication des résultats.</p>
      
      <p>La Direction des Affaires Académiques félicite tous les étudiants pour leur travail et encourage ceux qui n'ont pas obtenu les résultats escomptés à redoubler d'efforts pour le second semestre.</p>
    `,
    date: "2025-03-01",
    image: "/placeholder.svg?height=400&width=600",
    category: "Académique",
    author: "Direction des Affaires Académiques",
    featured: false,
  },
  {
    id: "news-004",
    title: "Signature d'un partenariat avec l'Université de Paris-Saclay",
    excerpt:
      "L'Université de Douala a signé un accord de partenariat avec l'Université de Paris-Saclay pour favoriser la mobilité des étudiants et des enseignants-chercheurs entre les deux institutions.",
    content: `
      <p>L'Université de Douala est heureuse d'annoncer la signature d'un accord de partenariat avec l'Université de Paris-Saclay, l'une des plus prestigieuses universités françaises.</p>
      
      <p>Ce partenariat vise à :</p>
      
      <ul>
        <li>Favoriser la mobilité des étudiants entre les deux institutions</li>
        <li>Développer des programmes de recherche conjoints</li>
        <li>Organiser des échanges d'enseignants-chercheurs</li>
        <li>Mettre en place des co-diplômations au niveau Master et Doctorat</li>
      </ul>
      
      <p>Dès la rentrée 2025-2026, 10 étudiants de l'Université de Douala pourront bénéficier de ce programme d'échange pour un semestre ou une année académique complète à l'Université de Paris-Saclay.</p>
      
      <p>Une réunion d'information sera organisée le 15 avril 2025 à l'Amphithéâtre 300 pour présenter les modalités de candidature et de sélection.</p>
    `,
    date: "2025-02-20",
    image: "/placeholder.svg?height=400&width=600",
    category: "International",
    author: "Service des Relations Internationales",
    featured: false,
  },
  {
    id: "news-005",
    title: "Lancement d'un nouveau programme de bourses d'excellence",
    excerpt:
      "L'Université de Douala lance un nouveau programme de bourses d'excellence destiné aux étudiants méritants. 50 bourses seront attribuées pour l'année académique 2025-2026.",
    content: `
      <p>Dans le cadre de sa politique d'encouragement à l'excellence académique, l'Université de Douala lance un nouveau programme de bourses d'excellence pour l'année académique 2025-2026.</p>
      
      <p>Ce programme offrira :</p>
      
      <ul>
        <li>20 bourses complètes couvrant les frais de scolarité et une allocation mensuelle</li>
        <li>30 bourses partielles couvrant uniquement les frais de scolarité</li>
      </ul>
      
      <p>Les critères d'éligibilité sont les suivants :</p>
      
      <ul>
        <li>Être inscrit à l'Université de Douala</li>
        <li>Avoir obtenu une moyenne générale d'au moins 16/20 pour l'année académique précédente</li>
        <li>Ne pas bénéficier d'une autre bourse</li>
      </ul>
      
      <p>Les dossiers de candidature doivent être déposés au Service des Bourses avant le 30 juillet 2025. Pour plus d'informations, contactez le Service des Bourses au +237 233 XX XX XX ou par email à bourses@univ-douala.cm.</p>
    `,
    date: "2025-02-15",
    image: "/placeholder.svg?height=400&width=600",
    category: "Bourse",
    author: "Service des Bourses",
    featured: false,
  },
  {
    id: "news-006",
    title: "Journée portes ouvertes de l'Université de Douala",
    excerpt:
      "L'Université de Douala organise une journée portes ouvertes le 15 mars 2025. Les futurs étudiants et leurs parents sont invités à découvrir les différentes filières et les infrastructures de l'université.",
    content: `
      <p>L'Université de Douala a le plaisir d'inviter les futurs étudiants, leurs parents et le grand public à sa journée portes ouvertes qui se tiendra le 15 mars 2025 de 9h à 17h sur le campus principal.</p>
      
      <p>Au programme de cette journée :</p>
      
      <ul>
        <li>Présentation des différentes filières et programmes d'études</li>
        <li>Visite guidée des infrastructures (bibliothèques, laboratoires, salles de cours, etc.)</li>
        <li>Rencontres avec les enseignants et les étudiants</li>
        <li>Informations sur les procédures d'admission et les bourses</li>
        <li>Démonstrations et expositions des travaux d'étudiants</li>
      </ul>
      
      <p>Cette journée sera également l'occasion de découvrir la vie associative et culturelle de l'université. Des animations et des performances artistiques seront proposées tout au long de la journée.</p>
      
      <p>L'entrée est libre et gratuite. Pour plus d'informations, contactez le Service de Communication au +237 233 XX XX XX.</p>
    `,
    date: "2025-02-10",
    image: "/placeholder.svg?height=400&width=600",
    category: "Événement",
    author: "Service de la Communication",
    featured: false,
  },
  {
    id: "news-007",
    title: "Inauguration du nouveau centre de recherche en biotechnologie",
    excerpt:
      "L'Université de Douala inaugure son nouveau centre de recherche en biotechnologie. Ce centre, équipé de technologies de pointe, permettra de développer des projets de recherche innovants.",
    content: `
      <p>L'Université de Douala est fière d'annoncer l'inauguration de son nouveau Centre de Recherche en Biotechnologie (CRB) qui aura lieu le 5 mars 2025 en présence du Ministre de l'Enseignement Supérieur.</p>
      
      <p>Ce centre, fruit d'un investissement de 1,5 milliard de FCFA, est équipé de technologies de pointe et comprend :</p>
      
      <ul>
        <li>5 laboratoires spécialisés (génomique, protéomique, culture cellulaire, microbiologie, bioinformatique)</li>
        <li>Une salle de conférence de 100 places</li>
        <li>Une bibliothèque scientifique</li>
        <li>Des espaces de travail collaboratif pour les chercheurs</li>
      </ul>
      
      <p>Le CRB accueillera 30 chercheurs permanents et 50 doctorants qui travailleront sur des projets de recherche dans les domaines de la santé, de l'agriculture et de l'environnement.</p>
      
      <p>Cette infrastructure renforce la position de l'Université de Douala comme pôle d'excellence en recherche scientifique en Afrique centrale.</p>
    `,
    date: "2025-02-05",
    image: "/placeholder.svg?height=400&width=600",
    category: "Recherche",
    author: "Direction de la Recherche",
    featured: false,
  },
  {
    id: "news-008",
    title: "L'équipe de football de l'Université remporte le championnat interuniversitaire",
    excerpt:
      "L'équipe de football de l'Université de Douala a remporté le championnat interuniversitaire national. Une victoire qui couronne une saison exceptionnelle pour nos sportifs.",
    content: `
      <p>C'est avec une immense fierté que nous annonçons la victoire de l'équipe de football de l'Université de Douala au championnat interuniversitaire national 2025.</p>
      
      <p>Après une saison exceptionnelle, nos joueurs ont remporté la finale contre l'Université de Yaoundé I sur le score de 2-1, grâce à des buts de Jean Mbarga (15') et Paul Essama (78').</p>
      
      <p>Cette victoire est le fruit d'un travail acharné et d'une cohésion d'équipe remarquable. Elle témoigne également de la qualité de l'encadrement sportif à l'Université de Douala.</p>
      
      <p>Une cérémonie de célébration sera organisée le 25 février 2025 à 15h au stade universitaire. Tous les étudiants et le personnel sont invités à venir féliciter nos champions.</p>
      
      <p>L'Université de Douala tient à remercier tous les supporters qui ont encouragé l'équipe tout au long de la saison.</p>
    `,
    date: "2025-02-01",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sport",
    author: "Service des Sports",
    featured: false,
  },
]

// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" }
  return new Date(dateString).toLocaleDateString("fr-FR", options)
}

// Fonction pour obtenir l'icône de la catégorie
const getCategoryIcon = (category) => {
  switch (category) {
    case "Académique":
      return <GraduationCap className="h-4 w-4" />
    case "Administratif":
      return <Newspaper className="h-4 w-4" />
    case "Événement":
      return <Calendar className="h-4 w-4" />
    case "International":
      return <Globe className="h-4 w-4" />
    case "Bourse":
      return <Award className="h-4 w-4" />
    case "Recherche":
      return <Search className="h-4 w-4" />
    case "Sport":
      return <Users className="h-4 w-4" />
    default:
      return <Newspaper className="h-4 w-4" />
  }
}

export function ActualitesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const { status } = useAuth()
  const router = useRouter()

  // Nombre d'articles par page
  const itemsPerPage = 6

  // Filtrer les actualités par catégorie et terme de recherche
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && item.category === activeTab
  })

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

  // Obtenir les actualités pour la page courante
  const currentNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Fonction pour changer de page
  const changePage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Obtenir les actualités à la une
  const featuredNews = newsItems.filter((item) => item.featured)

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
              <h1 className="text-3xl font-bold tracking-tight">Actualités</h1>
              <p className="text-muted-foreground">
                Découvrez les dernières nouvelles et événements de l'Université de Douala
              </p>
            </div>
            <Newspaper className="h-12 w-12 text-primary" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une actualité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {featuredNews.length > 0 && (
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl font-bold mb-4">À la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredNews.map((news) => (
                <Card key={news.id} className="overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white">À la une</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(news.date)}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(news.category)}
                        {news.category}
                      </Badge>
                    </div>
                    <CardTitle>{news.title}</CardTitle>
                    <CardDescription>{news.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={`/actualites/${news.id}`} className="w-full">
                      <Button className="w-full gap-2">
                        Lire la suite
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="Académique">Académique</TabsTrigger>
              <TabsTrigger value="Administratif">Administratif</TabsTrigger>
              <TabsTrigger value="Événement">Événements</TabsTrigger>
              <TabsTrigger value="International">International</TabsTrigger>
              <TabsTrigger value="Recherche">Recherche</TabsTrigger>
              <TabsTrigger value="Sport">Sport</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {currentNews.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune actualité trouvée</h3>
                    <p className="text-sm text-muted-foreground">Aucune actualité ne correspond à votre recherche.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentNews.map((news) => (
                      <motion.div key={news.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className="h-full flex flex-col">
                          <div className="relative h-48 w-full">
                            <Image
                              src={news.image || "/placeholder.svg"}
                              alt={news.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader className="flex-grow">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(news.date)}</span>
                            </div>
                            <Badge variant="outline" className="mb-2 flex items-center gap-1 w-fit">
                              {getCategoryIcon(news.category)}
                              {news.category}
                            </Badge>
                            <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">{news.excerpt}</CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <Link href={`/actualites/${news.id}`} className="w-full">
                              <Button variant="outline" className="w-full gap-2">
                                Lire la suite
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => changePage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => changePage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

