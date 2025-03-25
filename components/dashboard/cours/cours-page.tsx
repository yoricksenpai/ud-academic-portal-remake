"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CoursForm } from "@/components/dashboard/cours/cours-form";
import {
  FileEdit,
  FilePlus,
  Trash2,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { NewInscriptionForm } from "../inscriptions/new-inscription-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Types for courses
type CourseStatus = "active" | "inactive";

interface Course {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  credits: number;
  semester: string;
  instructorId: string;
  instructorName: string;
  status: CourseStatus;
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

interface DeleteDialogProps {
  isOpen: boolean;
  courseToDelete: Course | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CoursPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const { toast } = useToast();
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive",
        });
      }
    }

    fetchCourses();
  }, [toast]);

  const handleNewCourse = (newCourse: Course) => {
    setCourses([newCourse, ...courses]);
    toast({
      title: "Course Added",
      description: "The new course has been added successfully.",
      variant: "success",
    });
  };

  const handleDelete = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) throw new Error("Failed to delete course");
      
      setCourses(courses.filter((course) => course.id !== courseId));
      setCourseToDelete(null);
      
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (course: Course) => {
    setCourseToEdit(course);
    setShowNewCourseForm(true);
  };

  const handleFormSubmit = (data: Course) => {
    if (courseToEdit) {
      setCourses(courses.map(c => c.id === data.id ? data : c));
      setCourseToEdit(null);
    } else {
      setCourses([data, ...courses]);
    }
    setShowNewCourseForm(false);
    toast({
      title: courseToEdit ? "Course Updated" : "Course Added",
      description: `The course has been ${courseToEdit ? 'updated' : 'added'} successfully.`,
      variant: "success",
    });
  };

  return (
    <DashboardShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl font-bold">Courses Management</h1>
          <Button onClick={() => setShowNewCourseForm(true)}>
            <FilePlus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No courses found
                          </TableCell>
                        </TableRow>
                      ) : (
                        courses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">
                              {course.courseCode}
                            </TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>{course.description}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.semester}</TableCell>
                            <TableCell>
                              {course.instructor?.firstName} {course.instructor?.lastName}
                              <span className="block text-xs text-muted-foreground">
                                {course.instructor?.department}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                                  <FileEdit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-destructive"
                                  onClick={() => setCourseToDelete(course)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {showNewCourseForm && (
          <CoursForm
            onClose={() => {
              setShowNewCourseForm(false);
              setCourseToEdit(null);
            }}
            onSubmit={handleFormSubmit}
            initialData={courseToEdit || undefined}
          />
        )}

        <AlertDialog 
          open={!!courseToDelete} 
          onOpenChange={() => setCourseToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the course "{courseToDelete?.title}". 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => courseToDelete && handleDelete(courseToDelete.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </DashboardShell>
  );
}
