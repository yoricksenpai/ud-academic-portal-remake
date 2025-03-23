"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Clock,
  Edit,
  Plus,
  Search,
  Trash2,
  CalendarRange,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

// Types for the timetable
interface Course {
  id: number;
  courseCode: string;
  title: string;
}

interface ClassSession {
  id: number;
  courseId: number;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "CM" | "TD" | "TP";
  repeatWeekly: boolean;
  startDate: string;
  endDate?: string;
  // Joined data
  course?: {
    courseCode: string;
    title: string;
    instructor: {
      firstName: string;
      lastName: string;
    };
  };
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
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function AdminTimetablePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { session, status } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSession, setCurrentSession] = useState<ClassSession | null>(
    null
  );

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Check if user is admin
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits pour accéder à cette page.",
        variant: "destructive",
      });
      router.push("/dashboard");
    }
  }, [status, session, router, toast]);

  // Fetch all class sessions
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/timetable");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
      setError("Impossible de charger les sessions de cours.");
      toast({
        title: "Erreur",
        description: "Impossible de charger les sessions de cours.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all courses for the form
  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des cours.",
        variant: "destructive",
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSessions();
    fetchCourses();
  }, []);

  // Filter sessions based on search and filters
  const filteredSessions = sessions.filter((session) => {
    const courseCode = session.course?.courseCode || "";
    const courseTitle = session.course?.title || "";
    const instructor = session.course?.instructor
      ? `${session.course.instructor.firstName} ${session.course.instructor.lastName}`
      : "";

    const matchesSearch =
      searchTerm === "" ||
      courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDay =
      dayFilter === "" || session.day.toLowerCase() === dayFilter.toLowerCase();
    const matchesType = typeFilter === "" || session.type === typeFilter;
    const matchesCourse =
      courseFilter === "" || session.courseId.toString() === courseFilter;

    return matchesSearch && matchesDay && matchesType && matchesCourse;
  });

  // Pagination logic
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  // Open form for creating a new session
  const handleAddNew = () => {
    setCurrentSession({
      id: 0,
      courseId: 0,
      day: "Lundi",
      startTime: "08:00",
      endTime: "10:00",
      location: "",
      type: "CM",
      repeatWeekly: true,
      startDate: new Date().toISOString().split("T")[0],
    });
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Open form for editing a session
  const handleEdit = (session: ClassSession) => {
    setCurrentSession(session);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSession((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCurrentSession((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setCurrentSession((prev) =>
      prev ? { ...prev, repeatWeekly: checked } : null
    );
  };

  // Save the session (create or update)
  const handleSaveSession = async () => {
    if (!currentSession) return;

    setIsLoading(true);
    try {
      const url = isEditMode
        ? `/api/timetable/${currentSession.id}`
        : "/api/timetable";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentSession),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Refresh the sessions list
      await fetchSessions();

      toast({
        title: isEditMode ? "Session mise à jour" : "Session créée",
        description: isEditMode
          ? "La session a été mise à jour avec succès."
          : "La nouvelle session a été créée avec succès.",
      });

      // Close the form
      setIsFormOpen(false);
      setCurrentSession(null);
    } catch (err) {
      console.error("Failed to save session:", err);
      toast({
        title: "Erreur",
        description: isEditMode
          ? "Impossible de mettre à jour la session."
          : "Impossible de créer la session.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a session
  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/timetable/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Refresh the sessions list
      await fetchSessions();

      toast({
        title: "Session supprimée",
        description: "La session a été supprimée avec succès.",
      });
    } catch (err) {
      console.error("Failed to delete session:", err);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la session.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setDayFilter("");
    setTypeFilter("");
    setCourseFilter("");
    setCurrentPage(1);
  };

  // Get color for session type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "CM":
        return "bg-blue-100 text-blue-800";
      case "TD":
        return "bg-green-100 text-green-800";
      case "TP":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format day name
  const formatDay = (day: string) => {
    const days: Record<string, string> = {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    };

    return days[day.toLowerCase()] || day;
  };

  return (
    <DashboardShell>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='space-y-6'
      >
        <motion.div
          variants={itemVariants}
          className='flex justify-between items-center'
        >
          <div>
            <h1 className='text-2xl font-bold'>Gestion des Emplois du Temps</h1>
            <p className='text-muted-foreground'>
              Créez, modifiez et supprimez des sessions de cours
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className='mr-2 h-4 w-4' />
            Ajouter une session
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {/* Search box */}
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Rechercher...'
                    className='pl-8'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Day filter */}
                <Select value={dayFilter} onValueChange={setDayFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Jour' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=''>Tous les jours</SelectItem>
                    <SelectItem value='monday'>Lundi</SelectItem>
                    <SelectItem value='tuesday'>Mardi</SelectItem>
                    <SelectItem value='wednesday'>Mercredi</SelectItem>
                    <SelectItem value='thursday'>Jeudi</SelectItem>
                    <SelectItem value='friday'>Vendredi</SelectItem>
                    <SelectItem value='saturday'>Samedi</SelectItem>
                  </SelectContent>
                </Select>

                {/* Type filter */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Type de cours' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=''>Tous les types</SelectItem>
                    <SelectItem value='CM'>Cours Magistral (CM)</SelectItem>
                    <SelectItem value='TD'>Travaux Dirigés (TD)</SelectItem>
                    <SelectItem value='TP'>Travaux Pratiques (TP)</SelectItem>
                  </SelectContent>
                </Select>

                {/* Course filter */}
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Cours' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=''>Tous les cours</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.courseCode} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Reset filters button */}
                <div className='md:col-span-4 flex justify-end'>
                  <Button variant='outline' onClick={handleResetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Sessions de cours</CardTitle>
              <CardDescription>
                {filteredSessions.length} session(s) trouvée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='space-y-2'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className='h-12 w-full' />
                  ))}
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className='text-center py-8'>
                  <CalendarRange className='h-12 w-12 mx-auto text-muted-foreground' />
                  <h3 className='mt-2 text-lg font-medium'>
                    Aucune session trouvée
                  </h3>
                  <p className='text-muted-foreground'>
                    Essayez de modifier vos filtres ou d'ajouter une nouvelle
                    session.
                  </p>
                </div>
              ) : (
                <>
                  <div className='border rounded-md overflow-hidden'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cours</TableHead>
                          <TableHead>Jour</TableHead>
                          <TableHead>Horaire</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Lieu</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell className='font-medium'>
                              {session.course?.courseCode} -{" "}
                              {session.course?.title}
                              <div className='text-xs text-muted-foreground'>
                                {session.course?.instructor
                                  ? `${session.course.instructor.firstName} ${session.course.instructor.lastName}`
                                  : ""}
                              </div>
                            </TableCell>
                            <TableCell>{formatDay(session.day)}</TableCell>
                            <TableCell>
                              {session.startTime} - {session.endTime}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                                  session.type
                                )}`}
                              >
                                {session.type}
                              </span>
                            </TableCell>
                            <TableCell>{session.location}</TableCell>
                            <TableCell className='text-right'>
                              <div className='flex justify-end space-x-2'>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => handleEdit(session)}
                                >
                                  <Edit className='h-4 w-4' />
                                  <span className='sr-only'>Modifier</span>
                                </Button>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => handleDelete(session.id)}
                                >
                                  <Trash2 className='h-4 w-4 text-destructive' />
                                  <span className='sr-only'>Supprimer</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className='mt-4'>
                      <PaginationContent>
                        <PaginationItem>
                          {currentPage > 1 && (
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                              }
                            />
                          )}
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setCurrentPage(i + 1)}
                              isActive={currentPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          {currentPage < totalPages && (
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                              }
                            />
                          )}
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Create/Edit Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Modifier une session" : "Ajouter une session"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Modifiez les détails de la session de cours."
                  : "Créez une nouvelle session de cours."}
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              {/* Course selection */}
              <div className='grid gap-2'>
                <Label htmlFor='courseId'>Cours</Label>
                <Select
                  value={currentSession?.courseId.toString() || ""}
                  onValueChange={(value) =>
                    handleSelectChange("courseId", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Sélectionner un cours' />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.courseCode} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Day selection */}
              <div className='grid gap-2'>
                <Label htmlFor='day'>Jour</Label>
                <Select
                  value={currentSession?.day.toLowerCase() || ""}
                  onValueChange={(value) => handleSelectChange("day", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Sélectionner un jour' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='monday'>Lundi</SelectItem>
                    <SelectItem value='tuesday'>Mardi</SelectItem>
                    <SelectItem value='wednesday'>Mercredi</SelectItem>
                    <SelectItem value='thursday'>Jeudi</SelectItem>
                    <SelectItem value='friday'>Vendredi</SelectItem>
                    <SelectItem value='saturday'>Samedi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time range */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='startTime'>Heure de début</Label>
                  <Input
                    id='startTime'
                    name='startTime'
                    type='time'
                    value={currentSession?.startTime || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='endTime'>Heure de fin</Label>
                  <Input
                    id='endTime'
                    name='endTime'
                    type='time'
                    value={currentSession?.endTime || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Location */}
              <div className='grid gap-2'>
                <Label htmlFor='location'>Lieu</Label>
                <Input
                  id='location'
                  name='location'
                  value={currentSession?.location || ""}
                  onChange={handleInputChange}
                  placeholder='Amphi 300, Salle 102...'
                />
              </div>

              {/* Session type */}
              <div className='grid gap-2'>
                <Label htmlFor='type'>Type de cours</Label>
                <Select
                  value={currentSession?.type || ""}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Sélectionner un type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='CM'>Cours Magistral (CM)</SelectItem>
                    <SelectItem value='TD'>Travaux Dirigés (TD)</SelectItem>
                    <SelectItem value='TP'>Travaux Pratiques (TP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Repeat weekly */}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='repeatWeekly'
                  checked={currentSession?.repeatWeekly}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor='repeatWeekly'>Répéter chaque semaine</Label>
              </div>

              {/* Date range */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='startDate'>Date de début</Label>
                  <Input
                    id='startDate'
                    name='startDate'
                    type='date'
                    value={currentSession?.startDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='endDate'>Date de fin (optionnel)</Label>
                  <Input
                    id='endDate'
                    name='endDate'
                    type='date'
                    value={currentSession?.endDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setIsFormOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveSession} disabled={isLoading}>
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardShell>
  );
}
