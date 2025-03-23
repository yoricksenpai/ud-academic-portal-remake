"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  Calendar,
  Clock,
  Download,
  MapPin,
  CalendarDays,
  CalendarIcon,
  User,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/auth-provider";

// Types pour l'emploi du temps
interface CourseSession {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "CM" | "TD" | "TP";
}

interface WeeklySchedule {
  monday: CourseSession[];
  tuesday: CourseSession[];
  wednesday: CourseSession[];
  thursday: CourseSession[];
  friday: CourseSession[];
  saturday: CourseSession[];
  sunday?: CourseSession[]; // Make this optional since it's rare to have Sunday classes
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

export function EmploiDuTempsPage() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [selectedWeek, setSelectedWeek] = useState<string>("current");
  const [isLoading, setIsLoading] = useState(true);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { session } = useAuth();

  // Define the week dates
  const [weekDates, setWeekDates] = useState<string>("");

  // Calculate week dates
  useEffect(() => {
    const today = new Date();
    let startDate: Date;

    switch (selectedWeek) {
      case "previous":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() - 6); // Previous week's Monday
        break;
      case "next":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() + 8); // Next week's Monday
        break;
      default: // current
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay() + 1); // This week's Monday
        if (today.getDay() === 0) startDate.setDate(today.getDate() + 1); // If today is Sunday
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5); // Saturday

    // Format the dates
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "numeric",
      });
    };

    setWeekDates(`${formatDate(startDate)} au ${formatDate(endDate)}`);
  }, [selectedWeek]);

  // Fetch timetable data from API
  const fetchTimeTable = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/timetable/student");

      if (!response.ok) {
        throw new Error(`Error fetching timetable: ${response.statusText}`);
      }

      const data = await response.json();
      setWeeklySchedule(data);
    } catch (err) {
      console.error("Failed to fetch timetable:", err);
      setError("Impossible de charger l'emploi du temps. Veuillez réessayer.");
      toast({
        title: "Erreur",
        description:
          "Impossible de charger l'emploi du temps. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchTimeTable();
  }, [selectedWeek]);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchTimeTable();
    toast({
      title: "Actualisation",
      description: "Emploi du temps actualisé",
    });
  };

  // Fonction pour obtenir la couleur de fond selon le type de cours
  const getSessionColor = (type: "CM" | "TD" | "TP") => {
    switch (type) {
      case "CM":
        return "bg-blue-100 border-blue-300 hover:bg-blue-200";
      case "TD":
        return "bg-green-100 border-green-300 hover:bg-green-200";
      case "TP":
        return "bg-purple-100 border-purple-300 hover:bg-purple-200";
      default:
        return "bg-gray-100 border-gray-300 hover:bg-gray-200";
    }
  };

  // Fonction pour rendre les sessions d'un jour
  const renderDaySessions = (day: CourseSession[] | undefined) => {
    if (!day || day.length === 0) {
      return (
        <p className='text-center text-muted-foreground py-4'>Aucun cours</p>
      );
    }

    return day.map((session) => (
      <motion.div
        key={session.id}
        className={`p-3 mb-3 rounded-md border ${getSessionColor(
          session.type
        )} cursor-pointer transition-all`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className='flex justify-between items-start mb-2'>
          <h4 className='font-semibold'>{session.courseName}</h4>
          <span className='text-xs font-medium px-2 py-1 rounded bg-white'>
            {session.type}
          </span>
        </div>
        <div className='text-sm space-y-1'>
          <p className='flex items-center'>
            <Clock className='h-3 w-3 mr-1' />
            {session.startTime} - {session.endTime}
          </p>
          <p className='flex items-center'>
            <MapPin className='h-3 w-3 mr-1' />
            {session.location}
          </p>
          <p className='flex items-center text-muted-foreground text-xs'>
            <User className='h-3 w-3 mr-1' />
            {session.instructor}
          </p>
        </div>
      </motion.div>
    ));
  };

  const handleDownload = () => {
    // Navigate to the export endpoint
    window.location.href = "/api/timetable/export";

    toast({
      title: "Téléchargement en cours",
      description:
        "Votre emploi du temps est en cours de téléchargement au format iCalendar",
    });
  };

  return (
    <DashboardShell>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div
          variants={itemVariants}
          className='flex justify-between items-center mb-6'
        >
          <h1 className='text-2xl font-bold'>Mon emploi du temps</h1>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleRefresh}>
              <RefreshCw className='mr-2 h-4 w-4' />
              Actualiser
            </Button>
            <Button onClick={handleDownload}>
              <Download className='mr-2 h-4 w-4' />
              Télécharger
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'
        >
          <div>
            <label className='block text-sm font-medium mb-1'>Semaine</label>
            {isLoading ? (
              <Skeleton className='h-10 w-full' />
            ) : (
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue placeholder='Sélectionner une semaine' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='previous'>Semaine précédente</SelectItem>
                  <SelectItem value='current'>Semaine actuelle</SelectItem>
                  <SelectItem value='next'>Semaine prochaine</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className='md:col-span-2'>
            <label className='block text-sm font-medium mb-1'>Vue</label>
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as any)}
            >
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='day' className='flex items-center'>
                  <CalendarDays className='h-4 w-4 mr-2' />
                  Jour
                </TabsTrigger>
                <TabsTrigger value='week' className='flex items-center'>
                  <Calendar className='h-4 w-4 mr-2' />
                  Semaine
                </TabsTrigger>
                <TabsTrigger value='month' className='flex items-center'>
                  <CalendarIcon className='h-4 w-4 mr-2' />
                  Mois
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className='border-primary/20'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Calendar className='h-5 w-5 mr-2 text-primary' />
                Emploi du temps - Semaine du {weekDates}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className='h-64 w-full' />
                  ))}
                </div>
              ) : error ? (
                <div className='p-8 text-center'>
                  <p className='text-destructive mb-4'>{error}</p>
                  <Button variant='outline' onClick={handleRefresh}>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Réessayer
                  </Button>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Lundi
                    </h3>
                    {renderDaySessions(weeklySchedule?.monday)}
                  </div>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Mardi
                    </h3>
                    {renderDaySessions(weeklySchedule?.tuesday)}
                  </div>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Mercredi
                    </h3>
                    {renderDaySessions(weeklySchedule?.wednesday)}
                  </div>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Jeudi
                    </h3>
                    {renderDaySessions(weeklySchedule?.thursday)}
                  </div>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Vendredi
                    </h3>
                    {renderDaySessions(weeklySchedule?.friday)}
                  </div>
                  <div>
                    <h3 className='font-semibold mb-3 text-center py-2 bg-muted rounded-md'>
                      Samedi
                    </h3>
                    {renderDaySessions(weeklySchedule?.saturday)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='mt-6 flex flex-wrap items-center gap-4'
        >
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2'></div>
            <span className='text-sm'>Cours magistral (CM)</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-green-100 border border-green-300 rounded mr-2'></div>
            <span className='text-sm'>Travaux dirigés (TD)</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-purple-100 border border-purple-300 rounded mr-2'></div>
            <span className='text-sm'>Travaux pratiques (TP)</span>
          </div>
        </motion.div>
      </motion.div>
    </DashboardShell>
  );
}
