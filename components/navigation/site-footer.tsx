"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  return (
    <motion.footer
      className="bg-gradient-to-r from-primary to-blue-700 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Université de Douala</h3>
            <p className="text-sm mb-4 text-white/80">
              L'Université de Douala est un établissement public d'enseignement supérieur camerounais.
            </p>
            <div className="flex space-x-4">
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="https://facebook.com" className="hover:text-blue-300 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="https://twitter.com" className="hover:text-blue-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="https://instagram.com" className="hover:text-blue-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialIconVariants} whileHover="hover">
                <Link href="https://youtube.com" className="hover:text-blue-300 transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/a-propos" className="hover:underline text-white/80 hover:text-white transition-colors">
                  À propos
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/formations" className="hover:underline text-white/80 hover:text-white transition-colors">
                  Formations
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/recherche" className="hover:underline text-white/80 hover:text-white transition-colors">
                  Recherche
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/international"
                  className="hover:underline text-white/80 hover:text-white transition-colors"
                >
                  International
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/vie-etudiante"
                  className="hover:underline text-white/80 hover:text-white transition-colors"
                >
                  Vie étudiante
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <motion.li
                className="flex items-center text-white/80 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                <span>BP 2701, Douala, Cameroun</span>
              </motion.li>
              <motion.li
                className="flex items-center text-white/80 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>+237 233 40 75 69</span>
              </motion.li>
              <motion.li
                className="flex items-center text-white/80 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@univ-douala.cm</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80"
          >
            © {new Date().getFullYear()} Université de Douala. Tous droits réservés.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-1 text-xs text-white/70"
          >
            Développé par Systhag Team
          </motion.p>
        </div>
      </div>
    </motion.footer>
  )
}

