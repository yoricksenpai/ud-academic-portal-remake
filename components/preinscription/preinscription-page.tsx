"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"
import {
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Download,
  GraduationCap,
  ClipboardList,
} from "lucide-react"

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

// Données pour les programmes d'études
const programs = [
  {
    id: "prog-001",
    faculty: "École Nationale Supérieure Polytechnique",
    degrees: [
      { name: "Génie Informatique", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Génie Civil", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Génie Électrique", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Génie Mécanique", levels: ["Licence", "Master", "Doctorat"] },
    ],
  },
  {
    id: "prog-002",
    faculty: "Faculté des Sciences",
    degrees: [
      { name: "Mathématiques", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Physique", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Chimie", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Biologie", levels: ["Licence", "Master", "Doctorat"] },
    ],
  },
  {
    id: "prog-003",
    faculty: "Faculté des Sciences Économiques et de Gestion",
    degrees: [
      { name: "Économie", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Gestion", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Finance", levels: ["Licence", "Master"] },
      { name: "Marketing", levels: ["Licence", "Master"] },
    ],
  },
  {
    id: "prog-004",
    faculty: "Faculté des Lettres et Sciences Humaines",
    degrees: [
      { name: "Lettres Modernes", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Histoire", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Géographie", levels: ["Licence", "Master", "Doctorat"] },
      { name: "Sociologie", levels: ["Licence", "Master"] },
    ],
  },
]

// Données pour les dates importantes
const importantDates = [
  { event: "Ouverture des préinscriptions", date: "15 juin 2025" },
  { event: "Clôture des préinscriptions", date: "15 août 2025" },
  { event: "Publication des résultats", date: "1 septembre 2025" },
  { event: "Début des inscriptions", date: "5 septembre 2025" },
  { event: "Clôture des inscriptions", date: "30 septembre 2025" },
  { event: "Rentrée académique", date: "5 octobre 2025" },
]

// Données pour les FAQ
const faqItems = [
  {
    question: "Qui peut se préinscrire à l'Université de Douala ?",
    answer:
      "Toute personne titulaire d'un baccalauréat ou d'un diplôme équivalent peut se préinscrire à l'Université de Douala. Les candidats étrangers doivent s'assurer que leur diplôme est reconnu par le Ministère de l'Enseignement Supérieur du Cameroun.",
  },
  {
    question: "Quels sont les documents requis pour la préinscription ?",
    answer:
      "Les documents requis sont : une copie certifiée conforme du baccalauréat ou équivalent, une copie certifiée conforme de l'acte de naissance, une copie de la carte nationale d'identité, 4 photos d'identité récentes, et le reçu de paiement des frais de préinscription.",
  },
  {
    question: "Quel est le montant des frais de préinscription ?",
    answer:
      "Les frais de préinscription s'élèvent à 10 000 FCFA pour les candidats nationaux et 15 000 FCFA pour les candidats étrangers. Ces frais ne sont pas remboursables.",
  },
  {
    question: "Comment puis-je payer les frais de préinscription ?",
    answer:
      "Les frais de préinscription peuvent être payés par Mobile Money (Orange Money, MTN Mobile Money), par virement bancaire, ou directement à la caisse de l'université. Les détails du compte bancaire sont disponibles sur le portail de préinscription.",
  },
  {
    question: "Puis-je me préinscrire dans plusieurs facultés ?",
    answer:
      "Oui, vous pouvez vous préinscrire dans plusieurs facultés, mais vous devrez payer les frais de préinscription pour chaque faculté. Vous devrez également soumettre un dossier complet pour chaque préinscription.",
  },
  {
    question: "Comment savoir si ma préinscription a été acceptée ?",
    answer:
      "Les résultats des préinscriptions sont publiés sur le site web de l'université et par voie d'affichage dans les différentes facultés. Vous recevrez également un email de confirmation si votre préinscription est acceptée.",
  },
  {
    question: "Que faire si je rencontre des problèmes techniques lors de ma préinscription en ligne ?",
    answer:
      "En cas de problèmes techniques, vous pouvez contacter le service d'assistance technique par email à support@univ-douala.cm ou par téléphone au +237 233 XX XX XX. Vous pouvez également vous rendre au bureau d'assistance situé au rez-de-chaussée du bâtiment administratif.",
  },
]

export function PreinscriptionPage() {
  const [activeTab, setActiveTab] = useState("info")
  const { status } = useAuth()
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader showLoginButton={status !== "authenticated"} onLoginClick={() => router.push("/")} />
      <MainNav />

      <motion.main
        className="flex-1 container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Préinscriptions</h1>
              <p className="text-muted-foreground">
                Informations et procédures pour les préinscriptions à l'Université de Douala
              </p>
            </div>
            <ClipboardList className="h-12 w-12 text-primary" />
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Période de préinscription</AlertTitle>
            <AlertDescription className="text-blue-700">
              Les préinscriptions pour l'année académique 2025-2026 sont ouvertes du 15 juin au 15 août 2025.
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="procedure">Procédure</TabsTrigger>
              <TabsTrigger value="programs">Programmes</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préinscriptions à l'Université de Douala</CardTitle>
                  <CardDescription>Tout ce que vous devez savoir sur le processus de préinscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Présentation</h3>
                      <p className="text-muted-foreground mb-4">
                        La préinscription est la première étape obligatoire pour intégrer l'Université de Douala. Elle
                        permet aux futurs étudiants de manifester leur intérêt pour un programme d'études et de
                        soumettre leur candidature pour examen.
                      </p>
                      <p className="text-muted-foreground">
                        Une fois votre préinscription validée, vous pourrez procéder à l'inscription définitive selon le
                        calendrier établi par l'université.
                      </p>
                    </div>
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=256&width=512"
                        alt="Campus de l'Université de Douala"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dates importantes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {importantDates.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.event}</h4>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Documents requis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Copie certifiée conforme du baccalauréat ou équivalent</p>
                          <p className="text-sm text-muted-foreground">
                            Document obligatoire pour toute préinscription
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Copie certifiée conforme de l'acte de naissance</p>
                          <p className="text-sm text-muted-foreground">Datant de moins de 3 mois</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Copie de la carte nationale d'identité</p>
                          <p className="text-sm text-muted-foreground">En cours de validité</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">4 photos d'identité récentes</p>
                          <p className="text-sm text-muted-foreground">Format 4x4, fond blanc</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Reçu de paiement des frais de préinscription</p>
                          <p className="text-sm text-muted-foreground">
                            10 000 FCFA pour les nationaux, 15 000 FCFA pour les étrangers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Relevés de notes des deux dernières années</p>
                          <p className="text-sm text-muted-foreground">
                            Pour les préinscriptions en Master ou Doctorat
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Guide de préinscription
                  </Button>
                  <Button className="gap-2" onClick={() => setActiveTab("procedure")}>
                    Voir la procédure
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="procedure" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Procédure de préinscription</CardTitle>
                  <CardDescription>
                    Suivez ces étapes pour compléter votre préinscription à l'Université de Douala
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Création de compte</h3>
                      <p className="text-muted-foreground mb-4">
                        Créez un compte sur la plateforme de préinscription en fournissant une adresse email valide et
                        en choisissant un mot de passe sécurisé.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2 text-sm">Conseils:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Utilisez une adresse email à laquelle vous avez régulièrement accès</li>
                          <li>• Choisissez un mot de passe d'au moins 8 caractères</li>
                          <li>• Notez vos identifiants dans un endroit sûr</li>
                        </ul>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Paiement des frais</h3>
                      <p className="text-muted-foreground mb-4">
                        Effectuez le paiement des frais de préinscription (10 000 FCFA pour les nationaux, 15 000 FCFA
                        pour les étrangers) via l'une des méthodes disponibles.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Mobile Money</h4>
                          <p className="text-sm text-muted-foreground">
                            Orange Money: #150*14*123456#
                            <br />
                            MTN Mobile Money: *126*14*123456#
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Virement bancaire</h4>
                          <p className="text-sm text-muted-foreground">
                            Banque: BICEC
                            <br />
                            Compte: 10001-00001-012345678-90
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h4 className="font-medium mb-2">Paiement en espèces</h4>
                          <p className="text-sm text-muted-foreground">
                            À la caisse de l'université
                            <br />
                            Bâtiment administratif, Guichet 3
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Remplissage du formulaire</h3>
                      <p className="text-muted-foreground mb-4">
                        Complétez le formulaire de préinscription en ligne en fournissant toutes les informations
                        demandées (informations personnelles, parcours académique, choix de filière, etc.).
                      </p>
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Important</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          Vérifiez soigneusement toutes les informations avant de soumettre votre formulaire. Toute
                          information erronée pourrait entraîner le rejet de votre candidature.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Téléchargement des documents</h3>
                      <p className="text-muted-foreground mb-4">
                        Téléchargez tous les documents requis en format PDF ou JPEG. Assurez-vous que les documents sont
                        lisibles et que la taille de chaque fichier ne dépasse pas 2 Mo.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Baccalauréat ou équivalent</p>
                            <p className="text-xs text-muted-foreground">Format PDF, max 2 Mo</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Acte de naissance</p>
                            <p className="text-xs text-muted-foreground">Format PDF, max 2 Mo</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Carte nationale d'identité</p>
                            <p className="text-xs text-muted-foreground">Format PDF, max 2 Mo</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Photo d'identité</p>
                            <p className="text-xs text-muted-foreground">Format JPEG, max 1 Mo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        5
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Soumission et confirmation</h3>
                      <p className="text-muted-foreground mb-4">
                        Soumettez votre dossier de préinscription et conservez le numéro de référence qui vous sera
                        attribué. Vous recevrez également un email de confirmation.
                      </p>
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <h4 className="font-medium text-green-800 flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Confirmation de soumission
                        </h4>
                        <p className="text-sm text-green-700">
                          Après soumission réussie, vous recevrez un email de confirmation contenant votre numéro de
                          référence et un récapitulatif de votre préinscription. Conservez précieusement ces
                          informations pour le suivi de votre dossier.
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute top-0 left-0 -translate-x-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        6
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Suivi de la candidature</h3>
                      <p className="text-muted-foreground mb-4">
                        Suivez l'état de votre candidature en vous connectant à votre compte sur la plateforme de
                        préinscription. Les résultats seront publiés le 1er septembre 2025.
                      </p>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button className="gap-2">
                          Commencer ma préinscription
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="gap-2">
                          Suivre ma candidature
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Programmes d'études</CardTitle>
                  <CardDescription>
                    Découvrez les différents programmes d'études proposés par l'Université de Douala
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {programs.map((program) => (
                      <div key={program.id} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-6 w-6 text-primary" />
                          <h3 className="text-lg font-semibold">{program.faculty}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-9">
                          {program.degrees.map((degree, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardHeader className="bg-muted/50 pb-2">
                                <CardTitle className="text-base">{degree.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <div className="flex flex-wrap gap-2">
                                  {degree.levels.map((level, i) => (
                                    <Badge key={i} variant="outline" className="bg-primary/5">
                                      {level}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="bg-muted/30 border-t">
                                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                  Plus d'informations
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-2">
                    Télécharger la brochure complète
                    <Download className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Questions fréquemment posées</CardTitle>
                  <CardDescription>
                    Trouvez des réponses aux questions les plus courantes sur les préinscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    Contacter le service des admissions
                  </Button>
                  <Button className="gap-2">
                    Commencer ma préinscription
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

