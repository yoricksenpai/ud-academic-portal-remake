"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/navigation/main-nav"
import { SiteHeader } from "@/components/navigation/site-header"
import { SiteFooter } from "@/components/navigation/site-footer"
import { NewsCarousel } from "@/components/landing/news-carousel"
import { CalendarDays, FileText, Mail, Newspaper, Users, BookOpen, GraduationCap, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
}

const cardHoverVariants = {
  hover: {
    y: -10,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

export function LandingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [visitorCount, setVisitorCount] = useState(25)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Simuler un compteur de visiteurs en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        // Variation aléatoire entre -2 et +3
        const change = Math.floor(Math.random() * 6) - 2
        return Math.max(20, prev + change)
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Nouvelles pour le carousel
  const news = [
    {
      id: 1,
      title: "Ouverture des inscriptions pour l'année académique 2025-2026",
      excerpt: "Les inscriptions pour la nouvelle année académique débuteront le 15 juin 2025.",
      date: "10 Mars 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Conférence internationale sur l'intelligence artificielle",
      excerpt: "L'Université de Douala accueillera une conférence internationale sur l'IA du 20 au 22 avril.",
      date: "5 Mars 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Résultats des examens du premier semestre",
      excerpt: "Les résultats des examens du premier semestre sont désormais disponibles.",
      date: "1 Mars 2025",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SiteHeader showLoginButton onLoginClick={() => setShowLoginForm(true)} />
      <MainNav />

      <div className="container mx-auto px-4 py-2 text-sm">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center"
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
            }}
            className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
          />
          {visitorCount} visiteur(s) en ligne
        </motion.p>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div whileHover="hover" variants={cardHoverVariants}>
              <Card className="mb-6 overflow-hidden border-primary/20 shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center p-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3,
                      }}
                      className="mb-4 rounded-lg overflow-hidden shadow-lg"
                    >
                      <Image
                        src="/placeholder.svg?height=150&width=150"
                        alt="Université de Douala"
                        width={150}
                        height={150}
                        className="transition-transform duration-500 hover:scale-110"
                      />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center font-semibold text-primary gradient-text text-xl"
                    >
                      Université de Douala
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-sm text-muted-foreground"
                    >
                      The University of Douala
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover" custom={1} variants={cardHoverVariants}>
              <Card className="overflow-hidden border-primary/20 shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-center font-medium mb-2 text-primary">Mars 2025</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      classNames={{
                        day_selected: "bg-primary text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground font-bold",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} custom={2} className="mt-6 space-y-4">
              <h3 className="font-semibold text-primary">Liens rapides</h3>
              <div className="grid grid-cols-2 gap-2">
                <QuickLink icon={<BookOpen className="h-4 w-4" />} label="Bibliothèque" href="/bibliotheque" />
                <QuickLink icon={<Users className="h-4 w-4" />} label="Associations" href="/associations" />
                <QuickLink icon={<GraduationCap className="h-4 w-4" />} label="Bourses" href="/bourses" />
                <QuickLink icon={<Mail className="h-4 w-4" />} label="Contact" href="/contact" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-2" variants={itemVariants} custom={3}>
            <NewsCarousel news={news} />

            <motion.div whileHover="hover" variants={cardHoverVariants}>
              <Card className="mb-6 overflow-hidden border-primary/20 shadow-md">
                <CardContent className="p-6">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-bold mb-4 text-primary gradient-text"
                  >
                    Bienvenue à l'Université de Douala
                  </motion.h2>

                  <div className="flex flex-col md:flex-row gap-6">
                    <motion.div
                      className="md:w-1/3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/placeholder.svg?height=200&width=150"
                          alt="Recteur de l'Université"
                          width={150}
                          height={200}
                          className="mx-auto rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <p className="text-center text-sm mt-2 font-medium">Pr Magloire ONDOA</p>
                    </motion.div>

                    <motion.div
                      className="md:w-2/3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-primary">Mot du Recteur</h3>
                      <p className="text-sm mb-4 font-medium">
                        Bienvenue aux futurs étudiant(e)s de l'Université de Douala !!!
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Le monde est en pleine mutation, les Technologies de l'Information et de la Communication (TIC)
                        ont changé la donne dans presque tous les aspects de la vie pratique. La facilitation des
                        procédures d'admission et l'accès rapide à l'information académique est désormais un critère de
                        performance des institutions de formation et de recherche. Dans cette mouvance, l'Université de
                        Douala a mis en place un portail académique dont la vocation est non seulement de fournir un
                        bouquet de services aux étudiants, mais également d'être un point d'échange d'informations avec
                        les milieux socio-professionnels.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ServiceCard
                title="Préinscriptions"
                icon={<FileText className="h-10 w-10 text-green-600" />}
                href="/preinscription"
                description="Effectuez votre préinscription en ligne"
              />
              <ServiceCard
                title="Calendrier Académique"
                icon={<CalendarDays className="h-10 w-10 text-red-600" />}
                href="/calendrier"
                description="Consultez les dates importantes"
              />
              <ServiceCard
                title="Actualités"
                icon={<Newspaper className="h-10 w-10 text-gray-600" />}
                href="/actualites"
                description="Restez informé des dernières nouvelles"
              />
              <ServiceCard
                title="Contacts"
                icon={<Mail className="h-10 w-10 text-blue-600" />}
                href="/contacts"
                description="Contactez les établissements"
              />
            </div>
          </motion.div>
        </motion.div>
      </main>

      <SiteFooter />

      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onSuccess={() => {
            setShowLoginForm(false)
            toast({
              title: "Connexion réussie",
              description: "Bienvenue sur votre espace personnel",
              variant: "success",
            })
            router.push("/dashboard")
          }}
        />
      )}
    </div>
  )
}

function QuickLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={href}>
        <Button
          variant="outline"
          className="w-full justify-start group hover:border-primary hover:bg-primary/5 transition-all duration-300"
        >
          <span className="mr-2 group-hover:text-primary transition-colors">{icon}</span>
          <span className="group-hover:text-primary transition-colors">{label}</span>
        </Button>
      </Link>
    </motion.div>
  )
}

function ServiceCard({
  title,
  icon,
  href,
  description,
}: {
  title: string
  icon: React.ReactNode
  href: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.7,
      }}
    >
      <Link href={href}>
        <Card className="h-full border-primary/20 overflow-hidden group shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-4 h-full">
            <motion.div
              className="mb-2 transform group-hover:scale-110 transition-transform duration-300"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
                delay: Math.random() * 2,
              }}
            >
              {icon}
            </motion.div>
            <h3 className="font-medium text-center group-hover:text-primary transition-colors">{title}</h3>
            <p className="mt-2 text-center text-xs text-muted-foreground">{description}</p>
            <motion.div
              className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
            >
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                En savoir plus <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

