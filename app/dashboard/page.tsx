"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CreditCard, GraduationCap, Bell, ChevronRight, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
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

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue sur votre espace étudiant, PRISO JOHAN YORICK</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progression académique</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Semestre 2 - Année 2022/2023</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.5/20</div>
                <p className="text-xs text-muted-foreground mt-2">+1.2 par rapport au semestre précédent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">300 000 FCFA</div>
                <Progress value={66.7} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">66.7% des frais payés</p>
              </CardContent>
              <CardFooter className="p-2">
                <Link href="/dashboard/paiements" className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Voir les détails</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 nouvelles</div>
                <p className="text-xs text-muted-foreground mt-2">Dernière notification il y a 2 heures</p>
              </CardContent>
              <CardFooter className="p-2">
                <Link href="/dashboard/notifications" className="w-full">
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Voir toutes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="calendar">Emploi du temps</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Prochains cours</CardTitle>
                    <CardDescription>Vos cours des 3 prochains jours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Mathématiques Appliquées</p>
                        <p className="text-sm text-muted-foreground">Dr. Kamga - Amphithéâtre B</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">Vendredi 19 mai</p>
                        <p className="text-sm text-muted-foreground">14:00 - 17:00</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Programmation Orientée Objet</p>
                        <p className="text-sm text-muted-foreground">Prof. Mbarga - Salle Informatique 2</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">Lundi 22 mai</p>
                        <p className="text-sm text-muted-foreground">08:00 - 12:00</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rounded-md border p-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Bases de Données Avancées</p>
                        <p className="text-sm text-muted-foreground">Dr. Nkoulou - Salle Informatique 1</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">Mardi 23 mai</p>
                        <p className="text-sm text-muted-foreground">13:00 - 16:00</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/emploi-du-temps">
                      <Button variant="outline">Voir l'emploi du temps complet</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Dernières notifications</CardTitle>
                    <CardDescription>Vos notifications récentes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Résultats des examens disponibles</p>
                          <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                        </div>
                        <Badge>Académique</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Modification de l'emploi du temps</p>
                          <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                        </div>
                        <Badge variant="outline">Emploi du temps</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Maintenance du système informatique</p>
                          <p className="text-xs text-muted-foreground">Il y a 5 heures</p>
                        </div>
                        <Badge variant="outline">Système</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/notifications">
                      <Button variant="outline">Voir toutes les notifications</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes récentes</CardTitle>
                    <CardDescription>Vos dernières notes obtenues</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Algorithmique</p>
                        <p className="text-xs text-muted-foreground">Examen final</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                        16
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Réseaux Informatiques</p>
                        <p className="text-xs text-muted-foreground">Contrôle continu</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                        14
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Anglais Technique</p>
                        <p className="text-xs text-muted-foreground">Examen final</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                        15
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/notes">
                      <Button variant="outline">Voir toutes les notes</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Paiements</CardTitle>
                    <CardDescription>État de vos paiements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Frais de scolarité - 1er versement</p>
                          <p className="text-xs text-muted-foreground">10/01/2023</p>
                        </div>
                        <Badge variant="outline" className="bg-green-500 text-white">
                          Payé
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Frais de scolarité - 2ème versement</p>
                          <p className="text-xs text-muted-foreground">15/03/2023</p>
                        </div>
                        <Badge variant="outline" className="bg-green-500 text-white">
                          Payé
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Frais de scolarité - 3ème versement</p>
                          <p className="text-xs text-muted-foreground">Échéance: 30/05/2023</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500 text-white">
                          En attente
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/paiements">
                      <Button variant="outline">Gérer mes paiements</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Rappels importants</CardTitle>
                    <CardDescription>Ne manquez pas ces échéances</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 rounded-md border p-4 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Paiement du 3ème versement</p>
                        <p className="text-muted-foreground">Échéance: 30/05/2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Inscription aux examens</p>
                        <p className="text-muted-foreground">Avant le 25/05/2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4 text-sm">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium">Remise du projet final</p>
                        <p className="text-muted-foreground">Avant le 05/06/2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé des notes</CardTitle>
                  <CardDescription>Vos résultats académiques pour le semestre en cours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Algorithmique</h3>
                        <span className="font-bold">16/20</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Coefficient: 4</span>
                        <span>Crédits: 6</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Réseaux Informatiques</h3>
                        <span className="font-bold">14/20</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Coefficient: 3</span>
                        <span>Crédits: 5</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Bases de Données</h3>
                        <span className="font-bold">15/20</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Coefficient: 4</span>
                        <span>Crédits: 6</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Anglais Technique</h3>
                        <span className="font-bold">15/20</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Coefficient: 2</span>
                        <span>Crédits: 3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/notes">
                    <Button>Voir toutes les notes</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Emploi du temps de la semaine</CardTitle>
                  <CardDescription>Vos cours pour la semaine du 22 au 26 mai 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="bg-muted px-4 py-2 font-medium">Lundi 22 mai</div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Programmation Orientée Objet</p>
                            <p className="text-sm text-muted-foreground">Prof. Mbarga - Salle Informatique 2</p>
                          </div>
                          <p className="text-sm">08:00 - 12:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted px-4 py-2 font-medium">Mardi 23 mai</div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Bases de Données Avancées</p>
                            <p className="text-sm text-muted-foreground">Dr. Nkoulou - Salle Informatique 1</p>
                          </div>
                          <p className="text-sm">13:00 - 16:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted px-4 py-2 font-medium">Mercredi 24 mai</div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Anglais Technique</p>
                            <p className="text-sm text-muted-foreground">Mme. Fouda - Salle 12</p>
                          </div>
                          <p className="text-sm">10:00 - 12:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted px-4 py-2 font-medium">Jeudi 25 mai</div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Atelier de préparation professionnelle</p>
                            <p className="text-sm text-muted-foreground">Centre de Carrières</p>
                          </div>
                          <p className="text-sm">13:00 - 17:00</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted px-4 py-2 font-medium">Vendredi 26 mai</div>
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Projet de Développement Web</p>
                            <p className="text-sm text-muted-foreground">Dr. Essono - Laboratoire Informatique</p>
                          </div>
                          <p className="text-sm">09:00 - 13:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/emploi-du-temps">
                    <Button>Voir l'emploi du temps complet</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

