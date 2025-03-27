"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  Bell,
  FileText,
  Home,
  Mail,
  CreditCard,
  CalendarIcon,
  BookOpen,
  Clock,
  Users,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

export function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  // Simuler le chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Données de notification simulées
      setNotifications([
        {
          id: "1",
          title: "Inscription validée",
          message:
            "Votre inscription pour l'année académique 2024-2025 a été validée.",
          type: "success",
          read: false,
          createdAt: "2025-03-10T10:30:00Z",
        },
        {
          id: "2",
          title: "Nouveau cours ajouté",
          message:
            "Un nouveau cours a été ajouté à votre emploi du temps: INF3104 - Sécurité informatique.",
          type: "info",
          read: false,
          createdAt: "2025-03-12T14:15:00Z",
        },
        {
          id: "3",
          title: "Rappel de paiement",
          message:
            "N'oubliez pas de régler vos frais de scolarité avant le 31 mars 2025.",
          type: "warning",
          read: false,
          createdAt: "2025-03-13T09:00:00Z",
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    toast({
      title: "Notifications",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  return (
    <DashboardShell>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <Card className="mb-6 overflow-hidden border-primary/20">
            <CardHeader className="bg-muted py-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Mon profil</span>
                <Badge variant="outline" className="bg-primary/10">
                  Étudiant
                </Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                École Nationale Supérieure Polytechnique de Douala
              </p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center p-4">
                <div className="border border-gray-300 p-1 mb-4 rounded-md overflow-hidden">
                  <p className="text-sm font-medium mb-2 text-center">
                    24G02037
                  </p>
                  <div className="w-32 h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=160&width=128"
                      alt="Photo de profil"
                      width={128}
                      height={160}
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="font-medium text-center mb-1">
                  PRISO JOHAN YORICK
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  priso.johan@univ-douala.cm
                </p>

                <div className="w-full">
                  <h4 className="text-sm font-medium mb-2">
                    Informations académiques
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Filière:</span>
                      <span className="font-medium">Génie Informatique</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Niveau:</span>
                      <span className="font-medium">Niveau 3</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Année:</span>
                      <span className="font-medium">2024-2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Statut:</span>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Actif
                      </Badge>
                    </li>
                  </ul>
                </div>

                <div className="w-full mt-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <Card className="mb-6 overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <Tabs defaultValue="accueil">
                <TabsList className="w-full justify-start border-b rounded-none bg-white p-0">
                  <TabsTrigger
                    value="accueil"
                    className="data-[state=active]:bg-muted rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Accueil
                  </TabsTrigger>
                  <TabsTrigger
                    value="boite"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Messages
                    <Badge className="ml-2 bg-red-500 text-white">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="inscription"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Inscription
                  </TabsTrigger>
                  <TabsTrigger
                    value="paiements"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Paiements
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="accueil" className="p-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <h2 className="text-lg font-bold text-primary mb-1">
                      Bienvenue dans votre espace personnel
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Consultez vos informations académiques, suivez vos notes
                      et gérez vos inscriptions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-amber-500" />
                          Notifications récentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <div className="space-y-2">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : (
                          <NotificationsPanel
                            notifications={notifications}
                            onMarkAllAsRead={handleMarkAllAsRead}
                          />
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          Activité récente
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isLoading ? (
                          <div className="space-y-2">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        ) : (
                          <RecentActivity />
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">Accès rapide</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DashboardCard
                      title="Mes inscriptions"
                      description="Consultez et gérez vos inscriptions"
                      href="/dashboard/inscriptions"
                      icon={<FileText className="h-5 w-5 text-indigo-500" />}
                    />
                    <DashboardCard
                      title="Mes notes"
                      description="Consultez vos notes et relevés"
                      href="/dashboard/notes"
                      icon={<BookOpen className="h-5 w-5 text-emerald-500" />}
                    />
                    <DashboardCard
                      title="Mon emploi du temps"
                      description="Consultez votre emploi du temps"
                      href="/dashboard/emploi-du-temps"
                      icon={<CalendarIcon className="h-5 w-5 text-amber-500" />}
                    />
                    <DashboardCard
                      title="Mes paiements"
                      description="Effectuez et suivez vos paiements"
                      href="/dashboard/paiements"
                      icon={<CreditCard className="h-5 w-5 text-rose-500" />}
                    />
                    <DashboardCard
                      title="Mes présences"
                      description="Consultez vos relevés de présence"
                      href="/dashboard/presences"
                      icon={<Users className="h-5 w-5 text-blue-500" />}
                    />
                    <DashboardCard
                      title="Mes documents"
                      description="Téléchargez vos documents officiels"
                      href="/dashboard/documents"
                      icon={<FileText className="h-5 w-5 text-purple-500" />}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="boite" className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Boîte de réception
                  </h2>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">Inscription validée</h3>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Nouveau
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Votre inscription pour l'année académique 2024-2025 a
                          été validée.
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>De: Administration</span>
                          <span>10 Mars 2025, 10:30</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">
                            Rappel: Réunion d'information
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Nouveau
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Une réunion d'information aura lieu le 15 mars à 14h00
                          dans l'amphithéâtre principal.
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>De: Secrétariat</span>
                          <span>8 Mars 2025, 15:45</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">
                            Mise à jour du programme
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800"
                          >
                            Nouveau
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Le programme de cours a été mis à jour. Veuillez
                          consulter votre emploi du temps.
                        </p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>De: Département Informatique</span>
                          <span>5 Mars 2025, 09:15</span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="inscription" className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Mon inscription
                  </h2>
                  {isLoading ? (
                    <Skeleton className="h-64 w-full" />
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Année académique 2024-2025
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Inscription validée le 15/09/2024
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Validée
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">
                              Informations académiques
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Faculté:
                                </span>
                                <span>
                                  École Nationale Supérieure Polytechnique
                                </span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Programme:
                                </span>
                                <span>Génie Informatique</span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Niveau:
                                </span>
                                <span>Niveau 3</span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Régime:
                                </span>
                                <span>Temps plein</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Informations financières
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Frais de scolarité:
                                </span>
                                <span>600 000 FCFA</span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Montant payé:
                                </span>
                                <span>600 000 FCFA</span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Solde:
                                </span>
                                <span className="text-green-600 font-medium">
                                  0 FCFA
                                </span>
                              </li>
                              <li className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Statut de paiement:
                                </span>
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800"
                                >
                                  Complet
                                </Badge>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Télécharger l'attestation
                          </Button>
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Télécharger la fiche
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Autres onglets */}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardShell>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-all border-primary/20 overflow-hidden group hover:border-primary/50">
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="p-2 rounded-md bg-primary/10 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-medium group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
