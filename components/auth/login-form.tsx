"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { LogIn, X, AlertCircle, Loader2, Lock, UserIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/UserContext"

interface LoginFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function LoginForm({ onClose, onSuccess }: LoginFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  //const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isStudent: true,
  })
  const { login,  clearError, token, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isStudent: checked }))
  }
  useEffect(() => {
    if (!isLoading && token) {
      console.log('User already logged in, redirecting to:', redirectTo);
      // Utiliser window.location.href pour une redirection complète
      window.location.href = redirectTo;
    }
  }, [isLoading, token, redirectTo]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   // setIsLoading(true)
    setError(null)
    
  //   try {
  //     // // Validation basique
  //     if (!formData.username || !formData.password) {
  //       throw new Error("Veuillez remplir tous les champs")
  //     }
  //     console.log("Requête reçue :", formData);
  //      var role : string;
  //     if(formData.isStudent){
  //        role = "etudiant"
  //     }else{ role = "enseignant" }
  //     const res = await fetch("/api/auth/login", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ email: formData.username, password: formData.password, role: formData.isStudent ? "etudiant" : "enseignant" }),
  //     });
      
  //     // // For demo purposes, check credentials directly
  //     // const isValidCredentials =
  //     //   (formData.username === "student" && formData.password === "password") ||
  //     //   (formData.username === "admin" && formData.password === "admin123")

  //     // if (!isValidCredentials) {
  //     //   throw new Error("Identifiants incorrects")
  //     // }

  //     // Create a session object
  //     const data = await res.json();
  //     if (res.ok) {
  //       login({  firstName: data.firstName,email : data.email, role : data.role , token: data.token });
        
  //       if (role === "etudiant") {
          
  //         router.push("/dashboard");
  //       } else {
  //        console.log("kssssssssss", data);
  //         router.push("/dashboard");
  //       }
  //     // const session = {
  //     //   user: {
  //     //     name: formData.isStudent ? formData. : "Administrateur",
  //     //     email: formData.isStudent ? "priso.johan@univ-douala.cm" : "admin@univ-douala.cm",
  //     //     studentId: formData.isStudent ? "24G02037" : "",
  //     //     role: formData.isStudent ? "student" : "admin",
  //     //   },
  //     //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  //     // }

  //     // // Set the session in our auth context
  //     // setSession(session)

  //     // // Also store in a cookie for middleware
  //     // document.cookie = `user-session=true; path=/; max-age=${30 * 24 * 60 * 60}`

  //     // Notification de succès
      
  //   }
  //     // Callback de succès
  //     console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqq", data.token);
  //     onSuccess()
  //   } catch (error) {
  //     console.error("Erreur de connexion:", error)
  //     setError(error instanceof Error ? error.message : "Une erreur est survenue")

  //     toast({
  //       title: "Erreur de connexion",
  //       description: error instanceof Error ? error.message : "Une erreur est survenue",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // Animation variants
  try {
    // Validation des champs
    if (!formData.username || !formData.password) {
      throw new Error("Veuillez remplir tous les champs")
    }

    // Détermination du rôle
    const role = formData.isStudent ? "etudiant" : "enseignant"

    // Requête de connexion
     const result = await login(formData.username, formData.password, role)
    
      console.log("Login successful, redirecting to:", redirectTo);
      
      // Forcer un rafraîchissement complet pour s'assurer que le cookie est pris en compte
      window.location.href = redirectTo;
      
      // Ou utiliser le routeur Next.js (mais peut parfois causer des problèmes avec les cookies)
      // router.push(redirectTo);
    
      // Navigation
      router.push(redirectTo);
      onSuccess();
    
  } catch (error) {
    // Gestion des erreurs
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Une erreur de connexion est survenue"

    console.error("Erreur de connexion détaillée:", error)

    // Toast d'erreur
    toast({
      title: "Erreur de connexion",
      description: errorMessage,
      variant: "destructive",
    });

    // Mise à jour de l'état d'erreur
    setError(errorMessage)
  }
}
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div variants={cardVariants} className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <Card className="shadow-2xl border-primary/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-blue-700 text-white relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-white hover:bg-white/20 transition-colors"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="flex items-center text-xl">
                <LogIn className="h-5 w-5 mr-2" />
                Connexion
              </CardTitle>
              <p className="text-white/80 text-sm">Accédez à votre espace personnel</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start"
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={inputVariants} custom={0} className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Identifiant
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Entrez votre identifiant"
                      disabled={isLoading}
                      required
                      className="pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} custom={1} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </Label>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                      Mot de passe oublié ?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Entrez votre mot de passe"
                      disabled={isLoading}
                      required
                      className="pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants} custom={2} className="flex items-center space-x-2">
                  <Checkbox
                    id="isStudent"
                    checked={formData.isStudent}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  <Label htmlFor="isStudent" className="text-sm">
                    Connecter en tant qu'étudiant
                  </Label>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 bg-muted/30">
              <p className="text-xs text-muted-foreground">Pour la démo, utilisez: student / password</p>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Loader2 className="h-4 w-4 mr-2" />
                  </motion.div>
                ) : (
                  <LogIn className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

