"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Download, FileText, BookOpen, BarChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Types pour les notes
interface Course {
  code: string
  name: string
  credits: number
  cc: number | null
  tp: number | null
  exam: number | null
  final: number | null
  status: "success" | "fail" | "pending"
}

interface Semester {
  id: string
  name: string
  courses: Course[]
}

interface AcademicYear {
  id: string
  name: string
  semesters: Semester[]
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

export function NotesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Données d'exemple pour les années académiques
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [viewMode, setViewMode] = useState<"table" | "chart">("table")

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      const years = [
        {
          id: "2024-2025",
          name: "2024-2025",
          semesters: [
            {
              id: "S1-2024",
              name: "Semestre 1",
              courses: [
                {
                  code: "INF3101",
                  name: "Programmation Web",
                  credits: 6,
                  cc: 14.5,
                  tp: 16,
                  exam: 15,
                  final: 15.2,
                  status: "success",
                },
                {
                  code: "INF3102",
                  name: "Bases de données avancées",
                  credits: 4,
                  cc: 12,
                  tp: 14,
                  exam: 13,
                  final: 13,
                  status: "success",
                },
                {
                  code: "INF3103",
                  name: "Réseaux informatiques",
                  credits: 5,
                  cc: 10,
                  tp: 12,
                  exam: 11,
                  final: 11,
                  status: "success",
                },
              ],
            },
            {
              id: "S2-2024",
              name: "Semestre 2",
              courses: [
                {
                  code: "INF3201",
                  name: "Intelligence artificielle",
                  credits: 5,
                  cc: null,
                  tp: null,
                  exam: null,
                  final: null,
                  status: "pending",
                },
                {
                  code: "INF3202",
                  name: "Développement mobile",
                  credits: 4,
                  cc: null,
                  tp: null,
                  exam: null,
                  final: null,
                  status: "pending",
                },
              ],
            },
          ],
        },
        {
          id: "2023-2024",
          name: "2023-2024",
          semesters: [
            {
              id: "S1-2023",
              name: "Semestre 1",
              courses: [
                {
                  code: "INF2101",
                  name: "Algorithmes et structures de données",
                  credits: 6,
                  cc: 15,
                  tp: 16,
                  exam: 14,
                  final: 14.8,
                  status: "success",
                },
                {
                  code: "INF2102",
                  name: "Programmation orientée objet",
                  credits: 5,
                  cc: 13,
                  tp: 14,
                  exam: 12,
                  final: 12.8,
                  status: "success",
                },
              ],
            },
            {
              id: "S2-2023",
              name: "Semestre 2",
              courses: [
                {
                  code: "INF2201",
                  name: "Systèmes d'exploitation",
                  credits: 4,
                  cc: 12,
                  tp: 13,
                  exam: 11,
                  final: 11.8,
                  status: "success",
                },
                {
                  code: "INF2202",
                  name: "Introduction aux bases de données",
                  credits: 5,
                  cc: 14,
                  tp: 15,
                  exam: 13,
                  final: 13.8,
                  status: "success",
                },
              ],
            },
          ],
        },
      ]

      setAcademicYears(years)
      setSelectedYear(years[0].id)
      setSelectedSemester(years[0].semesters[0].id)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filtrer les semestres en fonction de l'année sélectionnée
  const filteredSemesters = academicYears.find((year) => year.id === selectedYear)?.semesters || []

  // Filtrer les cours en fonction du semestre sélectionné
  const filteredCourses = filteredSemesters.find((semester) => semester.id === selectedSemester)?.courses || []

  // Calculer la moyenne du semestre
  const calculateAverage = () => {
    if (filteredCourses.length === 0) return "N/A"

    let totalPoints = 0
    let totalCredits = 0

    filteredCourses.forEach((course) => {
      if (course.final !== null) {
        totalPoints += course.final * course.credits
        totalCredits += course.credits
      }
    })

    if (totalCredits === 0) return "N/A"
    return (totalPoints / totalCredits).toFixed(2)
  }

  // Fonction pour obtenir la couleur de la note
  const getNoteColor = (note: number | null) => {
    if (note === null) return ""
    if (note >= 12) return "text-green-600"
    if (note >= 10) return "text-blue-600"
    return "text-red-600"
  }

  const handleDownloadPDF = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Votre relevé de notes est en cours de téléchargement",
    })
  }

  return (
    <DashboardShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes notes</h1>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger le relevé
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Année académique</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semestre</label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un semestre" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSemesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vue</label>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Tableau
                </TabsTrigger>
                <TabsTrigger value="chart" className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  Graphique
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Relevé de notes
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Moyenne: </span>
                <span className={`font-bold text-lg ${getNoteColor(Number.parseFloat(calculateAverage()))}`}>
                  {isLoading ? <Skeleton className="h-6 w-16 inline-block" /> : calculateAverage()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : (
                <TabsContent value="table" className={viewMode === "table" ? "block" : "hidden"}>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Matière</TableHead>
                          <TableHead>Crédits</TableHead>
                          <TableHead>CC</TableHead>
                          <TableHead>TP</TableHead>
                          <TableHead>Examen</TableHead>
                          <TableHead>Note finale</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              Aucune note disponible pour ce semestre.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCourses.map((course) => (
                            <TableRow key={course.code}>
                              <TableCell className="font-medium">{course.code}</TableCell>
                              <TableCell>{course.name}</TableCell>
                              <TableCell>{course.credits}</TableCell>
                              <TableCell className={getNoteColor(course.cc)}>
                                {course.cc !== null ? course.cc : "-"}
                              </TableCell>
                              <TableCell className={getNoteColor(course.tp)}>
                                {course.tp !== null ? course.tp : "-"}
                              </TableCell>
                              <TableCell className={getNoteColor(course.exam)}>
                                {course.exam !== null ? course.exam : "-"}
                              </TableCell>
                              <TableCell className={`font-bold ${getNoteColor(course.final)}`}>
                                {course.final !== null ? course.final : "-"}
                              </TableCell>
                              <TableCell>
                                {course.status === "success" && (
                                  <span className="text-green-600 font-medium">Validé</span>
                                )}
                                {course.status === "fail" && (
                                  <span className="text-red-600 font-medium">Non validé</span>
                                )}
                                {course.status === "pending" && (
                                  <span className="text-yellow-600 font-medium">En attente</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="chart" className={viewMode === "chart" ? "block" : "hidden"}>
                <div className="h-80 flex items-center justify-center">
                  {isLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : (
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        Visualisation graphique des notes en cours de développement.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

