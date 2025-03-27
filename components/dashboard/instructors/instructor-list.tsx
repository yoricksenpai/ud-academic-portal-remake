"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { FilePlus, UserPlus, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { NewInstructorForm } from "./new-instructor-form"

interface Instructor {
  id: number
  staffId: string
  firstName: string
  lastName: string
  email: string
  department: string
}

export function InstructorList() {
  const [isLoading, setIsLoading] = useState(true)
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [showNewForm, setShowNewForm] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const response = await fetch("/api/instructors")
      const data = await response.json()
      setInstructors(data)
      setIsLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load instructors",
        variant: "destructive",
      })
    }
  }

  const handleNewInstructor = (instructor: Instructor) => {
    setInstructors([instructor, ...instructors])
    setShowNewForm(false)
    toast({
      title: "Success",
      description: "Instructor added successfully",
    })
  }

  return (
    <DashboardShell>
      <motion.div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Instructors</h2>
          <Button onClick={() => setShowNewForm(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Instructor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Instructor List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instructors.map((instructor) => (
                    <TableRow key={instructor.id}>
                      <TableCell>{instructor.staffId}</TableCell>
                      <TableCell>{`${instructor.firstName} ${instructor.lastName}`}</TableCell>
                      <TableCell>{instructor.email}</TableCell>
                      <TableCell>{instructor.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {showNewForm && (
          <NewInstructorForm
            onClose={() => setShowNewForm(false)}
            onSubmit={handleNewInstructor}
          />
        )}
      </motion.div>
    </DashboardShell>
  )
}
