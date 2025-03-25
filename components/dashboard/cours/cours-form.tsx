"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const SEMESTERS = ["Fall 2023", "Spring 2024", "Fall 2024", "Spring 2025"]
const CREDITS = [1, 2, 3, 4, 5, 6]

interface Instructor {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
}

interface CourseFormProps {
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: {
    id: string
    courseCode: string
    title: string
    description: string
    credits: number
    semester: string
    instructorId: number
  }
}

export function CoursForm({ onClose, onSubmit, initialData }: CourseFormProps) {
  const [formData, setFormData] = useState({
    courseCode: initialData?.courseCode || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    credits: initialData?.credits || 3,
    semester: initialData?.semester || "",
    instructorId: initialData?.instructorId || null,
    status: "active"
  })
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [instructors, setInstructors] = useState<Instructor[]>([])

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('/api/instructors')
        if (!response.ok) throw new Error('Failed to fetch instructors')
        const data = await response.json()
        setInstructors(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load instructors",
          variant: "destructive",
        })
      }
    }

    fetchInstructors()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = initialData 
        ? `/api/courses/${initialData.id}`
        : '/api/courses'
      
      const method = initialData ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error(`Failed to ${initialData ? 'update' : 'create'} course`)

      const data = await response.json()
      onSubmit(data)
      onClose()
      toast({
        title: initialData ? "Course updated" : "Course created",
        description: `The course has been ${initialData ? 'updated' : 'created'} successfully`,
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'create'} course`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                placeholder="e.g., CS101"
                value={formData.courseCode}
                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min={1}
                max={6}
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => setFormData({ ...formData, semester: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                  <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select
                value={formData.instructorId?.toString() || ""}
                onValueChange={(value) => setFormData({ ...formData, instructorId: parseInt(value) })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id.toString()}>
                      {`${instructor.firstName} ${instructor.lastName} - ${instructor.department}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (initialData ? "Updating..." : "Creating...") : 
                            (initialData ? "Update Course" : "Create Course")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
