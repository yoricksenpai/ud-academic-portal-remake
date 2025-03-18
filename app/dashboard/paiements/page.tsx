"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, CreditCard, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Données factices pour les paiements
const paymentHistory = [
  {
    id: "INV-001",
    date: "10/01/2023",
    amount: "150 000 FCFA",
    status: "Payé",
    description: "Frais de scolarité - 1er versement",
    receipt: "/receipts/receipt-001.pdf",
  },
  {
    id: "INV-002",
    date: "15/03/2023",
    amount: "150 000 FCFA",
    status: "Payé",
    description: "Frais de scolarité - 2ème versement",
    receipt: "/receipts/receipt-002.pdf",
  },
  {
    id: "INV-003",
    date: "10/05/2023",
    amount: "150 000 FCFA",
    status: "En attente",
    description: "Frais de scolarité - 3ème versement",
    receipt: null,
  },
]

const upcomingPayments = [
  {
    id: "UP-001",
    dueDate: "15/06/2023",
    amount: "25 000 FCFA",
    description: "Frais d'examen",
    status: "À venir",
  },
  {
    id: "UP-002",
    dueDate: "30/06/2023",
    amount: "10 000 FCFA",
    description: "Frais de bibliothèque",
    status: "À venir",
  },
]

// Composant pour afficher les détails d'un paiement
function PaymentDetails({ payment }: { payment: any }) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Détails du paiement</DialogTitle>
        <DialogDescription>Référence: {payment.id}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Date</p>
            <p className="text-sm text-muted-foreground">{payment.date || payment.dueDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Montant</p>
            <p className="text-sm text-muted-foreground">{payment.amount}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Description</p>
          <p className="text-sm text-muted-foreground">{payment.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Statut</p>
          <Badge
            className={
              payment.status === "Payé"
                ? "bg-green-500"
                : payment.status === "En attente"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
            }
          >
            {payment.status}
          </Badge>
        </div>
      </div>
      <DialogFooter>
        {payment.receipt && (
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger le reçu
          </Button>
        )}
        {payment.status === "En attente" && (
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payer maintenant
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  )
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("history")

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
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Paiements</h1>
          <p className="text-muted-foreground">Consultez et gérez vos paiements universitaires</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Résumé des paiements</CardTitle>
              <CardDescription>Vue d'ensemble de votre situation financière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total payé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">300 000 FCFA</div>
                    <p className="text-xs text-muted-foreground">sur 450 000 FCFA</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Paiements en attente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">150 000 FCFA</div>
                    <p className="text-xs text-muted-foreground">Échéance: 10/05/2023</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Prochains paiements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35 000 FCFA</div>
                    <p className="text-xs text-muted-foreground">2 paiements à venir</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Historique des paiements</TabsTrigger>
              <TabsTrigger value="upcoming">Paiements à venir</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des paiements</CardTitle>
                  <CardDescription>Consultez tous vos paiements effectués et en attente</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "Payé"
                                  ? "bg-green-500"
                                  : payment.status === "En attente"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Voir les détails</span>
                                </Button>
                              </DialogTrigger>
                              <PaymentDetails payment={payment} />
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Exporter l'historique</Button>
                  <Button variant="outline" disabled>
                    Paiements précédents
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paiements à venir</CardTitle>
                  <CardDescription>Consultez les paiements à effectuer prochainement</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Référence</TableHead>
                        <TableHead>Date d'échéance</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">{payment.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Voir les détails</span>
                                  </Button>
                                </DialogTrigger>
                                <PaymentDetails payment={payment} />
                              </Dialog>
                              <Button size="sm" className="gap-1">
                                <CreditCard className="h-3 w-3" />
                                Payer
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <p>Les paiements doivent être effectués avant la date d'échéance pour éviter des pénalités.</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}

