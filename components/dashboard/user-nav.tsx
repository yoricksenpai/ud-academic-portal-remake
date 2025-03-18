"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, User, Settings, Bell, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/components/ui/use-toast"

export function UserNav() {
  const router = useRouter()
  const { session, setSession } = useAuth()
  const { toast } = useToast()
  const [unreadNotifications] = useState(3)

  const handleLogout = () => {
    // Logique de déconnexion
    setSession(null)

    // Clear the auth cookie
    document.cookie = "user-session=; path=/; max-age=0"

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
      variant: "success",
    })

    router.push("/")
  }

  // Animation variants
  const bellAnimationVariants = {
    initial: { rotate: 0 },
    ring: {
      rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      transition: {
        duration: 0.5,
        repeat: 0,
        repeatType: "loop" as const,
      },
    },
  }

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={bellAnimationVariants}
            initial="initial"
            whileHover="ring"
          >
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20 transition-colors">
              <Bell className="h-5 w-5" />
              <AnimatePresence>
                {unreadNotifications > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white">
                      {unreadNotifications}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notifications</span>
            <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs">
              Tout marquer comme lu
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-80 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted/80 transition-colors">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Inscription validée</p>
                    <p className="text-xs text-muted-foreground">
                      Votre inscription pour l'année académique 2024-2025 a été validée.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 3 heures</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted/80 transition-colors">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Nouveau cours ajouté</p>
                    <p className="text-xs text-muted-foreground">
                      Un nouveau cours a été ajouté à votre emploi du temps: INF3104 - Sécurité informatique.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 1 jour</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <DropdownMenuItem className="p-3 cursor-pointer hover:bg-muted/80 transition-colors">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Rappel de paiement</p>
                    <p className="text-xs text-muted-foreground">
                      N'oubliez pas de régler vos frais de scolarité avant le 31 mars 2025.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 2 jours</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </motion.div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center text-center cursor-pointer">
            <span className="text-sm text-primary">Voir toutes les notifications</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Photo de profil" />
                <AvatarFallback className="bg-primary text-white">PJ</AvatarFallback>
              </Avatar>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user?.name || "PRISO JOHAN YORICK"}</p>
              <p className="text-xs leading-none text-muted-foreground">{session?.user?.studentId || "24G02037"}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </DropdownMenuItem>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Aide</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <motion.div
            whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

