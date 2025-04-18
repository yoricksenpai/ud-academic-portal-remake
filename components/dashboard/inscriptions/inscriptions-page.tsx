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
import { NewInscriptionForm } from "@/components/dashboard/inscriptions/new-inscription-form";
import {
  FileEdit,
  FilePlus,
  Trash2,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Types pour les inscriptions
type InscriptionStatus = "pending" | "validated" | "rejected";

interface Inscription {
  id: string;
  academicYear: string;
  faculty: string;
  program: string;
  level: string;
  registrationDate: string;
  status: InscriptionStatus;
  studentId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  major?: string;
  enrolledYear?: number;
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

export function InscriptionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNewInscriptionForm, setShowNewInscriptionForm] = useState(false);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchInscriptions() {
      try {
        const response = await fetch("/api/inscriptions");
        if (!response.ok) throw new Error("Failed to fetch inscriptions");
        const data = await response.json();
        setInscriptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des inscriptions",
          variant: "destructive",
        });
      }
    }

    fetchInscriptions();
  }, [toast]);

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadge = (status: InscriptionStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            En attente
          </Badge>
        );
      case "validated":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Validée
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Rejetée
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleNewInscription = (data: any) => {
    // Simuler l'ajout d'une nouvelle inscription
    const newInscription: Inscription = {
      id: `INS-2025-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      academicYear: data.academicYear,
      faculty: data.faculty,
      program: data.program,
      level: data.level,
      registrationDate: new Date().toLocaleDateString("fr-FR"),
      status: "pending",
    };

    setInscriptions([newInscription, ...inscriptions]);
    setShowNewInscriptionForm(false);

    toast({
      title: "Inscription créée",
      description: "Votre demande d'inscription a été soumise avec succès",
      variant: "success",
    });
  };

  const handleDeleteInscription = (id: string) => {
    // Vérifier si l'inscription peut être supprimée
    const inscription = inscriptions.find((i) => i.id === id);

    if (inscription?.status === "validated") {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas supprimer une inscription validée",
        variant: "destructive",
      });
      return;
    }

    // Simuler la suppression
    setInscriptions(inscriptions.filter((i) => i.id !== id));

    toast({
      title: "Inscription supprimée",
      description: "L'inscription a été supprimée avec succès",
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
          <h1 className="text-2xl font-bold">Gestion des inscriptions</h1>
          <Button onClick={() => setShowNewInscriptionForm(true)}>
            <FilePlus className="mr-2 h-4 w-4" />
            Nouvelle inscription
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Mes inscriptions
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
                        <TableHead>ID Inscription</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Filière</TableHead>
                        <TableHead>Année d'inscription</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inscriptions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            Aucune inscription trouvée
                          </TableCell>
                        </TableRow>
                      ) : (
                        inscriptions.map((inscription) => (
                          <TableRow key={inscription.id}>
                            <TableCell className="font-medium">
                              {inscription.studentId || inscription.id}
                            </TableCell>
                            <TableCell>{`${inscription.firstName || ""} ${
                              inscription.lastName || ""
                            }`}</TableCell>
                            <TableCell>{inscription.email || ""}</TableCell>
                            <TableCell>
                              {inscription.major || "Non spécifié"}
                            </TableCell>
                            <TableCell>
                              {inscription.enrolledYear || "-"}
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
      </motion.div>

      {showNewInscriptionForm && (
        <NewInscriptionForm
          onClose={() => setShowNewInscriptionForm(false)}
          onSubmit={handleNewInscription}
        />
      )}
    </DashboardShell>
  );
}
