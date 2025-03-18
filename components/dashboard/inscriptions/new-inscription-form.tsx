"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Loader2, FilePlus } from "lucide-react"

interface NewInscriptionFormProps {
  onClose: () => void
  onSubmit: (data: any) => void
}

export function NewInscriptionForm({ onClose, onSubmit }: NewInscriptionFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    academicYear: "2025-2026",
    faculty: "",
    program: "",
    level: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validation basique
      if (!formData.faculty || !formData.program || !formData.level) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Envoyer les données au parent
      onSubmit(formData)
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-xl border-primary/20">
          <CardHeader className="bg-primary text-white relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-white hover:bg-primary-foreground/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardTitle className="flex items-center text-xl">
              <FilePlus className="h-5 w-5 mr-2" />
              Nouvelle inscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="academicYear">Année académique</Label>
                <Select
                  value={formData.academicYear}
                  onValueChange={(value) => handleChange("academicYear", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une année académique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty">Faculté / École</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value) => handleChange("faculty", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une faculté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="École Nationale Supérieure Polytechnique">
                      École Nationale Supérieure Polytechnique
                    </SelectItem>
                    <SelectItem value="Faculté des Sciences">Faculté des Sciences</SelectItem>
                    <SelectItem value="Faculté des Sciences Économiques et de Gestion">
                      Faculté des Sciences Économiques et de Gestion
                    </SelectItem>
                    <SelectItem value="Faculté de Génie Industriel">Faculté de Génie Industriel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Programme / Filière</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => handleChange("program", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un programme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Génie Informatique">Génie Informatique</SelectItem>
                    <SelectItem value="Génie Civil">Génie Civil</SelectItem>
                    <SelectItem value="Génie Électrique">Génie Électrique</SelectItem>
                    <SelectItem value="Génie Mécanique">Génie Mécanique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Niveau</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleChange("level", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Niveau 1">Niveau 1</SelectItem>
                    <SelectItem value="Niveau 2">Niveau 2</SelectItem>
                    <SelectItem value="Niveau 3">Niveau 3</SelectItem>
                    <SelectItem value="Niveau 4">Niveau 4</SelectItem>
                    <SelectItem value="Niveau 5">Niveau 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="bg-primary">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Soumettre
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

