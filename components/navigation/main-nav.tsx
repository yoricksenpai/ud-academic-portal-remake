"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/components/auth/auth-provider"

// Modification des items de navigation pour les séparer en deux catégories
// Création des items pour les utilisateurs authentifiés et non authentifiés

const publicNavItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "CONCOURS", href: "/concours" },
  { label: "BIBLIOTHÈQUE", href: "/bibliotheque" },
  { label: "ASSOCIATIONS", href: "/associations" },
  { label: "BOURSES", href: "/bourses" },
  { label: "CONTACT", href: "/contact" },
]

const privateNavItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "CONCOURS", href: "/concours" },
  { label: "PREINSCRIPTION", href: "/preinscription" },
  { label: "INSCRIPTION", href: "/inscription" },
  { label: "NOTES", href: "/notes" },
  { label: "ENRÔLEMENT", href: "/enrolement" },
  { label: "MON COMPTE", href: "/compte" },
]

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { status } = useAuth()

  // Sélectionner les items de navigation en fonction de l'état d'authentification
  const navItems = status === "authenticated" ? privateNavItems : publicNavItems

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <nav className="bg-primary shadow-md">
      <div className="container mx-auto px-4 relative">
        {!isDesktop && (
          <div className="py-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5 mr-2" />
              <span>Menu</span>
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        )}

        <AnimatePresence>
          {(isDesktop || mobileMenuOpen) && (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "flex flex-col md:flex-row md:flex-wrap",
                !isDesktop && "absolute z-50 bg-primary w-full shadow-lg rounded-b-lg overflow-hidden",
              )}
            >
              {navItems.map((item, index) => (
                <motion.li key={item.href} variants={itemVariants} custom={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium transition-all duration-300",
                      pathname === item.href
                        ? "bg-primary-foreground/20 text-white"
                        : "text-primary-foreground hover:bg-primary-foreground/10",
                      pathname === item.href && !isDesktop && "border-l-4 border-white",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

