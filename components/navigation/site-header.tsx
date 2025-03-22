"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

interface SiteHeaderProps {
  showLoginButton?: boolean
  onLoginClick?: () => void
}

export function SiteHeader({ showLoginButton = true, onLoginClick }: SiteHeaderProps) {
  return (
    <motion.header
      className="bg-gradient-to-r from-primary to-blue-700 text-white py-4 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-95"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <motion.h1
            className="text-2xl md:text-3xl font-bold font-heading"
            animate={{
              textShadow: [
                "0 0 5px rgba(255,255,255,0)",
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 5px rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            SYSTHAG-ONLINE
          </motion.h1>
          <p className="text-red-300 text-sm">Portail académique de l'Université de Douala</p>
        </motion.div>

        {showLoginButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={onLoginClick} className="btn-gradient hover-lift" size="sm">
              <LogIn className="mr-1 h-4 w-4" />
              Connexion
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

