"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, AlertCircle } from "lucide-react"

// Données factices pour les notes
const currentSemesterGrades = [
  {
    id: 1,
    course: "Algorithmique",
    code: "INFO301",
    credits: 6,
    coefficient: 4,
    cc: 15,
    tp: 16,
    exam: 16.5,
    final: 16,
    status: "Validé",
  },
  {
    id: 2,
    course: "Réseaux Informatiques",
    code: "INFO302",
    credits: 5,
    coefficient: 3,
    cc: 13,
    tp: 14.5,
    exam: 14,
    final: 14,
    status: "Validé",
  },
  {
    id: 3,
    course: "Bases de Données",
    code: "INFO303",
    credits: 6,
    coefficient: 4,
    cc: 14,
    tp: 15,
    exam: 15.5,
    final: 15,
    status: "Validé",
  },
  {
    id: 4,
    course: "Anglais Technique",
    code: "LANG201",
    credits: 3,
    coefficient: 2,
    cc: 14,
    tp: null,
    exam: 15.5,
    final: 15,
    status: "Validé",
  },
  {
    id: 5,
    course: "Projet de Développement Web",
    code: "INFO304",
    credits: 4,
    coefficient: 3,
    cc: 16,
    tp: 17,
    exam: null,
    final: 16.5,
    status: "Validé",
  },
  {
    id: 6,
    course: "Mathématiques Appliquées",
    code: "MATH201",
    credits: 5,
    coefficient: 3,
    cc: null,
    tp: null,
    exam: null,
    final: null,
    status: "En cours",
  },
]

const previousSemesterGrades = [
  {
    id: 1,
    course: "Introduction à la Programmation",
    code: "INFO101",
    credits: 6,
    coefficient: 4,
    final: 14,
    status: "Validé",
  },
  {
    id: 2,
    course: "Architecture des Ordinateurs",
    code: "INFO102",
    credits: 5,
    coefficient: 3,
    final: 13,
    status: "Validé",
  },
  {
    id: 3,
    course: "Mathématiques Discrètes",
    code: "MATH101",
    credits: 6,
    coefficient: 4,
    final: 12,
    status: "Validé",
  },
  {
    id: 4,
    course: "Anglais Général",
    code: "LANG101",
    credits: 3,
    coefficient: 2,
    final: 15,
    status: "Validé",
  },
  {
    id: 5,
    course: "Introduction aux Systèmes d'Exploitation",
    code: "INFO103",
    credits: 4,
    coefficient: 3,
    final: 14.5,
    status: "Validé",
  },
  {
    id: 6,
    course: "Analyse et Conception de Systèmes",
    code: "INFO104",
    credits: 5,
    coefficient: 3,
    final: 13.5,
    status: "Validé",
  },
]

// Fonction pour calculer la moyenne
function calculateAverage(grades: any[]) {
  let totalPoints = 0
  let totalCoefficients = 0

  grades.forEach((grade) => {
    if (grade.final !== null) {
      totalPoints += grade.final * grade.coefficient
      totalCoefficients += grade.coefficient
    }
  })

  return totalCoefficients > 0 ? (totalPoints / totalCoefficients).toFixed(2) : "N/A"
}

// Fonction pour calculer les crédits validés
function calculateValidatedCredits(grades: any[]) {
  return grades.filter((grade) => grade.status === "Validé").reduce((total, grade) => total + grade.credits, 0)
}

export default function GradesPage() {
  const [activeTab, setActiveTab] = useState("current")

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

  // Calcul des moyennes et crédits
  const currentAverage = calculateAverage(currentSemesterGrades)
  const previousAverage = calculateAverage(previousSemesterGrades)
  const currentCredits = calculateValidatedCredits(currentSemesterGrades)
  const previousCredits = calculateValidatedCredits(previousSemesterGrades)
  const totalCredits = currentCredits + previousCredits

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight">Mes Notes</h1>
          <p className="text-muted-foreground">Consultez vos résultats académiques</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Résumé académique</CardTitle>
              <CardDescription>Vue d'ensemble de vos performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Moyenne générale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentAverage}/20</div>
                    <p className="text-xs text-muted-foreground">
                      {Number(currentAverage) > Number(previousAverage)
                        ? `+${(Number(currentAverage) - Number(previousAverage)).toFixed(2)} par rapport au semestre précédent`
                        : `${(Number(currentAverage) - Number(previousAverage)).toFixed(2)} par rapport au semestre précédent`}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Crédits validés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCredits}</div>
                    <p className="text-xs text-muted-foreground">sur 180 crédits requis</p>
                    <Progress value={(totalCredits / 180) * 100} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Progression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Semestre 2</div>
                    <p className="text-xs text-muted-foreground">Année académique 2022/2023</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Semestre actuel</TabsTrigger>
              <TabsTrigger value="previous">Semestre précédent</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notes du semestre actuel</CardTitle>
                  <CardDescription>Semestre 2 - Année académique 2022/2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Cours</TableHead>
                        <TableHead className="text-center">CC</TableHead>
                        <TableHead className="text-center">TP</TableHead>
                        <TableHead className="text-center">Examen</TableHead>
                        <TableHead className="text-center">Note finale</TableHead>
                        <TableHead className="text-center">Crédits</TableHead>
                        <TableHead className="text-center">Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentSemesterGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.code}</TableCell>
                          <TableCell>{grade.course}</TableCell>
                          <TableCell className="text-center">{grade.cc !== null ? grade.cc : "-"}</TableCell>
                          <TableCell className="text-center">{grade.tp !== null ? grade.tp : "-"}</TableCell>
                          <TableCell className="text-center">{grade.exam !== null ? grade.exam : "-"}</TableCell>
                          <TableCell className="text-center font-bold">
                            {grade.final !== null ? grade.final : "-"}
                          </TableCell>
                          <TableCell className="text-center">{grade.credits}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                grade.status === "Validé"
                                  ? "bg-green-500"
                                  : grade.status === "En cours"
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                              }
                            >
                              {grade.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="previous" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notes du semestre précédent</CardTitle>
                  <CardDescription>Semestre 1 - Année académique 2022/2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Cours</TableHead>
                        <TableHead className="text-center">Note finale</TableHead>
                        <TableHead className="text-center">Crédits</TableHead>
                        <TableHead className="text-center">Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previousSemesterGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.code}</TableCell>
                          <TableCell>{grade.course}</TableCell>
                          <TableCell className="text-center font-bold">{grade.final}</TableCell>
                          <TableCell className="text-center">{grade.credits}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                grade.status === "Validé"
                                  ? "bg-green-500"
                                  : grade.status === "En cours"
                                    ? "bg-blue-500"
                                    : "bg-red-500"
                              }
                            >
                              {grade.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Téléchargements</CardTitle>
              <CardDescription>Documents relatifs à vos résultats académiques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Relevé de notes - Semestre 1</p>
                    <p className="text-sm text-muted-foreground">PDF - 245 KB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Attestation de réussite - Année 1</p>
                    <p className="text-sm text-muted-foreground">PDF - 198 KB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations importantes</CardTitle>
              <CardDescription>Annonces concernant les examens et les notes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 border rounded-md">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Période de réclamation des notes</p>
                  <p className="text-sm text-muted-foreground">
                    Vous avez jusqu'au 30 mai 2023 pour soumettre vos réclamations concernant les notes du semestre
                    actuel.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 border rounded-md">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Examens de rattrapage</p>
                  <p className="text-sm text-muted-foreground">
                    Les examens de rattrapage auront lieu du 15 au 20 juin 2023. Les inscriptions seront ouvertes du 1er
                    au 10 juin.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

