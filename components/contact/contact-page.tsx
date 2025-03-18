"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/navigation/site-header"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteFooter } from "@/components/navigation/site-footer"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/components/ui/use-toast"

// Définition du schéma de validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  service: z.string().min(1, { message: "Veuillez sélectionner un service" }),
  message: z.string().min(20, { message: "Le message doit contenir au moins 20 caractères" }),
})

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

// Services de l'université
const services = [
  { value: "admission", label: "Service des admissions" },
  { value: "scolarite", label: "Service de la scolarité" },
  { value: "finances", label: "Service financier" },
  { value: "bourses", label: "Service des bourses" },
  { value: "international", label: "Relations internationales" },
  { value: "enseignement", label: "Vice-rectorat chargé des enseignements" },
  { value: "recherche", label: "Vice-rectorat chargé de la recherche" },
  { value: "recteur", label: "Cabinet du Recteur" },
  { value: "autre", label: "Autre service" },
]

export function ContactPage() {
  const { status } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      service: "",
      message: "",
    },
  })

  // Soumission du formulaire
  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true)

    // Simuler un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simuler une soumission réussie
    console.log("Form data:", data)

    toast({
      title: "Message envoyé",
      description: "Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais.",
      variant: "success",
    })

    setIsSubmitting(false)
    setIsSuccess(true)

    // Réinitialiser le formulaire après quelques secondes
    setTimeout(() => {
      form.reset()
      setIsSuccess(false)
    }, 3000)
  }

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
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Contactez-nous</h1>
          <p className="text-muted-foreground">
            Envoyez-nous un message ou trouvez les informations de contact de nos services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
                <CardDescription>Remplissez ce formulaire pour nous envoyer un message</CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-center">Message envoyé avec succès !</h3>
                    <p className="text-muted-foreground text-center mt-2">
                      Nous avons bien reçu votre message et nous vous répondrons dans les meilleurs délais.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom complet" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre.email@exemple.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sujet</FormLabel>
                              <FormControl>
                                <Input placeholder="Sujet de votre message" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service concerné</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service.value} value={service.value}>
                                      {service.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Votre message détaillé..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormDescription>
                              Veuillez être aussi précis que possible pour nous permettre de traiter votre demande
                              efficacement.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-sm text-muted-foreground">BP 2701, Douala, Cameroun</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">contact@univ-douala.cm</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-sm text-muted-foreground">+237 233 40 75 69</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Horaires d'ouverture</h3>
                    <p className="text-sm text-muted-foreground">
                      Lundi - Vendredi: 8h00 - 15h30
                      <br />
                      Samedi: Fermé
                      <br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services spécifiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Service des admissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: admissions@univ-douala.cm
                    <br />
                    Tél: +237 233 XX XX XX
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Service de la scolarité</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: scolarite@univ-douala.cm
                    <br />
                    Tél: +237 233 XX XX XX
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Relations internationales</h3>
                  <p className="text-sm text-muted-foreground">
                    Email: international@univ-douala.cm
                    <br />
                    Tél: +237 233 XX XX XX
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir tous les services
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.main>

      <SiteFooter />
    </div>
  )
}

