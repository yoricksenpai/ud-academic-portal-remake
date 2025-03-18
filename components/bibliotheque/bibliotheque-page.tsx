"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Library, Search, Book, Clock, Calendar, CheckCircle, Users, Info, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"

// Données factices pour les bibliothèques
const libraries = [
  {
    id: "lib-001",
    name: "Bibliothèque Centrale",
    description: "Principale bibliothèque de l'Université de Douala avec plus de 50 000 ouvrages.",
    image: "/placeholder.svg?height=200&width=400",
    location: "Campus principal, Bâtiment A",
    hours: "Lundi - Vendredi: 8h - 20h | Samedi: 9h - 16h",
    seats: 500,
    collections: ["Général", "Sciences", "Lettres", "Droit", "Économie"],
    services: ["Prêt", "Photocopie", "Accès Internet", "Salle de travail en groupe"],
  },
  {
    id: "lib-002",
    name: "Bibliothèque de Médecine",
    description: "Bibliothèque spécialisée en sciences médicales et paramédicales.",
    image: "/placeholder.svg?height=200&width=400",
    location: "Faculté de Médecine, Bâtiment C",
    hours: "Lundi - Vendredi: 8h - 18h | Samedi: 9h - 13h",
    seats: 200,
    collections: ["Médecine", "Pharmacie", "Biologie", "Santé publique"],
    services: ["Prêt", "Bases de données spécialisées", "Imprimante"],
  },
  {
    id: "lib-003",
    name: "Bibliothèque des Sciences",
    description: "Collection dédiée aux disciplines scientifiques et à la recherche.",
    image: "/placeholder.svg?height=200&width=400",
    location: "Faculté des Sciences, Bâtiment E",
    hours: "Lundi - Vendredi: 8h - 19h",
    seats: 180,
    collections: ["Mathématiques", "Physique", "Chimie", "Informatique", "Biologie"],
    services: ["Prêt", "Ressources numériques", "Imprimante 3D", "Laboratoire informatique"],
  },
  {
    id: "lib-004",
    name: "Médiathèque",
    description: "Centre multimédia avec des ressources audiovisuelles et numériques.",
    image: "/placeholder.svg?height=200&width=400",
    location: "Campus principal, Bâtiment F",
    hours: "Lundi - Vendredi: 10h - 20h",
    seats: 120,
    collections: ["Films documentaires", "Ressources linguistiques", "Bases de données en ligne"],
    services: ["Postes informatiques", "Équipement audiovisuel", "Formation aux ressources numériques"],
  },
]

// Données factices pour les nouveautés
const newBooks = [
  {
    id: "book-001",
    title: "Introduction aux algorithmes et structures de données",
    author: "Thomas H. Cormen",
    publisher: "Dunod",
    year: 2022,
    category: "Informatique",
    available: true,
  },
  {
    id: "book-002",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    publisher: "Cengage Learning",
    year: 2023,
    category: "Économie",
    available: false,
  },
  {
    id: "book-003",
    title: "Chimie organique",
    author: "Pierre Krausz, Danielle Babin",
    publisher: "Vuibert",
    year: 2022,
    category: "Chimie",
    available: true,
  },
  {
    id: "book-004",
    title: "Droit constitutionnel contemporain",
    author: "Dominique Rousseau",
    publisher: "LGDJ",
    year: 2023,
    category: "Droit",
    available: true,
  },
  {
    id: "book-005",
    title: "Atlas d'anatomie humaine",
    author: "Frank H. Netter",
    publisher: "Elsevier Masson",
    year: 2022,
    category: "Médecine",
    available: false,
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

export function BibliothequeMainPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { status } = useAuth()
  const router = useRouter()

  // Filtrer les bibliothèques en fonction de la recherche
  const filteredLibraries = libraries.filter(
    (library) =>
      library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-3xl font-bold tracking-tight">Bibliothèques Universitaires</h1>
              <p className="text-muted-foreground">
                Découvrez les ressources et services des bibliothèques de l'Université de Douala
              </p>
            </div>
            <Library className="h-12 w-12 text-primary" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une bibliothèque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="libraries">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="libraries">Bibliothèques</TabsTrigger>
              <TabsTrigger value="new">Nouveautés</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="libraries" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLibraries.map((library, index) => (
                  <motion.div
                    key={library.id}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={library.image || "/placeholder.svg"}
                          alt={library.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{library.name}</CardTitle>
                        <CardDescription>{library.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm">
                            <span className="font-medium">Emplacement:</span> {library.location}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm">
                            <span className="font-medium">Horaires:</span> {library.hours}
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-primary mt-1" />
                          <span className="text-sm">
                            <span className="font-medium">Places disponibles:</span> {library.seats}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Collections:</h4>
                          <div className="flex flex-wrap gap-2">
                            {library.collections.map((collection, i) => (
                              <Badge key={i} variant="outline" className="bg-blue-50">
                                {collection}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Services:</h4>
                          <ul className="space-y-1 text-sm">
                            {library.services.map((service, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full gap-2">
                          Plus d'informations
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nouvelles acquisitions</CardTitle>
                  <CardDescription>Découvrez les derniers ouvrages ajoutés à nos collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Éditeur</TableHead>
                        <TableHead>Année</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Disponibilité</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {newBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.publisher}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>
                            {book.available ? (
                              <Badge className="bg-green-500">Disponible</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800">
                                Emprunté
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Voir toutes les nouveautés</Button>
                  <Button>Rechercher un ouvrage</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-primary" />
                      Prêt d'ouvrages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Empruntez jusqu'à 5 ouvrages simultanément pour une durée de 14 jours, renouvelable une fois si
                      l'ouvrage n'est pas réservé.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Salles de travail
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Réservez une salle de travail en groupe pour vos projets et réunions. Capacité de 4 à 10 personnes
                      selon les salles.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Formations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Participez à nos formations sur la recherche documentaire, l'utilisation des bases de données et
                      la rédaction académique.
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Ressources électroniques</CardTitle>
                    <CardDescription>
                      Accédez à nos ressources numériques depuis le campus ou à distance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Bases de données académiques</h3>
                        <p className="text-sm text-muted-foreground">
                          Accès à JSTOR, ScienceDirect, IEEE Xplore et d'autres bases de données scientifiques.
                        </p>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">E-books</h3>
                        <p className="text-sm text-muted-foreground">
                          Plus de 10 000 livres électroniques consultables en ligne ou téléchargeables.
                        </p>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Revues électroniques</h3>
                        <p className="text-sm text-muted-foreground">
                          Accès à des milliers de revues scientifiques dans toutes les disciplines.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Accéder aux ressources électroniques</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

